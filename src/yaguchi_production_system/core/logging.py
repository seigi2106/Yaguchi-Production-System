"""Logging helpers."""

import logging
from typing import Final

LOG_FORMAT: Final[str] = "%(asctime)s | %(levelname)s | %(name)s | %(message)s"

_configured = False


def configure_logging(level: str = "INFO") -> None:
    """Configure process-wide logging once."""
    global _configured
    if _configured:
        return

    numeric_level = getattr(logging, level.upper(), logging.INFO)
    logging.basicConfig(level=numeric_level, format=LOG_FORMAT)
    _configured = True


def get_logger(name: str) -> logging.Logger:
    """Return logger by name."""
    return logging.getLogger(name)

