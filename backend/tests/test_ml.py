import pytest
from backend.app.services.ml_service import ml_service

def test_ml_service_loaded():
    assert ml_service.is_ready() is True
    metadata = ml_service.get_metadata()
    assert "model_name" in metadata
    assert "global_feature_importances" in metadata
    assert len(metadata["global_feature_importances"]) == 5

def test_ml_prediction_valid_ranges():
    result = ml_service.predict(
        age=55,
        gender=1,
        blood_pressure=130,
        cholesterol=215,
        heart_rate=88
    )

    assert "model_name" in result
    assert 0.0 <= result["risk_probability"] <= 1.0
    assert 0.0 <= result["risk_percentage"] <= 100.0
    assert result["risk_category"] in ["Low Risk", "Moderate Risk", "High Risk"]
    assert result["prediction_label"] in (0, 1)

def test_ml_prediction_extreme_cases():
    # Healthy young profile
    low_res = ml_service.predict(age=30, gender=0, blood_pressure=95, cholesterol=160, heart_rate=65)
    assert 0.0 <= low_res["risk_percentage"] <= 100.0

    # High risk older profile
    high_res = ml_service.predict(age=75, gender=1, blood_pressure=170, cholesterol=270, heart_rate=110)
    assert 0.0 <= high_res["risk_percentage"] <= 100.0
