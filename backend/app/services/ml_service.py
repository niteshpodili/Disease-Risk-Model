import os
import json
import joblib
import pandas as pd
from typing import Dict, Any, Tuple

class MLService:
    def __init__(self):
        self.model = None
        self.metadata = None
        self._load_artifacts()

    def _load_artifacts(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        model_path = os.path.join(base_dir, "artifacts", "heart_risk_model.joblib")
        meta_path = os.path.join(base_dir, "artifacts", "model_meta.json")

        if os.path.exists(model_path) and os.path.exists(meta_path):
            self.model = joblib.load(model_path)
            with open(meta_path, "r") as f:
                self.metadata = json.load(f)
            print(f"[MLService] Loaded model: {self.metadata.get('model_name', 'Unknown')}")
        else:
            print(f"[MLService] Warning: Artifacts not found at {model_path}. Please run train_model.py")

    def is_ready(self) -> bool:
        return self.model is not None and self.metadata is not None

    def predict(self, age: int, gender: int, blood_pressure: int, cholesterol: int, heart_rate: int) -> Dict[str, Any]:
        if not self.is_ready():
            self._load_artifacts()
            if not self.is_ready():
                raise RuntimeError("ML Model artifact is not available. Please train the model first.")

        # Create DataFrame matching feature names
        input_df = pd.DataFrame([{
            "Age": age,
            "Gender": gender,
            "BloodPressure": blood_pressure,
            "Cholesterol": cholesterol,
            "HeartRate": heart_rate
        }])

        # Probability calculation
        probabilities = self.model.predict_proba(input_df)[0]
        risk_prob = float(probabilities[1])
        risk_pct = round(risk_prob * 100.0, 2)
        prediction_label = int(self.model.predict(input_df)[0])

        # Risk categorization based on PRD:
        # 0–33%: Low Risk, 34–66%: Moderate Risk, 67–100%: High Risk
        if risk_pct <= 33.0:
            category = "Low Risk"
        elif risk_pct <= 66.0:
            category = "Moderate Risk"
        else:
            category = "High Risk"

        return {
            "model_name": self.metadata.get("model_name", "Primary Classifier"),
            "risk_probability": round(risk_prob, 4),
            "risk_percentage": risk_pct,
            "risk_category": category,
            "prediction_label": prediction_label
        }

    def get_metadata(self) -> Dict[str, Any]:
        if not self.is_ready():
            self._load_artifacts()
        return self.metadata or {}

ml_service = MLService()
