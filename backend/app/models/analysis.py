import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, DateTime
from backend.app.database.base import Base

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    age = Column(Integer, nullable=False)
    gender = Column(Integer, nullable=False)
    blood_pressure = Column(Integer, nullable=False)
    cholesterol = Column(Integer, nullable=False)
    heart_rate = Column(Integer, nullable=False)
    
    # Classical ML Results
    ml_risk_probability = Column(Float, nullable=False)
    ml_risk_percentage = Column(Float, nullable=False)
    ml_risk_category = Column(String(20), nullable=False)
    ml_prediction_label = Column(Integer, nullable=False)
    
    # Quantum Simulation Results
    quantum_score = Column(Float, nullable=False)
    
    # Metadata
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "age": self.age,
            "gender": self.gender,
            "blood_pressure": self.blood_pressure,
            "cholesterol": self.cholesterol,
            "heart_rate": self.heart_rate,
            "ml_risk_probability": self.ml_risk_probability,
            "ml_risk_percentage": self.ml_risk_percentage,
            "ml_risk_category": self.ml_risk_category,
            "ml_prediction_label": self.ml_prediction_label,
            "quantum_score": self.quantum_score,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
