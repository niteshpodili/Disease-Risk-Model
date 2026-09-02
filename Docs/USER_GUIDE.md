# CardioQuantum — User Guide and Demonstration Playbook
### Smart India Hackathon MVP (SIH26139)

Welcome to the **CardioQuantum** healthcare analytics platform demonstration guide. This playbook explains how to operate the platform, interpret the dual prediction engines, and present a 2-minute demonstration flow.

---

## 1. Platform Navigation and Overview

The user interface follows a modern **High-Fidelity Claymorphism** design system with tactile controls:

* **Sticky Top Navbar**: Shows system health status (`System Active`), active model architecture (`Gradient Boosting`), and project metadata.
* **Disclaimer Banner**: Reinforces that Classical ML is the primary predictor and Quantum simulation is non-clinical.
* **Biometric Configuration Form**: Interactive radial dials and synchronized typing inputs for patient parameters.
* **Results Dashboard**: Radial risk score gauge, diagnostic status, and submitted biometric summaries.
* **Classical vs. Quantum Comparison**: Side-by-side score breakdown and measured quantum basis states histogram.
* **Explainability Panel**: Dataset-level global feature importance weights.
* **Recent Sessions Log**: Real-time anonymized history stored via PostgreSQL.

---

## 2. How to Input Biometric Parameters

You have two convenient methods to configure patient data:

### Method A: Quick Demo Profiles (Recommended for Fast Demos)
Click any of the 3 preset buttons at the top of the form:
* **Healthy Adult**: 32y Female, BP: 110 mmHg, Chol: 175 mg/dL, HR: 68 bpm -> Low Risk Tier.
* **Moderate Risk**: 55y Male, BP: 135 mmHg, Chol: 215 mg/dL, HR: 82 bpm -> Moderate Risk Tier.
* **High Risk Senior**: 72y Male, BP: 160 mmHg, Chol: 265 mg/dL, HR: 102 bpm -> High Risk Tier.

### Method B: Custom Dial and Numeric Input
For each of the 4 continuous parameters:
1. **Interactive Radial Dial**: Drag or click anywhere along the circular arc to rotate the dial knob.
2. **Compact Numeric Box**: Type any value directly into the input field below the dial.
3. **Stepper Buttons (- / +)**: Click the step buttons for fine single-unit adjustments.

---

## 3. Running the Hybrid Analysis

1. Click the button: **`Run Hybrid Risk Analysis`**.
2. The button will transition into a loading state ("Simulating Quantum and ML Engine...").
3. Within 200ms, the backend runs the Scikit-learn Gradient Boosting pipeline and Qiskit 4-qubit circuit simulation simultaneously.
4. The dashboard automatically renders the dynamic results below.

---

## 4. Interpreting the Results

### A. Clinical Risk Gauge (Classical ML Engine)
* **Risk Score Percentage**: Calibrated class probability (0.0% - 100.0%).
* **Risk Categorization**:
  * **Low Risk (0% - 33%)**: Biometrics align with baseline healthy distributions.
  * **Moderate Risk (34% - 66%)**: Borderline biometric elevation; lifestyle or monitoring recommended.
  * **High Risk (67% - 100%)**: High probability cluster of cardiovascular risk factors.
* **Diagnostic Prediction**: Binary clinical classification (`Disease Indicated` vs. `No Disease Indicated`).

### B. Experimental Quantum Simulation Module
* **Experimental Quantum Score**: Subspace entanglement alignment score from the 4-qubit circuit.
* **Alignment Delta**: Difference between Classical ML probability and Quantum score.
* **Top Measured Quantum Basis States**: Histogram of simulated projective readouts (such as |0101>, |1100>) across 1024 shots in Qiskit `AerSimulator`.
* **Important**: Always labeled as *Non-Clinical Educational Simulation*.

---

## 5. Two-Minute Hackathon Demo Script

```text
[00:00 - 00:20] "CardioQuantum is a hybrid healthcare demonstration platform built for SIH26139.
                 It pairs a validated Classical Machine Learning model with an experimental 4-qubit Qiskit quantum circuit."

[00:20 - 00:45] "Let's load the 'Healthy Adult' preset. The radial dials instantly snap to 32y Female, 110 BP, 175 Chol.
                 Running analysis... The ML engine yields 18.2% Low Risk."

[00:45 - 01:15] "Now let's switch to the 'High Risk Senior' preset with elevated BP of 160 and Chol of 265.
                 Running analysis... The ML risk climbs to 90.7% High Risk with 'Disease Indicated'."

[01:15 - 01:45] "Here in the Comparison Card, we compare the ML prediction against the 4-qubit quantum simulation,
                 showing the top measured statevector distribution from Qiskit Aer."

[01:45 - 02:00] "Below, we see global feature importances—Cholesterol and Age carry over 70% of the predictive weight—and
                 the session is automatically persisted in the anonymized Realtime database."
```
