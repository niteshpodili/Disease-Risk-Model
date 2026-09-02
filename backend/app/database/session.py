from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from backend.app.core.config import settings
from backend.app.database.base import Base
import logging

logger = logging.getLogger(__name__)

def _resolve_database_url() -> str:
    """
    Attempt to use the configured DATABASE_URL.
    If it targets PostgreSQL but psycopg2 is not installed,
    fall back to local SQLite so the app still starts.
    """
    url = settings.DATABASE_URL

    if url.startswith("postgresql"):
        try:
            import psycopg2  # noqa: F401
            logger.info("[DB] PostgreSQL driver (psycopg2) found — connecting to Supabase.")
            return url
        except ImportError:
            fallback = "sqlite:///./heart_disease.db"
            logger.warning(
                "[DB] psycopg2 not installed. "
                "Cannot connect to Supabase PostgreSQL. "
                f"Falling back to SQLite: {fallback}\n"
                "       → Run: pip install psycopg2-binary  (requires internet)"
            )
            return fallback

    return url


_database_url = _resolve_database_url()
_connect_args = {"check_same_thread": False} if _database_url.startswith("sqlite") else {}

engine = create_engine(
    _database_url,
    connect_args=_connect_args,
    echo=False,
    pool_pre_ping=True,   # verifies connection is alive before use
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)


# Auto-initialize tables on import
init_db()


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
