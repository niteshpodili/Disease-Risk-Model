from fastapi import APIRouter
from backend.app.core.config import settings
from backend.app.services.ml_service import ml_service

router = APIRouter()

@router.get("/health", summary="System Health Check")
def health_check():
    return {
        "status": "healthy",
        "project_name": settings.PROJECT_NAME,
        "sih_reference": settings.SIH_REFERENCE,
        "ml_model_loaded": ml_service.is_ready(),
        "database_connected": True
    }
