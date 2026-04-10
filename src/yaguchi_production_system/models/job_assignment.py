"""Job assignment model."""

from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from yaguchi_production_system.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from yaguchi_production_system.models.job import Job
    from yaguchi_production_system.models.worker import Worker


class JobAssignment(TimestampMixin, Base):
    """Assignment of workers to jobs."""

    __tablename__ = "job_assignments"
    __table_args__ = (UniqueConstraint("job_id", "worker_id", name="uq_job_worker_assignment"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.id"), nullable=False)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), nullable=False)
    assigned_date: Mapped[date] = mapped_column(Date, nullable=False)

    job: Mapped["Job"] = relationship(back_populates="assignments")
    worker: Mapped["Worker"] = relationship(back_populates="job_assignments")
