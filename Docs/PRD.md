Product Requirements Document (PRD)
Quantum-Inspired Heart Disease Risk Model

SIH Reference: SIH26139
Version: 1.0
Project Type: Healthcare Analytics & Quantum Computing Demonstration
Dataset: Heart Prediction Dataset (Quantum)

1. Product Overview

The Quantum-Inspired Heart Disease Risk Model is a web-based application that predicts the potential risk of heart disease using patient health data.

The system combines two approaches:

Classical Machine Learning for primary heart disease risk prediction.
Toy Quantum Circuit Simulation for experimental comparison.

The application allows users to enter patient health parameters, receive a heart disease risk prediction from a classical ML model, and compare it with an experimental quantum-inspired result.

The project is designed as an educational and hackathon demonstration platform and is not intended for clinical diagnosis.

2. Problem Statement

Heart disease risk depends on multiple health factors such as age, gender, blood pressure, cholesterol, and heart rate.

Analyzing these parameters manually can be difficult. Machine learning can identify patterns in patient data and estimate disease risk.

At the same time, quantum computing is an emerging technology that may influence future healthcare analytics.

This project demonstrates how classical machine learning and quantum-inspired computing concepts can be combined in a single healthcare analytics application.

3. Project Objectives
Predict heart disease risk using patient data.
Train a classical machine learning model.
Implement a toy quantum circuit using selected health features.
Compare classical ML and quantum simulation outputs.
Provide a clear and interactive visualization dashboard.
Demonstrate a working hybrid AI and quantum computing concept.
4. Target Users
Primary Users
Hackathon judges
Students and researchers
Healthcare technology enthusiasts
AI and quantum computing learners
Secondary Users
Educational institutions
Healthcare researchers
Technology agencies
5. Dataset

The project uses the Heart Prediction Dataset (Quantum) from Kaggle.

The dataset contains patient health information and a heart disease prediction target.

Expected features include:

Age
Gender
Blood Pressure
Cholesterol
Heart Rate
Quantum Pattern Feature
Heart Disease Target

The dataset will be used to train and evaluate the classical machine learning model.

6. Core Features
6.1 Patient Health Data Input

Users can enter health parameters through a web form.

The system will validate the entered values before analysis.

6.2 Classical ML Prediction

The system will process patient data using a trained machine learning model.

The output will include:

Heart disease risk score
Risk percentage
Risk category

Risk categories:

Risk Score	Category
0–33%	Low Risk
34–66%	Moderate Risk
67–100%	High Risk
6.3 Quantum Simulation

Selected patient features will be processed using a toy quantum circuit.

The quantum module will:

Normalize selected features.
Encode features into qubits.
Apply basic quantum gates.
Run the circuit on a simulator.
Generate an experimental probability score.
6.4 Classical vs Quantum Comparison

The system will display both results side by side.

The comparison dashboard will show:

Classical ML risk score.
Quantum simulation score.
Difference between outputs.
Visual comparison chart.

The quantum output will always be marked as experimental.

6.5 Results Dashboard

The dashboard will display:

Patient input summary.
Classical ML prediction.
Risk category.
Quantum experiment result.
Comparison chart.
Medical disclaimer.
7. User Flow
User Opens Application
        ↓
Enters Patient Health Data
        ↓
System Validates Input
        ↓
Classical ML Model Runs
        +
Quantum Circuit Simulation Runs
        ↓
Results Are Generated
        ↓
Comparison Dashboard Is Displayed
8. Functional Requirements
ID	Requirement
FR-01	User can enter patient health data
FR-02	System validates user input
FR-03	System predicts heart disease risk using ML
FR-04	System generates a risk percentage
FR-05	System categorizes the risk
FR-06	System runs a toy quantum circuit
FR-07	System generates a quantum experimental score
FR-08	System compares both outputs
FR-09	System displays results visually
FR-10	System displays a medical disclaimer
9. Non-Functional Requirements
Performance
Predictions should be generated within a few seconds.
The application should provide a smooth user experience.
Usability
Interface should be simple and easy to understand.
Results should be clearly visualized.
Reliability
Invalid inputs should be handled safely.
If the quantum module fails, the classical ML result should still be displayed.
Scalability

The system should support future additions such as:

Multiple diseases.
Additional ML models.
Larger datasets.
Advanced quantum algorithms.
10. MVP Scope

The MVP will include:

One heart disease dataset.
Patient data input form.
Classical ML prediction.
Risk classification.
Toy quantum circuit simulation.
Classical vs quantum comparison.
Interactive results dashboard.
11. Out of Scope

The following are not included in the MVP:

Real medical diagnosis.
Treatment recommendations.
Prescription generation.
Hospital integration.
Electronic health records.
Real quantum hardware.
Multiple disease prediction.
12. Success Criteria

The MVP will be considered successful if:

Users can enter patient data.
The ML model successfully predicts heart disease risk.
The quantum circuit simulation executes successfully.
Both outputs are displayed together.
The comparison is easy for judges to understand.
The complete workflow works end-to-end.
13. Future Enhancements

Future versions may include:

Multiple disease prediction.
Explainable AI.
Feature importance visualization.
Larger clinical datasets.
Advanced quantum machine learning models.
IBM Quantum integration.
Healthcare professional dashboard.
Secure patient data management.
14. Disclaimer

This project is developed for educational, research, and hackathon demonstration purposes only.

The system does not provide medical diagnosis or professional healthcare advice.

The quantum simulation module is experimental and should not be considered a clinically validated prediction system.

15. Product Summary

The Quantum-Inspired Heart Disease Risk Model demonstrates a hybrid approach to healthcare analytics by combining:

Patient Data + Classical Machine Learning + Quantum Circuit Simulation

The classical ML model acts as the primary prediction engine, while the quantum module provides an experimental demonstration of emerging quantum computing concepts.

The main objective of the SIH MVP is to build a simple, functional, and visually impressive end-to-end system within the hackathon timeframe.