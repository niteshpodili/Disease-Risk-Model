from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Quantum-Inspired Disease Risk Analysis Platform"
    SIH_REFERENCE: str = "SIH26139"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

    # Database: SQLite default for local zero-config, PostgreSQL compatible
    DATABASE_URL: str = "sqlite:///./heart_disease.db"

    # Rate Limiting
    RATE_LIMIT_ANALYZE: str = "10/minute"
    RATE_LIMIT_GENERAL: str = "60/minute"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
