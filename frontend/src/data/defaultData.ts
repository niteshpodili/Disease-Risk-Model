import type {
  ModelMetadataResponse,
  AnalysisResponse,
  AnalysisHistoryItem
} from '../types';

export const defaultModelMetadata: ModelMetadataResponse = {
  model_name: "Gradient Boosting",
  feature_names: ["Age", "Gender", "BloodPressure", "Cholesterol", "HeartRate"],
  target_name: "HeartDisease",
  trained_at: "2026-09-02T08:33:30.250438Z",
  dataset_samples: 500,
  cv_metrics: {
    cv_accuracy_mean: 0.7825,
    cv_accuracy_std: 0.035,
    cv_precision_mean: 0.8316,
    cv_recall_mean: 0.8083,
    cv_f1_mean: 0.8161,
    cv_f1_std: 0.031,
    cv_roc_auc_mean: 0.871
  },
  test_metrics: {
    test_accuracy: 0.85,
    test_precision: 0.8689,
    test_recall: 0.8833,
    test_f1: 0.876,
    test_roc_auc: 0.8988
  },
  global_feature_importances: {
    Age: 0.3527,
    Gender: 0.0198,
    BloodPressure: 0.1013,
    Cholesterol: 0.3648,
    HeartRate: 0.1613
  },
  risk_thresholds: {
    low: [0.0, 0.33],
    moderate: [0.34, 0.66],
    high: [0.67, 1.0]
  },
  disclaimer: "Global Model Feature Importance — Dataset-level predictive weights, not individual patient diagnostic causation."
};

export const defaultAnalysisResult: AnalysisResponse = {
  id: "init-session-55m",
  timestamp: new Date().toISOString(),
  input: {
    age: 55,
    gender: 1,
    blood_pressure: 130,
    cholesterol: 215,
    heart_rate: 88,
    shots: 1024
  },
  classical_ml: {
    model_name: "Gradient Boosting",
    risk_probability: 0.5133,
    risk_percentage: 51.33,
    risk_category: "Moderate Risk",
    prediction_label: 1
  },
  quantum_simulation: {
    circuit_type: "4-Qubit Variational Toy Circuit (H + Ry + CX)",
    experimental_score: 56.45,
    shots: 1024,
    top_state_counts: {
      "0101": 348,
      "1100": 230,
      "1010": 172,
      "1001": 146,
      "0110": 128
    },
    disclaimer: "Experimental Quantum Simulation Score — Non-Clinical"
  },
  comparison: {
    ml_risk_percentage: 51.33,
    quantum_score: 56.45,
    delta: 5.12,
    agreement_level: "High Alignment"
  }
};

export const defaultHistory: AnalysisHistoryItem[] = [
  {
    id: "d8f3a1b2-901c-4e89-8d76-123456789abc",
    age: 55,
    gender: 1,
    blood_pressure: 130,
    cholesterol: 215,
    heart_rate: 88,
    ml_risk_percentage: 51.3,
    ml_risk_category: "Moderate Risk",
    quantum_score: 56.5,
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString()
  },
  {
    id: "a1c4e7b8-1234-4f89-9e01-234567890def",
    age: 32,
    gender: 0,
    blood_pressure: 110,
    cholesterol: 175,
    heart_rate: 68,
    ml_risk_percentage: 18.2,
    ml_risk_category: "Low Risk",
    quantum_score: 22.4,
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString()
  },
  {
    id: "e5f6a7b8-5678-4a12-8b34-345678901abc",
    age: 72,
    gender: 1,
    blood_pressure: 160,
    cholesterol: 265,
    heart_rate: 102,
    ml_risk_percentage: 90.7,
    ml_risk_category: "High Risk",
    quantum_score: 88.3,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  }
];
