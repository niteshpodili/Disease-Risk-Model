import React, { useState } from 'react';
import type { HeartPredictionInput } from '../types';
import { Sparkles, User, Heart, Gauge, Droplet, RefreshCw, Sliders } from 'lucide-react';

interface PatientFormProps {
  onSubmit: (input: HeartPredictionInput) => void;
  isLoading: boolean;
}

const PRESETS: { name: string; desc: string; values: HeartPredictionInput; color: string }[] = [
  {
    name: "Healthy Adult",
    desc: "32y Female, Normal BP & Chol",
    values: { age: 32, gender: 0, blood_pressure: 110, cholesterol: 175, heart_rate: 68, shots: 1024 },
    color: "from-[#34D399] to-[#059669]"
  },
  {
    name: "Moderate Risk",
    desc: "55y Male, Borderline BP",
    values: { age: 55, gender: 1, blood_pressure: 135, cholesterol: 215, heart_rate: 82, shots: 1024 },
    color: "from-[#FBBF24] to-[#D97706]"
  },
  {
    name: "High Risk Senior",
    desc: "72y Male, Elevated Biometrics",
    values: { age: 72, gender: 1, blood_pressure: 160, cholesterol: 265, heart_rate: 102, shots: 1024 },
    color: "from-[#F87171] to-[#DC2626]"
  }
];

// Internal form state — shots is always 1024, never exposed to the user
interface FormState {
  age: number;
  gender: number;
  blood_pressure: number;
  cholesterol: number;
  heart_rate: number;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormState>({
    age: 55,
    gender: 1,
    blood_pressure: 130,
    cholesterol: 215,
    heart_rate: 88,
  });

  // Safely parse numeric input — clamp to [min, max], never corrupt state with NaN
  const clampedInt = (raw: string, min: number, max: number): number => {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return min;
    return Math.max(min, Math.min(max, n));
  };

  const handleChange = (field: keyof FormState, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (preset: HeartPredictionInput) => {
    setFormData({
      age: preset.age,
      gender: preset.gender,
      blood_pressure: preset.blood_pressure,
      cholesterol: preset.cholesterol,
      heart_rate: preset.heart_rate,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Always send shots=1024 — not user-configurable in MVP
    onSubmit({ ...formData, shots: 1024 });
  };

  return (
    <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-surface rounded-[36px] p-6 sm:p-10 transition-all duration-300">
      {/* Header & Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E9E4F2]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white flex items-center justify-center shadow-clay-button shrink-0">
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-2xl font-black text-[#332F3A] tracking-tight">
              Patient Biometric Parameters
            </h2>
            <p className="text-xs text-[#635F69] font-medium mt-0.5">
              Adjust clinical inputs to simulate with the Classical ML pipeline and Qiskit 4-qubit toy circuit.
            </p>
          </div>
        </div>

        {/* Tactile Preset Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-bold text-[#635F69] uppercase tracking-wider">
            Quick Presets:
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p.values)}
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className="text-xs font-extrabold px-3.5 py-2 rounded-[18px] bg-white border border-[#E9E4F2] shadow-clay-button-secondary text-[#332F3A] hover:-translate-y-1 active:scale-[0.92] active:shadow-clay-pressed transition-all duration-200 cursor-pointer"
              title={p.desc}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Age Card */}
          <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white flex items-center justify-center shadow-clay-orb">
                    <User className="w-4 h-4" />
                  </div>
                  <label style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-extrabold text-[#332F3A]">
                    Age (Years)
                  </label>
                </div>
                <input
                  type="number"
                  min={30}
                  max={100}
                  value={formData.age}
                  onChange={(e) => handleChange('age', clampedInt(e.target.value, 30, 100))}
                  className="w-16 px-2.5 py-1.5 bg-[#EFEBF5] rounded-2xl shadow-clay-pressed text-right text-xs font-mono font-bold text-[#7C3AED] focus:bg-white focus:ring-4 focus:ring-[#7C3AED]/20 outline-none"
                />
              </div>
              <input
                type="range"
                min={30}
                max={100}
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className="w-full h-2 bg-[#E9E4F2] rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#635F69] mt-2">
              <span>30 yrs</span>
              <span className="font-bold text-[#7C3AED]">{formData.age} yrs</span>
              <span>100 yrs</span>
            </div>
          </div>

          {/* Gender Card */}
          <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white flex items-center justify-center shadow-clay-orb">
                  <User className="w-4 h-4" />
                </div>
                <label style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-extrabold text-[#332F3A]">
                  Biological Gender
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => handleChange('gender', 0)}
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                    formData.gender === 0
                      ? 'bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white shadow-clay-button'
                      : 'bg-[#EFEBF5] text-[#635F69] shadow-clay-pressed hover:bg-white'
                  }`}
                >
                  Female (0)
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('gender', 1)}
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                    formData.gender === 1
                      ? 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white shadow-clay-button'
                      : 'bg-[#EFEBF5] text-[#635F69] shadow-clay-pressed hover:bg-white'
                  }`}
                >
                  Male (1)
                </button>
              </div>
            </div>
            <p className="text-[10px] text-[#635F69] font-medium mt-2">
              Encoded binary indicator for classical model input.
            </p>
          </div>

          {/* Blood Pressure Card */}
          <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white flex items-center justify-center shadow-clay-orb">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <label style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-extrabold text-[#332F3A]">
                    Systolic BP (mmHg)
                  </label>
                </div>
                <input
                  type="number"
                  min={80}
                  max={220}
                  value={formData.blood_pressure}
                  onChange={(e) => handleChange('blood_pressure', clampedInt(e.target.value, 80, 220))}
                  className="w-16 px-2.5 py-1.5 bg-[#EFEBF5] rounded-2xl shadow-clay-pressed text-right text-xs font-mono font-bold text-[#EA580C] focus:bg-white focus:ring-4 focus:ring-[#FB923C]/20 outline-none"
                />
              </div>
              <input
                type="range"
                min={80}
                max={220}
                value={formData.blood_pressure}
                onChange={(e) => handleChange('blood_pressure', parseInt(e.target.value))}
                className="w-full h-2 bg-[#E9E4F2] rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#635F69] mt-2">
              <span>80 mmHg</span>
              <span className="font-bold text-[#EA580C]">{formData.blood_pressure} mmHg</span>
              <span>220 mmHg</span>
            </div>
          </div>

          {/* Cholesterol Card */}
          <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white flex items-center justify-center shadow-clay-orb">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <label style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-extrabold text-[#332F3A]">
                    Cholesterol (mg/dL)
                  </label>
                </div>
                <input
                  type="number"
                  min={100}
                  max={400}
                  value={formData.cholesterol}
                  onChange={(e) => handleChange('cholesterol', clampedInt(e.target.value, 100, 400))}
                  className="w-16 px-2.5 py-1.5 bg-[#EFEBF5] rounded-2xl shadow-clay-pressed text-right text-xs font-mono font-bold text-[#7C3AED] focus:bg-white focus:ring-4 focus:ring-[#7C3AED]/20 outline-none"
                />
              </div>
              <input
                type="range"
                min={100}
                max={400}
                value={formData.cholesterol}
                onChange={(e) => handleChange('cholesterol', parseInt(e.target.value))}
                className="w-full h-2 bg-[#E9E4F2] rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#635F69] mt-2">
              <span>100 mg/dL</span>
              <span className="font-bold text-[#7C3AED]">{formData.cholesterol} mg/dL</span>
              <span>400 mg/dL</span>
            </div>
          </div>

          {/* Heart Rate Card */}
          <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white flex items-center justify-center shadow-clay-orb">
                    <Heart className="w-4 h-4" />
                  </div>
                  <label style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-extrabold text-[#332F3A]">
                    Heart Rate (bpm)
                  </label>
                </div>
                <input
                  type="number"
                  min={40}
                  max={180}
                  value={formData.heart_rate}
                  onChange={(e) => handleChange('heart_rate', clampedInt(e.target.value, 40, 180))}
                  className="w-16 px-2.5 py-1.5 bg-[#EFEBF5] rounded-2xl shadow-clay-pressed text-right text-xs font-mono font-bold text-[#DC2626] focus:bg-white focus:ring-4 focus:ring-[#F87171]/20 outline-none"
                />
              </div>
              <input
                type="range"
                min={40}
                max={180}
                value={formData.heart_rate}
                onChange={(e) => handleChange('heart_rate', parseInt(e.target.value))}
                className="w-full h-2 bg-[#E9E4F2] rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#635F69] mt-2">
              <span>40 bpm</span>
              <span className="font-bold text-[#DC2626]">{formData.heart_rate} bpm</span>
              <span>180 bpm</span>
            </div>
          </div>

        </div>

        {/* Submit CTA Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="w-full sm:w-auto min-w-[280px] h-16 px-10 rounded-[24px] bg-gradient-to-br from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED] text-white font-black text-lg tracking-wide shadow-clay-button hover:shadow-clay-button-hover hover:-translate-y-1 active:scale-[0.92] active:shadow-clay-pressed transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Simulating Quantum & ML Engine...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#FDE047]" />
                <span>Run Hybrid Risk Analysis</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
