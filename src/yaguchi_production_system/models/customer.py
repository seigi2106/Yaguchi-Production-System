"""Customer model."""

from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from yaguchi_production_system.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from yaguchi_production_system.models.job import Job


class Customer(TimestampMixin, Base):
    """Customer master table."""

    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
    contact_person: Mapped[str | None] = mapped_column(String(100), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(30), nullable=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)

    jobs: Mapped[list["Job"]] = relationship(back_populates="customer")
