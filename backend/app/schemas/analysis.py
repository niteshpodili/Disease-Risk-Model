from typing import Dict, Any, Optional, List
from pydantic import BaseModel, Field, field_validator
from datetime import datetime

class HeartPredictionInput(BaseModel):
    age: int = Field(..., ge=30, le=100, description="Patient age in years (30-100)")
    gender: int = Field(..., ge=0, le=1, description="0 for Female, 1 for Male")
    blood_pressure: int = Field(..., ge=80, le=220, description="Systolic Blood Pressure in mmHg (80-220)")
    cholesterol: int = Field(..., ge=100, le=400, description="Serum Cholesterol in mg/dL (100-400)")
    heart_rate: int = Field(..., ge=40, le=180, description="Resting Heart Rate in bpm (40-180)")
    shots: Optional[int] = Field(default=1024, ge=100, le=4096, description="Quantum simulation shot count")

    @field_validator('gender')
    @classmethod
    def validate_gender(cls, v: int) -> int:
        if v not in (0, 1):
            raise ValueError('Gender must be 0 (Female) or 1 (Male)')
        return v

class ClassicalMLOutput(BaseModel):
    model_name: str
    risk_probability: float
    risk_percentage: float
    risk_category: str
    prediction_label: int

class QuantumSimulationOutput(BaseModel):
    circuit_type: str
    experimental_score: float
    shots: int
    top_state_counts: Optional[Dict[str, int]] = None
    disclaimer: str

class ComparisonOutput(BaseModel):
    ml_risk_percentage: float
    quantum_score: float
    delta: float
    agreement_level: str

class AnalysisResponse(BaseModel):
    id: str
    timestamp: str
    input: HeartPredictionInput
    classical_ml: ClassicalMLOutput
    quantum_simulation: QuantumSimulationOutput
    comparison: ComparisonOutput

class AnalysisHistoryItem(BaseModel):
    id: str
    age: int
    gender: int
    blood_pressure: int
    cholesterol: int
    heart_rate: int
    ml_risk_percentage: float
    ml_risk_category: str
    quantum_score: float
    created_at: str

class ModelMetadataResponse(BaseModel):
    model_name: str
    feature_names: List[str]
    target_name: str
    trained_at: str
    dataset_samples: int
    cv_metrics: Dict[str, Any]
    test_metrics: Dict[str, Any]
    global_feature_importances: Dict[str, float]
    risk_thresholds: Dict[str, List[float]]
    disclaimer: str
