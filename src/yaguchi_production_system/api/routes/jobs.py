"""Jobs CRUD endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from yaguchi_production_system.api.dependencies import get_session
from yaguchi_production_system.api.schemas.job import JobCreate, JobResponse, JobUpdate
from yaguchi_production_system.services.job_service import (
    create_job,
    delete_job,
    get_job_or_404,
    list_jobs,
    update_job,
)

router = APIRouter(prefix="/jobs", tags=["jobs"])

SessionDependency = Annotated[Session, Depends(get_session)]


@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job_endpoint(payload: JobCreate, session: SessionDependency) -> JobResponse:
    """Create one job."""
    job = create_job(session, payload)
    return JobResponse.model_validate(job)


@router.get("", response_model=list[JobResponse])
def list_jobs_endpoint(session: SessionDependency) -> list[JobResponse]:
    """Return all jobs."""
    jobs = list_jobs(session)
    return [JobResponse.model_validate(job) for job in jobs]


@router.get("/{job_id}", response_model=JobResponse)
def get_job_endpoint(job_id: int, session: SessionDependency) -> JobResponse:
    """Return one job by id."""
    job = get_job_or_404(session, job_id)
    return JobResponse.model_validate(job)


@router.put("/{job_id}", response_model=JobResponse)
def update_job_endpoint(job_id: int, payload: JobUpdate, session: SessionDependency) -> JobResponse:
    """Update one job by id."""
    job = update_job(session, job_id, payload)
    return JobResponse.model_validate(job)


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT, response_model=None)
def delete_job_endpoint(job_id: int, session: SessionDependency) -> Response:
    """Delete one job by id."""
    delete_job(session, job_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

