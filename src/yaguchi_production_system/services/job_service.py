"""Business logic for jobs CRUD."""

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from yaguchi_production_system.api.schemas.job import JobCreate, JobUpdate
from yaguchi_production_system.core.exceptions import NotFoundError
from yaguchi_production_system.models.job import Job
from yaguchi_production_system.models.job_assignment import JobAssignment


def create_job(session: Session, payload: JobCreate) -> Job:
    """Create and persist a new job."""
    job = Job(
        job_code=payload.job_code,
        title=payload.title,
        customer_id=payload.customer_id,
        start_date=payload.start_date,
        due_date=payload.due_date,
        status=payload.status.value,
        notes=payload.notes,
    )
    session.add(job)
    session.commit()
    session.refresh(job)
    return job


def list_jobs(session: Session) -> list[Job]:
    """Return all jobs ordered by id."""
    statement = (
        select(Job)
        .options(
            selectinload(Job.customer),
            selectinload(Job.assignments).selectinload(JobAssignment.worker),
        )
        .order_by(Job.id.asc())
    )
    return list(session.scalars(statement))


def get_job_or_404(session: Session, job_id: int) -> Job:
    """Return one job or raise NotFoundError."""
    statement = (
        select(Job)
        .options(
            selectinload(Job.customer),
            selectinload(Job.assignments).selectinload(JobAssignment.worker),
        )
        .where(Job.id == job_id)
    )
    job = session.scalar(statement)
    if job is None:
        raise NotFoundError(
            "job not found",
            details={"job_id": job_id},
        )
    return job


def update_job(session: Session, job_id: int, payload: JobUpdate) -> Job:
    """Update an existing job."""
    job = get_job_or_404(session, job_id)
    updates = payload.model_dump(exclude_unset=True)

    for field_name, field_value in updates.items():
        if field_name == "status" and field_value is not None:
            setattr(job, field_name, field_value.value)
            continue
        setattr(job, field_name, field_value)

    session.add(job)
    session.commit()
    session.refresh(job)
    return job


def delete_job(session: Session, job_id: int) -> None:
    """Delete a job if it exists."""
    job = get_job_or_404(session, job_id)
    session.delete(job)
    session.commit()
