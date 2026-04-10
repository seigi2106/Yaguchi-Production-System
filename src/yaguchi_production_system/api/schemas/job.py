"""Job request/response schemas."""

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from yaguchi_production_system.models.job import JobStatus


class JobBase(BaseModel):
    """Shared job fields."""

    job_code: str = Field(min_length=1, max_length=50)
    title: str = Field(min_length=1, max_length=255)
    customer_id: int | None = None
    start_date: date | None = None
    due_date: date | None = None
    status: JobStatus = JobStatus.PLANNED
    notes: str | None = None


class JobCreate(JobBase):
    """Payload for creating jobs."""


class JobUpdate(BaseModel):
    """Payload for updating jobs."""

    title: str | None = Field(default=None, min_length=1, max_length=255)
    customer_id: int | None = None
    start_date: date | None = None
    due_date: date | None = None
    status: JobStatus | None = None
    notes: str | None = None


class JobResponse(JobBase):
    """API response for job entity."""

    id: int
    customer_name: str | None = None
    assignee_names: list[str] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
