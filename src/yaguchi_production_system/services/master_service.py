"""Business logic for master data endpoints."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from yaguchi_production_system.models.customer import Customer
from yaguchi_production_system.models.worker import Worker


def list_customers(session: Session) -> list[Customer]:
    """Return customers ordered by name."""
    statement = select(Customer).order_by(Customer.name.asc())
    return list(session.scalars(statement))


def list_workers(session: Session) -> list[Worker]:
    """Return workers ordered by employee code."""
    statement = select(Worker).order_by(Worker.employee_code.asc())
    return list(session.scalars(statement))

