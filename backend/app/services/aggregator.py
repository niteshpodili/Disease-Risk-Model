import uuid
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session

from backend.app.schemas.analysis import HeartPredictionInput, AnalysisResponse
from backend.app.services.ml_service import ml_service
from backend.app.services.quantum_service import quantum_service
from backend.app.models.analysis import Analysis

class AggregatorService:
    def analyze(self, data: HeartPredictionInput, db: Optional[Session] = None) -> Dict[str, Any]:
        analysis_id = str(uuid.uuid4())
        timestamp = datetime.now(timezone.utc).isoformat()

        # 1. Classical ML Prediction
        ml_result = ml_service.predict(
            age=data.age,
            gender=data.gender,
            blood_pressure=data.blood_pressure,
            cholesterol=data.cholesterol,
            heart_rate=data.heart_rate
        )

        # 2. Experimental Quantum Simulation
        quantum_result = quantum_service.simulate(
            age=data.age,
            blood_pressure=data.blood_pressure,
            cholesterol=data.cholesterol,
            heart_rate=data.heart_rate,
            shots=data.shots or 1024
        )

        # 3. Comparative Analytics
        ml_pct = ml_result["risk_percentage"]
        q_score = quantum_result["experimental_score"]
        delta = round(abs(ml_pct - q_score), 2)

        if delta <= 15.0:
            agreement_level = "High Alignment"
        elif delta <= 30.0:
            agreement_level = "Moderate Alignment"
        else:
            agreement_level = "Divergent / Exploratory"

        comparison = {
            "ml_risk_percentage": ml_pct,
            "quantum_score": q_score,
            "delta": delta,
            "agreement_level": agreement_level
        }

        # 4. Minimal Database Persistence (Resilient)
        if db is not None:
            try:
                db_record = Analysis(
                    id=analysis_id,
                    age=data.age,
                    gender=data.gender,
                    blood_pressure=data.blood_pressure,
                    cholesterol=data.cholesterol,
                    heart_rate=data.heart_rate,
                    ml_risk_probability=ml_result["risk_probability"],
                    ml_risk_percentage=ml_pct,
                    ml_risk_category=ml_result["risk_category"],
                    ml_prediction_label=ml_result["prediction_label"],
                    quantum_score=q_score,
                    created_at=datetime.now(timezone.utc)
                )
                db.add(db_record)
                db.commit()
            except Exception as e:
                db.rollback()
                print(f"[AggregatorService] DB persistence warning: {e}")

        return {
            "id": analysis_id,
            "timestamp": timestamp,
            "input": data.model_dump(),
            "classical_ml": ml_result,
            "quantum_simulation": quantum_result,
            "comparison": comparison
        }

aggregator_service = AggregatorService()
