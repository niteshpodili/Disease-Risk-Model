from fastapi import APIRouter, HTTPException, Request
from backend.app.schemas.analysis import ModelMetadataResponse
from backend.app.services.ml_service import ml_service
from backend.app.core.security import limiter
from backend.app.core.config import settings

router = APIRouter()

@router.get("/model/metadata", response_model=ModelMetadataResponse, summary="Get Active ML Model Metrics and Global Feature Importances")
@limiter.limit(settings.RATE_LIMIT_GENERAL)
def get_model_metadata(request: Request):
    metadata = ml_service.get_metadata()
    if not metadata:
        raise HTTPException(status_code=404, detail="Model metadata not found. Please train model.")
    return metadata
