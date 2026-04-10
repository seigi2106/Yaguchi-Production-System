"""Master data response schemas."""

from pydantic import BaseModel, ConfigDict


class CustomerSummaryResponse(BaseModel):
    """Customer summary for selection UIs."""

    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class WorkerSummaryResponse(BaseModel):
    """Worker summary for selection UIs."""

    id: int
    employee_code: str
    name: str

    model_config = ConfigDict(from_attributes=True)

