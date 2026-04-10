"""Healthcheck endpoint."""

from typing import Annotated

from fastapi import APIRouter, Depends

from yaguchi_production_system.api.schemas.healthcheck import HealthcheckResponse
from yaguchi_production_system.core.settings import Settings, get_settings

router = APIRouter(tags=["healthcheck"])

SettingsDependency = Annotated[Settings, Depends(get_settings)]


@router.get("/health", response_model=HealthcheckResponse)
def healthcheck(settings: SettingsDependency) -> HealthcheckResponse:
    """Return service health status."""
    return HealthcheckResponse(app_name=settings.app_name, environment=settings.app_env)

