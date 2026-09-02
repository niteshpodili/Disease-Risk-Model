from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from backend.app.schemas.analysis import (
    HeartPredictionInput,
    AnalysisResponse,
    AnalysisHistoryItem
)
from backend.app.services.aggregator import aggregator_service
from backend.app.database.session import get_db
from backend.app.models.analysis import Analysis
from backend.app.core.security import limiter
from backend.app.core.config import settings

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse, summary="Perform Classical ML Prediction and Quantum Simulation")
@limiter.limit(settings.RATE_LIMIT_ANALYZE)
def analyze_patient(
    request: Request,
    payload: HeartPredictionInput,
    db: Session = Depends(get_db)
):
    try:
        result = aggregator_service.analyze(data=payload, db=db)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis processing failed: {str(e)}")

@router.get("/analyses", response_model=List[AnalysisHistoryItem], summary="Retrieve Recent Anonymized Analysis Sessions")
@limiter.limit(settings.RATE_LIMIT_GENERAL)
def get_analyses(
    request: Request,
    limit: int = 15,
    db: Session = Depends(get_db)
):
    try:
        records = db.query(Analysis).order_by(Analysis.created_at.desc()).limit(min(limit, 50)).all()
        return [
            AnalysisHistoryItem(
                id=r.id,
                age=r.age,
                gender=r.gender,
                blood_pressure=r.blood_pressure,
                cholesterol=r.cholesterol,
                heart_rate=r.heart_rate,
                ml_risk_percentage=r.ml_risk_percentage,
                ml_risk_category=r.ml_risk_category,
                quantum_score=r.quantum_score,
                created_at=r.created_at.isoformat() if r.created_at else ""
            )
            for r in records
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch analyses history: {str(e)}")
