import numpy as np
from typing import Dict, Any
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

class QuantumService:
    def __init__(self):
        self.simulator = AerSimulator()

    def simulate(
        self,
        age: int,
        blood_pressure: int,
        cholesterol: int,
        heart_rate: int,
        shots: int = 1024
    ) -> Dict[str, Any]:
        """
        Executes a 4-qubit parameterized variational toy quantum circuit:
        - Normalizes continuous health features into angle domain [0, pi]
        - Initializes equal superposition via Hadamard gates
        - Applies Ry angle rotations for feature encoding
        - Applies CNOT ladder for multi-parameter entanglement
        - Simulates on Qiskit Aer and returns non-clinical experimental score
        """
        # Feature angle normalization [0, pi]
        # Ranges: Age [30, 80], BP [90, 180], Chol [150, 280], HR [60, 120]
        theta_age = float(np.clip((age - 30.0) / (80.0 - 30.0), 0.0, 1.0) * np.pi)
        theta_bp = float(np.clip((blood_pressure - 90.0) / (180.0 - 90.0), 0.0, 1.0) * np.pi)
        theta_chol = float(np.clip((cholesterol - 150.0) / (280.0 - 150.0), 0.0, 1.0) * np.pi)
        theta_hr = float(np.clip((heart_rate - 60.0) / (120.0 - 60.0), 0.0, 1.0) * np.pi)

        qc = QuantumCircuit(4, 4)

        # 1. Hadamard Superposition
        for q in range(4):
            qc.h(q)

        # 2. Angle Encoding via Ry rotations
        qc.ry(theta_age, 0)
        qc.ry(theta_bp, 1)
        qc.ry(theta_chol, 2)
        qc.ry(theta_hr, 3)

        # 3. Entanglement Ladder
        qc.cx(0, 1)
        qc.cx(1, 2)
        qc.cx(2, 3)
        qc.cx(3, 0)

        # 4. Measurement
        qc.measure(range(4), range(4))

        # 5. Aer Simulation
        job = self.simulator.run(qc, shots=shots)
        counts = job.result().get_counts()

        # 6. Experimental Score Calculation
        # High-energy / multi-qubit correlated states (Hamming weight >= 2)
        high_energy_shots = 0
        for state, count in counts.items():
            if state.count('1') >= 2:
                high_energy_shots += count

        experimental_score = round((high_energy_shots / shots) * 100.0, 2)

        # Filter top 5 most frequent states for dashboard visualization
        sorted_counts = dict(sorted(counts.items(), key=lambda item: item[1], reverse=True)[:5])

        return {
            "circuit_type": "4-Qubit Variational Toy Circuit (H + Ry + CX)",
            "experimental_score": experimental_score,
            "shots": shots,
            "top_state_counts": sorted_counts,
            "disclaimer": "Experimental Quantum Simulation Score — Non-Clinical"
        }

quantum_service = QuantumService()
