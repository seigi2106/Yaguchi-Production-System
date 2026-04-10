"""SQLAlchemy engine and session management."""

from collections.abc import Generator
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker

from yaguchi_production_system.models import Base


@lru_cache(maxsize=1)
def get_engine(database_url: str, echo: bool) -> Engine:
    """Create and cache SQLAlchemy engine."""
    return create_engine(database_url, echo=echo, future=True)


@lru_cache(maxsize=1)
def get_session_factory(database_url: str, echo: bool) -> sessionmaker[Session]:
    """Return configured session factory."""
    engine = get_engine(database_url, echo)
    return sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


def init_db(database_url: str, echo: bool) -> None:
    """Initialize database tables."""
    engine = get_engine(database_url, echo)
    Base.metadata.create_all(bind=engine)


def get_db_session(database_url: str, echo: bool) -> Generator[Session, None, None]:
    """Yield SQLAlchemy session with managed lifecycle."""
    session_factory = get_session_factory(database_url, echo)
    session = session_factory()
    try:
        yield session
    finally:
        session.close()

