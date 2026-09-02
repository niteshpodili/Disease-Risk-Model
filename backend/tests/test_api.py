import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.database.session import init_db

@pytest.fixture(autouse=True)
def setup_db():
    init_db()

client = TestClient(app)

def test_health_endpoint():
    with TestClient(app) as c:
        response = c.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["ml_model_loaded"] is True

def test_model_metadata_endpoint():
    with TestClient(app) as c:
        response = c.get("/api/v1/model/metadata")
        assert response.status_code == 200
        data = response.json()
        assert "model_name" in data
        assert "global_feature_importances" in data

def test_analyze_endpoint_success():
    payload = {
        "age": 55,
        "gender": 1,
        "blood_pressure": 130,
        "cholesterol": 215,
        "heart_rate": 88,
        "shots": 512
    }
    with TestClient(app) as c:
        response = c.post("/api/v1/analyze", json=payload)
        assert response.status_code == 200
        data = response.json()

        assert "id" in data
        assert "classical_ml" in data
        assert "quantum_simulation" in data
        assert "comparison" in data

        assert 0.0 <= data["classical_ml"]["risk_percentage"] <= 100.0
        assert 0.0 <= data["quantum_simulation"]["experimental_score"] <= 100.0
        assert "delta" in data["comparison"]
        assert "agreement_level" in data["comparison"]

def test_analyze_endpoint_validation_error():
    # Invalid age (under 30)
    bad_payload = {
        "age": 15,
        "gender": 1,
        "blood_pressure": 130,
        "cholesterol": 215,
        "heart_rate": 88
    }
    with TestClient(app) as c:
        response = c.post("/api/v1/analyze", json=bad_payload)
        assert response.status_code == 422

def test_analyses_history_endpoint():
    with TestClient(app) as c:
        response = c.get("/api/v1/analyses?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

