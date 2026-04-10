"""Job model."""

from datetime import date
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from yaguchi_production_system.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from yaguchi_production_system.models.customer import Customer
    from yaguchi_production_system.models.job_assignment import JobAssignment


class JobStatus(StrEnum):
    """Allowed job statuses."""

    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ON_HOLD = "on_hold"
    CANCELLED = "cancelled"


class Job(TimestampMixin, Base):
    """Production job table."""

    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_code: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    customer_id: Mapped[int | None] = mapped_column(ForeignKey("customers.id"), nullable=True)
    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    due_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default=JobStatus.PLANNED.value, nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    customer: Mapped["Customer | None"] = relationship(back_populates="jobs")
    assignments: Mapped[list["JobAssignment"]] = relationship(
        back_populates="job",
        cascade="all, delete-orphan",
    )

    @property
    def customer_name(self) -> str | None:
        """Return customer name when available."""
        if self.customer is None:
            return None
        return self.customer.name

    @property
    def assignee_names(self) -> list[str]:
        """Return assigned worker names ordered by assignment id."""
        assignments = sorted(self.assignments, key=lambda assignment: assignment.id)
        return [assignment.worker.name for assignment in assignments]
