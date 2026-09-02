# System Architecture

## Quantum-Inspired Heart Disease Risk Model

**SIH Reference:** SIH26139
**Version:** 1.0
**Architecture Type:** Modular Web Application Architecture

---

# 1. Architecture Overview

The Quantum-Inspired Heart Disease Risk Model follows a modular client-server architecture.

The system consists of four primary layers:

1. Presentation Layer
2. Application/API Layer
3. Intelligence Layer
4. Data Layer

The architecture separates the user interface, business logic, machine learning prediction, quantum simulation, and data storage.

```text
┌──────────────────────────────────────────────┐
│                   USER                       │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             PRESENTATION LAYER               │
│                                              │
│         React + TypeScript Frontend          │
│                                              │
│  • Landing Page                              │
│  • Patient Input Form                        │
│  • Results Dashboard                         │
│  • Comparison Visualization                  │
└──────────────────────┬───────────────────────┘
                       │ HTTPS / REST API
                       ▼
┌──────────────────────────────────────────────┐
│              APPLICATION LAYER               │
│                                              │
│              FastAPI Backend                 │
│                                              │
│  • API Routing                               │
│  • Input Validation                          │
│  • Request Processing                        │
│  • Result Aggregation                        │
│  • Error Handling                            │
└───────────────┬──────────────────┬───────────┘
                │                  │
                ▼                  ▼
┌────────────────────────┐  ┌──────────────────────┐
│   CLASSICAL ML ENGINE  │  │   QUANTUM ENGINE     │
│                        │  │                      │
│    Scikit-learn        │  │      Qiskit          │
│                        │  │                      │
│ • Data Processing      │  │ • Feature Encoding   │
│ • Risk Prediction      │  │ • Quantum Circuit    │
│ • Probability Score    │  │ • Simulation         │
└────────────┬───────────┘  └───────────┬──────────┘
             │                          │
             └────────────┬─────────────┘
                          ▼
┌──────────────────────────────────────────────┐
│              RESULT PROCESSOR                │
│                                              │
│ • ML Risk Score                              │
│ • Quantum Experimental Score                 │
│ • Risk Classification                        │
│ • Result Comparison                          │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 DATA LAYER                   │
│                                              │
│               PostgreSQL                     │
│                                              │
│ • Analysis History                           │
│ • Prediction Results                         │
│ • System Metadata                            │
└──────────────────────────────────────────────┘
```

---

# 2. Architecture Layers

## 2.1 Presentation Layer

The presentation layer is responsible for user interaction.

### Technology

* React
* TypeScript
* Tailwind CSS
* Recharts

### Responsibilities

* Display application interface.
* Collect patient health parameters.
* Validate basic user input.
* Send requests to backend.
* Display prediction results.
* Visualize ML and quantum comparison.

---

# 3. Application Layer

The application layer acts as the central controller of the system.

### Technology

* FastAPI
* Python

### Responsibilities

* Receive frontend requests.
* Validate input data.
* Trigger ML prediction.
* Trigger quantum simulation.
* Combine results.
* Return structured response.
* Handle application errors.

```text
Frontend Request
       ↓
Input Validation
       ↓
Analysis Controller
       ↓
 ┌───────────────┬───────────────┐
 ↓               ↓
ML Engine     Quantum Engine
 └───────────────┬───────────────┘
                 ↓
          Result Aggregation
                 ↓
          API Response
```

---

# 4. Classical ML Architecture

The ML engine is the primary prediction component.

```text
Dataset
   ↓
Data Cleaning
   ↓
Feature Processing
   ↓
Train/Test Split
   ↓
ML Model Training
   ↓
Model Evaluation
   ↓
Saved Model
   ↓
Prediction API
```

### Responsibilities

* Load trained model.
* Process patient features.
* Generate prediction.
* Calculate probability.
* Generate risk category.

### Recommended Model

Random Forest Classifier.

Alternative models:

* Logistic Regression
* Decision Tree
*
