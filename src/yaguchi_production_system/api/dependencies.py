"""FastAPI dependencies."""

from collections.abc import Generator

from sqlalchemy.orm import Session

from yaguchi_production_system.core.database import get_db_session
from yaguchi_production_system.core.settings import get_settings


def get_session() -> Generator[Session, None, None]:
    """Yield request-scoped database session."""
    settings = get_settings()
    yield from get_db_session(settings.database_url, settings.database_echo)

