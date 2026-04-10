"""Business logic for master data endpoints."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from yaguchi_production_system.api.schemas.master import (
    CustomerCreateRequest,
    WorkerCreateRequest,
)
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


def create_customer(session: Session, payload: CustomerCreateRequest) -> Customer:
    """Create one customer."""
    customer = Customer(
        name=payload.name,
        contact_person=payload.contact_person,
        phone=payload.phone,
        email=payload.email,
    )
    session.add(customer)
    session.commit()
    session.refresh(customer)
    return customer


def create_worker(session: Session, payload: WorkerCreateRequest) -> Worker:
    """Create one worker."""
    worker = Worker(
        employee_code=payload.employee_code,
        name=payload.name,
        is_active=payload.is_active,
    )
    session.add(worker)
    session.commit()
    session.refresh(worker)
    return worker
