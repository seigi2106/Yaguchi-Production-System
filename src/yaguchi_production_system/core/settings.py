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
    database_url: str = Field(default="sqlite+pysqlite:///./yaguchi.db")
    database_echo: bool = Field(default=False)
    auto_create_tables: bool = Field(default=True)
    cors_allowed_origins: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173",
    )

    model_config = SettingsConfigDict(env_prefix="YAGUCHI_", case_sensitive=False)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()


def parse_csv_config(value: str) -> list[str]:
    """Parse comma-separated config values."""
    return [item.strip() for item in value.split(",") if item.strip()]
