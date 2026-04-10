"""Jobs CRUD API tests."""

from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from yaguchi_production_system.api.dependencies import get_session
from yaguchi_production_system.api.main import app
from yaguchi_production_system.models.base import Base


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    """Create API client with isolated in-memory DB."""
    engine: Engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    testing_session_factory = sessionmaker(
        bind=engine,
        autocommit=False,
        autoflush=False,
        future=True,
    )
    Base.metadata.create_all(bind=engine)

    def override_get_session() -> Generator[Session, None, None]:
        session = testing_session_factory()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_session] = override_get_session

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


def test_jobs_crud_flow(client: TestClient) -> None:
    """Create/list/get/update/delete jobs end-to-end."""
    create_response = client.post(
        "/jobs",
        json={
            "job_code": "JOB-0001",
            "title": "試作基板組立",
            "customer_id": None,
            "start_date": "2026-04-10",
            "due_date": "2026-04-20",
            "status": "planned",
            "notes": "初回ロット",
        },
    )

    assert create_response.status_code == 201
    created_job = create_response.json()
    job_id = created_job["id"]
    assert created_job["job_code"] == "JOB-0001"
    assert created_job["title"] == "試作基板組立"

    list_response = client.get("/jobs")
    assert list_response.status_code == 200
    jobs = list_response.json()
    assert len(jobs) == 1
    assert jobs[0]["id"] == job_id

    get_response = client.get(f"/jobs/{job_id}")
    assert get_response.status_code == 200
    assert get_response.json()["status"] == "planned"

    update_response = client.put(
        f"/jobs/{job_id}",
        json={"status": "in_progress", "notes": "部材待ち解消"},
    )
    assert update_response.status_code == 200
    updated_job = update_response.json()
    assert updated_job["status"] == "in_progress"
    assert updated_job["notes"] == "部材待ち解消"

    delete_response = client.delete(f"/jobs/{job_id}")
    assert delete_response.status_code == 204

    missing_response = client.get(f"/jobs/{job_id}")
    assert missing_response.status_code == 404
    assert missing_response.json()["code"] == "not_found"

