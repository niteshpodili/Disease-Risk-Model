export interface HeartPredictionInput {
  age: number;
  gender: number;
  blood_pressure: number;
  cholesterol: number;
  heart_rate: number;
  shots?: number;
}

export interface ClassicalMLOutput {
  model_name: string;
  risk_probability: number;
  risk_percentage: number;
  risk_category: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  prediction_label: number;
}

export interface QuantumSimulationOutput {
  circuit_type: string;
  experimental_score: number;
  shots: number;
  top_state_counts?: Record<string, number>;
  disclaimer: string;
}

export interface ComparisonOutput {
  ml_risk_percentage: number;
  quantum_score: number;
  delta: number;
  agreement_level: string;
}

export interface AnalysisResponse {
  id: string;
  timestamp: string;
  input: HeartPredictionInput;
  classical_ml: ClassicalMLOutput;
  quantum_simulation: QuantumSimulationOutput;
  comparison: ComparisonOutput;
}

export interface AnalysisHistoryItem {
  id: string;
  age: number;
  gender: number;
  blood_pressure: number;
  cholesterol: number;
  heart_rate: number;
  ml_risk_percentage: number;
  ml_risk_category: string;
  quantum_score: number;
  created_at: string;
}

export interface ModelMetadataResponse {
  model_name: string;
  feature_names: string[];
  target_name: string;
  trained_at: string;
  dataset_samples: number;
  cv_metrics: {
    cv_accuracy_mean: number;
    cv_accuracy_std: number;
    cv_precision_mean: number;
    cv_recall_mean: number;
    cv_f1_mean: number;
    cv_f1_std: number;
    cv_roc_auc_mean: number;
  };
  test_metrics: {
    test_accuracy: number;
    test_precision: number;
    test_recall: number;
    test_f1: number;
    test_roc_auc: number;
  };
  global_feature_importances: Record<string, number>;
  risk_thresholds: Record<string, [number, number]>;
  disclaimer: string;
}
