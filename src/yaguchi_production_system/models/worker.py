"""Worker model."""

from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from yaguchi_production_system.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from yaguchi_production_system.models.attendance import Attendance
    from yaguchi_production_system.models.job_assignment import JobAssignment


class Worker(TimestampMixin, Base):
    """Worker master table."""

    __tablename__ = "workers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    employee_code: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)

    job_assignments: Mapped[list["JobAssignment"]] = relationship(back_populates="worker")
    attendances: Mapped[list["Attendance"]] = relationship(back_populates="worker")
