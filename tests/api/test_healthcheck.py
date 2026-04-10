"""Healthcheck API tests."""

from fastapi.testclient import TestClient

from yaguchi_production_system.api.main import app


def test_healthcheck_returns_ok() -> None:
    """Healthcheck should return status information."""
    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "app_name": "Yaguchi Production System",
        "environment": "local",
    }

