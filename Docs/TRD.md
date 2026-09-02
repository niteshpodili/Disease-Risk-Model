# Technical Requirements Document (TRD)

## Quantum-Inspired Heart Disease Risk Model

**SIH Reference:** SIH26139  
**Version:** 1.0  
**Document Type:** Technical Requirements Document  
**Platform:** Web Application  

---

# 1. Technical Overview

The Quantum-Inspired Heart Disease Risk Model is a web application that predicts heart disease risk using classical machine learning and compares the result with an experimental quantum circuit simulation.

The system consists of:

- React frontend
- Node.js backend
- PostgreSQL database
- Classical ML prediction module
- Qiskit quantum simulation module

The classical ML model is the primary prediction engine. The quantum module is included only for experimental comparison and demonstration.

---

# 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js |
| API | REST API |
| Database | PostgreSQL |
| ML | Python + Scikit-learn |
| Data Processing | Pandas + NumPy |
| Model Storage | Joblib |
| Quantum | Qiskit + Qiskit Aer |
| Charts | Recharts |
| Version Control | Git + GitHub |

---

# 3. System Architecture

```text
                    USER
                      |
                      v
              React Frontend
                      |
                      v
               Node.js API
                      |
          ----------------------
          |                    |
          v                    v
    ML Prediction        Quantum Module
    Scikit-learn          Qiskit Circuit
          |                    |
          ----------- ----------
                      |
                      v
              Result Processor
                      |
                      v
                PostgreSQL