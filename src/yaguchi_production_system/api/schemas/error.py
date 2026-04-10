"""Error response schema."""

from typing import Any

from pydantic import BaseModel


class ErrorResponse(BaseModel):
    """Standard API error response payload."""

    code: str
    message: str
    details: dict[str, Any] | None = None

