from typing import Generator
from sqlalchemy.orm import Session
from backend.app.database.session import get_db

# Re-export for route dependency injection
__all__ = ["get_db"]
