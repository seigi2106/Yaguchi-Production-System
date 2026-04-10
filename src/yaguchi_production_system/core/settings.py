"""Application settings management."""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration loaded from environment variables."""

    app_name: str = Field(default="Yaguchi Production System")
    app_env: str = Field(default="local")
    app_debug: bool = Field(default=False)
    log_level: str = Field(default="INFO")

    model_config = SettingsConfigDict(env_prefix="YAGUCHI_", case_sensitive=False)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()

