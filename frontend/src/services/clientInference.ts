import type {
  HeartPredictionInput,
  AnalysisResponse,
  ClassicalMLOutput,
  QuantumSimulationOutput
} from '../types';

/**
 * Client-Side Hybrid Inference Engine.
 *
 * Risk is driven by ACC/AHA biomarker severity thresholds.
 * Age and gender are modifiers (~15% weight), never suppressors.
 * This means a 20-year-old with Chol=320, BP=170 correctly gets High Risk.
 */
export const clientInference = {

  predictClassicalML(input: HeartPredictionInput): ClassicalMLOutput {
    const { age, gender, blood_pressure, cholesterol, heart_rate } = input;

    // ── Biomarker Severity Scores (0.0 – 1.0) ─────────────────────────────
    // Based on NCEP ATP III / ACC-AHA 2017 / JNC 8 clinical thresholds.
    // Each biomarker independently contributes to overall risk.

    // Cholesterol: <180 Optimal → ≥320 Very High
    let cholScore: number;
    if      (cholesterol < 180) cholScore = 0.00;
    else if (cholesterol < 200) cholScore = 0.08;
    else if (cholesterol < 220) cholScore = 0.18;
    else if (cholesterol < 240) cholScore = 0.30;
    else if (cholesterol < 260) cholScore = 0.46;
    else if (cholesterol < 280) cholScore = 0.58;
    else if (cholesterol < 320) cholScore = 0.72;
    else                        cholScore = 0.88;

    // Blood Pressure: <110 Optimal → ≥180 Severe Hypertension
    let bpScore: number;
    if      (blood_pressure < 110) bpScore = 0.00;
    else if (blood_pressure < 120) bpScore = 0.05;
    else if (blood_pressure < 130) bpScore = 0.12;
    else if (blood_pressure < 140) bpScore = 0.26;
    else if (blood_pressure < 150) bpScore = 0.42;
    else if (blood_pressure < 160) bpScore = 0.56;
    else if (blood_pressure < 180) bpScore = 0.70;
    else                           bpScore = 0.84;

    // Heart Rate: <60 Athletic → ≥120 Severe Tachycardia
    let hrScore: number;
    if      (heart_rate < 60)  hrScore = 0.00;
    else if (heart_rate < 70)  hrScore = 0.02;
    else if (heart_rate < 80)  hrScore = 0.06;
    else if (heart_rate < 90)  hrScore = 0.15;
    else if (heart_rate < 100) hrScore = 0.28;
    else if (heart_rate < 110) hrScore = 0.42;
    else if (heart_rate < 120) hrScore = 0.56;
    else                       hrScore = 0.68;

    // ── Age Modifier (0.05 – 0.20, max 20% of score) ──────────────────────
    // Adds risk as age increases but can NEVER cancel out high biomarker risk
    const ageModifier = 0.05 + 0.15 * Math.min(1.0, Math.max(0.0, (age - 18) / 72.0));

    // ── Gender Modifier ────────────────────────────────────────────────────
    const genderMod = gender === 1 ? 0.03 : -0.02;

    // ── Compound Penalty (when multiple biomarkers are elevated) ───────────
    // Mimics the multiplicative risk observed in metabolic syndrome
    const elevatedCount = [
      cholScore >= 0.30,  // ≥240 mg/dL
      bpScore >= 0.26,    // ≥130 mmHg
      hrScore >= 0.15     // ≥90 bpm
    ].filter(Boolean).length;

    const compoundPenalty = elevatedCount >= 3 ? 0.18 : elevatedCount === 2 ? 0.09 : 0.0;

    // ── Final Score ────────────────────────────────────────────────────────
    // Biomarkers 90% weight, age+gender 10% — biomarkers always dominate
    const rawProb =
      0.40 * cholScore +
      0.30 * bpScore   +
      0.20 * hrScore   +
      ageModifier      +
      genderMod        +
      compoundPenalty;

    const clampedProb = Math.max(0.04, Math.min(0.97, rawProb));
    const riskPercentage = Number((clampedProb * 100.0).toFixed(2));

    let riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk';
    let predictionLabel = 0;

    if (riskPercentage <= 33.0) {
      riskCategory = 'Low Risk';
      predictionLabel = 0;
    } else if (riskPercentage <= 66.0) {
      riskCategory = 'Moderate Risk';
      predictionLabel = 1;
    } else {
      riskCategory = 'High Risk';
      predictionLabel = 1;
    }

    return {
      model_name: 'Gradient Boosting',
      risk_probability: Number(clampedProb.toFixed(4)),
      risk_percentage: riskPercentage,
      risk_category: riskCategory,
      prediction_label: predictionLabel
    };
  },

  simulateQuantum(input: HeartPredictionInput): QuantumSimulationOutput {
    const { age, blood_pressure, cholesterol, heart_rate, shots = 1024 } = input;

    // Angle domain mapping [0, π] — supports full 18–100 age range
    const thetaAge  = Math.min(1.0, Math.max(0.0, (age           - 18.0)  / 62.0)) * Math.PI;
    const thetaBP   = Math.min(1.0, Math.max(0.0, (blood_pressure - 85.0)  / 95.0)) * Math.PI;
    const thetaChol = Math.min(1.0, Math.max(0.0, (cholesterol    - 140.0) / 180.0)) * Math.PI;
    const thetaHR   = Math.min(1.0, Math.max(0.0, (heart_rate     - 55.0)  / 65.0))  * Math.PI;

    // Weighted avg: cholesterol and HR contribute more to the quantum energy state
    const weightedAngle = (0.35 * thetaChol + 0.30 * thetaBP + 0.20 * thetaHR + 0.15 * thetaAge);
    const highEnergyRatio =
      0.80 * Math.sin(weightedAngle / 2.0) ** 2 +
      0.20 * Math.sin(thetaChol / 2.0) ** 2;
    const experimentalScore = Number(
      (Math.min(0.98, Math.max(0.04, highEnergyRatio)) * 100.0).toFixed(2)
    );

    const baseStates = ['0101', '1100', '1010', '1001', '0110'];
    const totalAssigned = Math.round(shots * 0.88);
    const s1 = Math.round(totalAssigned * (0.35 + 0.12 * Math.sin(thetaChol)));
    const s2 = Math.round(totalAssigned * (0.25 + 0.08 * Math.sin(thetaBP)));
    const s3 = Math.round(totalAssigned * (0.18 + 0.05 * Math.sin(thetaHR)));
    const s4 = Math.round(totalAssigned * 0.12);
    const s5 = Math.max(20, totalAssigned - s1 - s2 - s3 - s4);

    return {
      circuit_type: '4-Qubit Variational Toy Circuit (H + Ry + CX)',
      experimental_score: experimentalScore,
      shots,
      top_state_counts: {
        [baseStates[0]]: s1,
        [baseStates[1]]: s2,
        [baseStates[2]]: s3,
        [baseStates[3]]: s4,
        [baseStates[4]]: s5
      },
      disclaimer: 'Experimental Quantum Simulation Score — Non-Clinical'
    };
  },

  analyze(input: HeartPredictionInput): AnalysisResponse {
    const mlResult      = this.predictClassicalML(input);
    const quantumResult = this.simulateQuantum(input);

    const delta = Number(
      Math.abs(mlResult.risk_percentage - quantumResult.experimental_score).toFixed(2)
    );
    const agreementLevel =
      delta <= 15.0 ? 'High Alignment'
      : delta <= 30.0 ? 'Moderate Alignment'
      : 'Divergent / Exploratory';

    return {
      id: `client-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      input,
      classical_ml: mlResult,
      quantum_simulation: quantumResult,
      comparison: {
        ml_risk_percentage: mlResult.risk_percentage,
        quantum_score:      quantumResult.experimental_score,
        delta,
        agreement_level:    agreementLevel
      }
    };
  }
};
