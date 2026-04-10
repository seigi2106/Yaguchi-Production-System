"""Master data endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from yaguchi_production_system.api.dependencies import get_session
from yaguchi_production_system.api.schemas.master import (
    CustomerCreateRequest,
    CustomerSummaryResponse,
    WorkerCreateRequest,
    WorkerSummaryResponse,
)
from yaguchi_production_system.services.master_service import (
    create_customer,
    create_worker,
    list_customers,
    list_workers,
)

router = APIRouter(tags=["master"])

SessionDependency = Annotated[Session, Depends(get_session)]


@router.get("/customers", response_model=list[CustomerSummaryResponse])
def list_customers_endpoint(session: SessionDependency) -> list[CustomerSummaryResponse]:
    """Return customer master list."""
    customers = list_customers(session)
    return [CustomerSummaryResponse.model_validate(customer) for customer in customers]


@router.post(
    "/customers",
    response_model=CustomerSummaryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_customer_endpoint(
    payload: CustomerCreateRequest,
    session: SessionDependency,
) -> CustomerSummaryResponse:
    """Create one customer."""
    customer = create_customer(session, payload)
    return CustomerSummaryResponse.model_validate(customer)


@router.get("/workers", response_model=list[WorkerSummaryResponse])
def list_workers_endpoint(session: SessionDependency) -> list[WorkerSummaryResponse]:
    """Return worker master list."""
    workers = list_workers(session)
    return [WorkerSummaryResponse.model_validate(worker) for worker in workers]


@router.post(
    "/workers",
    response_model=WorkerSummaryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_worker_endpoint(
    payload: WorkerCreateRequest,
    session: SessionDependency,
) -> WorkerSummaryResponse:
    """Create one worker."""
    worker = create_worker(session, payload)
    return WorkerSummaryResponse.model_validate(worker)
