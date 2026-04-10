"""Jobs CRUD API tests."""

from collections.abc import Generator
from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from yaguchi_production_system.api.dependencies import get_session
from yaguchi_production_system.api.main import app
from yaguchi_production_system.models.base import Base
from yaguchi_production_system.models.customer import Customer
from yaguchi_production_system.models.job_assignment import JobAssignment
from yaguchi_production_system.models.worker import Worker


@pytest.fixture
def session_factory() -> Generator[sessionmaker[Session], None, None]:
    """Create isolated in-memory session factory."""
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
    yield testing_session_factory
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(session_factory: sessionmaker[Session]) -> Generator[TestClient, None, None]:
    """Create API client with isolated in-memory DB."""
    def override_get_session() -> Generator[Session, None, None]:
        session = session_factory()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_session] = override_get_session

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


def test_jobs_crud_flow(
    client: TestClient,
    session_factory: sessionmaker[Session],
) -> None:
    """Create/list/get/update/delete jobs end-to-end."""
    with session_factory() as session:
        customer = Customer(name="東和産業")
        worker = Worker(employee_code="W-001", name="佐藤")
        session.add_all([customer, worker])
        session.commit()
        session.refresh(customer)
        session.refresh(worker)
        customer_id = customer.id
        worker_id = worker.id

    create_response = client.post(
        "/jobs",
        json={
            "job_code": "JOB-0001",
            "title": "試作基板組立",
            "customer_id": customer_id,
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
    assert created_job["customer_name"] == "東和産業"
    assert created_job["assignee_names"] == []

    with session_factory() as session:
        assignment = JobAssignment(
            job_id=job_id,
            worker_id=worker_id,
            assigned_date=date(2026, 4, 10),
        )
        session.add(assignment)
        session.commit()

    list_response = client.get("/jobs")
    assert list_response.status_code == 200
    jobs = list_response.json()
    assert len(jobs) == 1
    assert jobs[0]["id"] == job_id
    assert jobs[0]["customer_name"] == "東和産業"
    assert jobs[0]["assignee_names"] == ["佐藤"]

    get_response = client.get(f"/jobs/{job_id}")
    assert get_response.status_code == 200
    assert get_response.json()["status"] == "planned"
    assert get_response.json()["customer_name"] == "東和産業"
    assert get_response.json()["assignee_names"] == ["佐藤"]

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
