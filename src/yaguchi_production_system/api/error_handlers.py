"""FastAPI exception handlers."""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from yaguchi_production_system.api.schemas.error import ErrorResponse
from yaguchi_production_system.core.exceptions import AppError


def add_exception_handlers(app: FastAPI) -> None:
    """Register application-level exception handlers."""

    @app.exception_handler(AppError)
    async def app_error_handler(_: Request, exc: AppError) -> JSONResponse:
        response = ErrorResponse(code=exc.code, message=exc.message, details=exc.details)
        return JSONResponse(status_code=exc.status_code, content=response.model_dump())

