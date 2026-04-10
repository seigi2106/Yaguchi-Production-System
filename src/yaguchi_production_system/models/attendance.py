"""Attendance model."""

from datetime import date, time
from typing import TYPE_CHECKING

from sqlalchemy import Date, ForeignKey, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from yaguchi_production_system.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from yaguchi_production_system.models.worker import Worker


class Attendance(TimestampMixin, Base):
    """Daily attendance and work time for workers."""

    __tablename__ = "attendance"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), nullable=False)
    work_date: Mapped[date] = mapped_column(Date, nullable=False)
    check_in: Mapped[time | None] = mapped_column(Time, nullable=True)
    check_out: Mapped[time | None] = mapped_column(Time, nullable=True)
    worked_minutes: Mapped[int] = mapped_column(default=0, nullable=False)

    worker: Mapped["Worker"] = relationship(back_populates="attendances")
