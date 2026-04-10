"""Master data response schemas."""

from pydantic import BaseModel, ConfigDict, Field


class CustomerCreateRequest(BaseModel):
    """Payload for creating customers."""

    name: str = Field(min_length=1, max_length=200)
    contact_person: str | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=30)
    email: str | None = Field(default=None, max_length=255)


class CustomerSummaryResponse(BaseModel):
    """Customer summary for selection UIs."""

    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class WorkerCreateRequest(BaseModel):
    """Payload for creating workers."""

    employee_code: str = Field(min_length=1, max_length=50)
    name: str = Field(min_length=1, max_length=100)
    is_active: bool = True


class WorkerSummaryResponse(BaseModel):
    """Worker summary for selection UIs."""

    id: int
    employee_code: str
    name: str

    model_config = ConfigDict(from_attributes=True)
