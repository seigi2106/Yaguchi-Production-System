"""Healthcheck schemas."""

from typing import Literal

from pydantic import BaseModel


class HealthcheckResponse(BaseModel):
    """Healthcheck response payload."""

    status: Literal["ok"] = "ok"
    app_name: str
    environment: str

