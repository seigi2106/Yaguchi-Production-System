"""Master data API tests."""

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
from yaguchi_production_system.models.customer import Customer
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


def test_list_customers_and_workers(
    client: TestClient,
    session_factory: sessionmaker[Session],
) -> None:
    """Master APIs should return sorted customer and worker lists."""
    with session_factory() as session:
        session.add_all(
            [
                Customer(name="Beta Manufacturing"),
                Customer(name="Alpha Electronics"),
                Worker(employee_code="W-002", name="Takahashi"),
                Worker(employee_code="W-001", name="Sato"),
            ]
        )
        session.commit()

    customer_response = client.get("/customers")
    worker_response = client.get("/workers")

    assert customer_response.status_code == 200
    assert customer_response.json() == [
        {"id": 2, "name": "Alpha Electronics"},
        {"id": 1, "name": "Beta Manufacturing"},
    ]

    assert worker_response.status_code == 200
    assert worker_response.json() == [
        {"id": 2, "employee_code": "W-001", "name": "Sato"},
        {"id": 1, "employee_code": "W-002", "name": "Takahashi"},
    ]


def test_create_customer_and_worker(client: TestClient) -> None:
    """Master APIs should create customer and worker records."""
    customer_response = client.post(
        "/customers",
        json={
            "name": "Gamma Works",
            "contact_person": "Abe",
            "phone": "03-0000-0000",
            "email": "abe@example.com",
        },
    )
    worker_response = client.post(
        "/workers",
        json={
            "employee_code": "W-100",
            "name": "Yamada",
            "is_active": True,
        },
    )

    assert customer_response.status_code == 201
    assert customer_response.json() == {"id": 1, "name": "Gamma Works"}

    assert worker_response.status_code == 201
    assert worker_response.json() == {
        "id": 1,
        "employee_code": "W-100",
        "name": "Yamada",
    }
