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

        # ── Clinical Threshold Override (ACC/AHA / NCEP ATP III) ──────────────
        # The trained sklearn model can under-predict for extreme biomarker values
        # that are rare in the training set. We apply evidence-based severity
        # scoring as a floor/override to ensure dangerous readings are never
        # classified as "Low Risk" regardless of age.

        # Cholesterol severity score
        if   cholesterol < 180: chol_score = 0.00
        elif cholesterol < 200: chol_score = 0.08
        elif cholesterol < 220: chol_score = 0.18
        elif cholesterol < 240: chol_score = 0.30
        elif cholesterol < 260: chol_score = 0.46
        elif cholesterol < 280: chol_score = 0.58
        elif cholesterol < 320: chol_score = 0.72
        else:                   chol_score = 0.88

        # Blood pressure severity score
        if   blood_pressure < 110: bp_score = 0.00
        elif blood_pressure < 120: bp_score = 0.05
        elif blood_pressure < 130: bp_score = 0.12
        elif blood_pressure < 140: bp_score = 0.26
        elif blood_pressure < 150: bp_score = 0.42
        elif blood_pressure < 160: bp_score = 0.56
        elif blood_pressure < 180: bp_score = 0.70
        else:                      bp_score = 0.84

        # Heart rate severity score
        if   heart_rate < 60:  hr_score = 0.00
        elif heart_rate < 70:  hr_score = 0.02
        elif heart_rate < 80:  hr_score = 0.06
        elif heart_rate < 90:  hr_score = 0.15
        elif heart_rate < 100: hr_score = 0.28
        elif heart_rate < 110: hr_score = 0.42
        elif heart_rate < 120: hr_score = 0.56
        else:                  hr_score = 0.68

        # Age modifier (5–20% only — cannot suppress severe biomarker risk)
        age_modifier = 0.05 + 0.15 * min(1.0, max(0.0, (age - 18) / 72.0))
        gender_mod = 0.03 if gender == 1 else -0.02

        # Compound penalty when 2+ biomarkers are elevated simultaneously
        elevated_count = sum([chol_score >= 0.30, bp_score >= 0.26, hr_score >= 0.15])
        compound_penalty = 0.18 if elevated_count >= 3 else (0.09 if elevated_count == 2 else 0.0)

        # Clinical evidence-based risk score (biomarkers dominate at 90% weight)
        clinical_risk = (
            0.40 * chol_score +
            0.30 * bp_score   +
            0.20 * hr_score   +
            age_modifier      +
            gender_mod        +
            compound_penalty
        )
        clinical_risk = max(0.04, min(0.97, clinical_risk))

        # Final: take the MAX of sklearn probability and clinical score.
        # This ensures extreme biomarkers are never under-flagged.
        final_risk_prob = max(risk_prob, clinical_risk)
        risk_pct = round(final_risk_prob * 100.0, 2)
        prediction_label = 1 if final_risk_prob >= 0.34 else 0

        # Risk categorization
        if risk_pct <= 33.0:
            category = "Low Risk"
        elif risk_pct <= 66.0:
            category = "Moderate Risk"
        else:
            category = "High Risk"

        return {
            "model_name": self.metadata.get("model_name", "Primary Classifier"),
            "risk_probability": round(final_risk_prob, 4),
            "risk_percentage": risk_pct,
            "risk_category": category,
            "prediction_label": prediction_label
        }

    def get_metadata(self) -> Dict[str, Any]:
        if not self.is_ready():
            self._load_artifacts()
        return self.metadata or {}

ml_service = MLService()
