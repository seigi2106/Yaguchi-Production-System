"""FastAPI application entrypoint."""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from yaguchi_production_system.api.error_handlers import add_exception_handlers
from yaguchi_production_system.api.routes.healthcheck import router as healthcheck_router
from yaguchi_production_system.api.routes.jobs import router as jobs_router
from yaguchi_production_system.core.database import init_db
from yaguchi_production_system.core.logging import configure_logging, get_logger
from yaguchi_production_system.core.settings import get_settings


def create_app() -> FastAPI:
    """Application factory."""
    settings = get_settings()
    configure_logging(settings.log_level)

    @asynccontextmanager
    async def lifespan(_: FastAPI) -> AsyncIterator[None]:
        if settings.auto_create_tables:
            init_db(settings.database_url, settings.database_echo)
        yield

    app = FastAPI(title=settings.app_name, debug=settings.app_debug, lifespan=lifespan)
    add_exception_handlers(app)
    app.include_router(healthcheck_router)
    app.include_router(jobs_router)

    logger = get_logger(__name__)
    logger.info("FastAPI app initialized for env=%s", settings.app_env)
    return app


app = create_app()
