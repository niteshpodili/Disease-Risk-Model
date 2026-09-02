import pytest
from backend.app.services.quantum_service import quantum_service

def test_quantum_simulation_execution():
    result = quantum_service.simulate(
        age=55,
        blood_pressure=130,
        cholesterol=215,
        heart_rate=88,
        shots=512
    )

    assert "circuit_type" in result
    assert "experimental_score" in result
    assert 0.0 <= result["experimental_score"] <= 100.0
    assert result["shots"] == 512
    assert "top_state_counts" in result
    assert len(result["top_state_counts"]) > 0
    assert "Non-Clinical" in result["disclaimer"]

def test_quantum_simulation_boundary_inputs():
    res_min = quantum_service.simulate(age=30, blood_pressure=90, cholesterol=150, heart_rate=60, shots=256)
    assert 0.0 <= res_min["experimental_score"] <= 100.0

    res_max = quantum_service.simulate(age=80, blood_pressure=180, cholesterol=280, heart_rate=120, shots=256)
    assert 0.0 <= res_max["experimental_score"] <= 100.0
