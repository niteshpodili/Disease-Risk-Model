"""
ML Training Pipeline for Quantum-Inspired Disease Risk Analysis Platform (Heart Disease MVP)
SIH Reference: SIH26139
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from datetime import datetime

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report
)

def train_and_evaluate():
    # 1. Load Dataset
    data_path = os.path.join(os.path.dirname(__file__), "..", "Data", "Heart Prediction Quantum Dataset.csv")
    if not os.path.exists(data_path):
        data_path = os.path.join("Data", "Heart Prediction Quantum Dataset.csv")
    
    print(f"Loading dataset from: {data_path}")
    df = pd.read_csv(data_path)
    print(f"Dataset shape: {df.shape}")

    # Clinical feature set
    feature_cols = ['Age', 'Gender', 'BloodPressure', 'Cholesterol', 'HeartRate']
    target_col = 'HeartDisease'

    X = df[feature_cols]
    y = df[target_col]

    print(f"Features: {feature_cols}")
    print(f"Target distribution:\n{y.value_counts(normalize=True).round(4)}")

    # 2. Stratified Train/Test Split (80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # 3. Model Candidates
    candidates = {
        "Random Forest": Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler()),
            ('classifier', RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42))
        ]),
        "Gradient Boosting": Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler()),
            ('classifier', GradientBoostingClassifier(n_estimators=100, max_depth=3, learning_rate=0.1, random_state=42))
        ]),
        "Logistic Regression": Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler()),
            ('classifier', LogisticRegression(random_state=42))
        ]),
        "Decision Tree": Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler()),
            ('classifier', DecisionTreeClassifier(max_depth=4, random_state=42))
        ])
    }

    scoring = ['accuracy', 'precision', 'recall', 'f1', 'roc_auc']
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    results = {}
    print("\n" + "="*70)
    print("5-FOLD STRATIFIED CROSS-VALIDATION BENCHMARK")
    print("="*70)

    for name, pipeline in candidates.items():
        cv_res = cross_validate(pipeline, X_train, y_train, cv=cv, scoring=scoring)
        results[name] = {
            "cv_accuracy_mean": float(np.mean(cv_res['test_accuracy'])),
            "cv_accuracy_std": float(np.std(cv_res['test_accuracy'])),
            "cv_precision_mean": float(np.mean(cv_res['test_precision'])),
            "cv_recall_mean": float(np.mean(cv_res['test_recall'])),
            "cv_f1_mean": float(np.mean(cv_res['test_f1'])),
            "cv_f1_std": float(np.std(cv_res['test_f1'])),
            "cv_roc_auc_mean": float(np.mean(cv_res['test_roc_auc'])),
        }
        print(f"{name:<20} | Acc: {results[name]['cv_accuracy_mean']:.4f} (±{results[name]['cv_accuracy_std']:.4f}) | F1: {results[name]['cv_f1_mean']:.4f} | ROC-AUC: {results[name]['cv_roc_auc_mean']:.4f}")

    # 4. Select Best Model based on composite score (F1 + ROC-AUC)
    best_model_name = max(results, key=lambda k: results[k]['cv_f1_mean'] + results[k]['cv_roc_auc_mean'])
    print("\n" + "="*70)
    print(f"SELECTED PRIMARY MODEL: {best_model_name}")
    print("="*70)

    best_pipeline = candidates[best_model_name]
    best_pipeline.fit(X_train, y_train)

    # 5. Evaluate on Held-Out Test Set
    y_pred = best_pipeline.predict(X_test)
    y_prob = best_pipeline.predict_proba(X_test)[:, 1]

    test_metrics = {
        "test_accuracy": float(accuracy_score(y_test, y_pred)),
        "test_precision": float(precision_score(y_test, y_pred)),
        "test_recall": float(recall_score(y_test, y_pred)),
        "test_f1": float(f1_score(y_test, y_pred)),
        "test_roc_auc": float(roc_auc_score(y_test, y_prob))
    }

    print("\nHeld-Out Test Evaluation:")
    for k, v in test_metrics.items():
        print(f"  {k}: {v:.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    # 6. Extract Global Feature Importances
    classifier_step = best_pipeline.named_steps['classifier']
    global_importances = {}

    if hasattr(classifier_step, 'feature_importances_'):
        raw_importances = classifier_step.feature_importances_
        for col, val in zip(feature_cols, raw_importances):
            global_importances[col] = round(float(val), 4)
    elif hasattr(classifier_step, 'coef_'):
        raw_coefs = np.abs(classifier_step.coef_[0])
        norm_coefs = raw_coefs / np.sum(raw_coefs)
        for col, val in zip(feature_cols, norm_coefs):
            global_importances[col] = round(float(val), 4)

    print("\nGlobal Feature Importances (Dataset Level):")
    for col, val in global_importances.items():
        print(f"  {col:<15}: {val:.4f}")

    # 7. Fit on all data for final artifact or keep train fit
    # We train on full dataset for maximum generalization in demo, while preserving validation metrics
    final_pipeline = candidates[best_model_name]
    final_pipeline.fit(X, y)

    # 8. Save Artifacts
    artifacts_dir = os.path.join(os.path.dirname(__file__), "..", "backend", "artifacts")
    os.makedirs(artifacts_dir, exist_ok=True)

    model_path = os.path.join(artifacts_dir, "heart_risk_model.joblib")
    meta_path = os.path.join(artifacts_dir, "model_meta.json")

    joblib.dump(final_pipeline, model_path)
    print(f"\nModel artifact saved to: {model_path}")

    metadata = {
        "model_name": best_model_name,
        "feature_names": feature_cols,
        "target_name": target_col,
        "trained_at": datetime.utcnow().isoformat() + "Z",
        "dataset_samples": len(df),
        "cv_metrics": results[best_model_name],
        "test_metrics": test_metrics,
        "all_model_benchmarks": results,
        "global_feature_importances": global_importances,
        "risk_thresholds": {
            "low": [0.0, 0.33],
            "moderate": [0.34, 0.66],
            "high": [0.67, 1.0]
        },
        "disclaimer": "Global Model Feature Importance — Dataset-level predictive weights, not individual patient diagnostic causation."
    }

    with open(meta_path, "w") as f:
        json.dump(metadata, f, indent=2)
    print(f"Metadata saved to: {meta_path}")

if __name__ == "__main__":
    train_and_evaluate()
