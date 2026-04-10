"""Core exception tests."""

from yaguchi_production_system.core.exceptions import NotFoundError


def test_not_found_error_fields() -> None:
    """NotFoundError should map to HTTP 404."""
    error = NotFoundError("job not found", details={"job_id": "1"})

    assert error.code == "not_found"
    assert error.message == "job not found"
    assert error.status_code == 404
    assert error.details == {"job_id": "1"}

