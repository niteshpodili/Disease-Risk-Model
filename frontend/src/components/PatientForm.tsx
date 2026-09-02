import React, { useState } from 'react';
import type { HeartPredictionInput } from '../types';
import { CircularSelector } from './CircularSelector';
import {
  Sparkles,
  User,
  Heart,
  Gauge,
  Droplet,
  RefreshCw,
  Sliders,
  Calendar
} from 'lucide-react';

interface PatientFormProps {
  onSubmit: (input: HeartPredictionInput) => void;
  isLoading: boolean;
}

const PRESETS: { name: string; desc: string; values: HeartPredictionInput }[] = [
  {
    name: 'Healthy Adult',
    desc: '32y Female, Normal BP & Chol',
    values: { age: 32, gender: 0, blood_pressure: 110, cholesterol: 175, heart_rate: 68, shots: 1024 }
  },
  {
    name: 'Moderate Risk',
    desc: '55y Male, Borderline BP',
    values: { age: 55, gender: 1, blood_pressure: 135, cholesterol: 215, heart_rate: 82, shots: 1024 }
  },
  {
    name: 'High Risk Senior',
    desc: '72y Male, Elevated Biometrics',
    values: { age: 72, gender: 1, blood_pressure: 160, cholesterol: 265, heart_rate: 102, shots: 1024 }
  }
];

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
    heart_rate: 88
  });

  const handleChange = (field: keyof FormState, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (preset: HeartPredictionInput) => {
    setFormData({
      age: preset.age,
      gender: preset.gender,
      blood_pressure: preset.blood_pressure,
      cholesterol: preset.cholesterol,
      heart_rate: preset.heart_rate
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      shots: 1024
    });
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
            <h2
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className="text-2xl font-black text-[#332F3A] tracking-tight"
            >
              Patient Biometric Parameters
            </h2>
            <p className="text-xs text-[#635F69] font-medium mt-0.5">
              Adjust parameters using the circular dials or typing below each selector.
            </p>
          </div>
        </div>

        {/* Tactile Preset Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="text-xs font-bold text-[#635F69] uppercase tracking-wider"
          >
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
        {/* Responsive Grid of Circular Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {/* 1. Age Circular Selector */}
          <CircularSelector
            label="Age"
            unit="yrs"
            value={formData.age}
            min={30}
            max={100}
            icon={<Calendar className="w-4 h-4" />}
            colorScheme={{
              stroke: '#0EA5E9',
              text: 'text-[#0284C7]',
              badgeBg: 'bg-[#E0F2FE]',
              iconBg: 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7]',
              glow: 'rgba(14, 165, 233, 0.2)'
            }}
            onChange={(val) => handleChange('age', val)}
            helperText="30–100 yrs range"
          />

          {/* 2. Biological Gender Card */}
          <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center">
            <div className="w-full flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white flex items-center justify-center shadow-clay-orb shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <span
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className="text-sm font-extrabold text-[#332F3A] text-left"
                >
                  Gender
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#635F69] bg-[#EFEBF5] px-2 py-0.5 rounded-full">
                Binary
              </span>
            </div>

            {/* Visual Icon / Illustration Container */}
            <div className="my-3 flex flex-col items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  formData.gender === 1
                    ? 'bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] text-[#0284C7] shadow-clay-orb'
                    : 'bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8] text-[#DB2777] shadow-clay-orb'
                }`}
              >
                <User className="w-10 h-10" />
              </div>
              <span
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className="text-xs font-black text-[#332F3A] mt-2"
              >
                {formData.gender === 1 ? 'Male (1)' : 'Female (0)'}
              </span>
            </div>

            {/* Squishy Toggle Buttons */}
            <div className="w-full grid grid-cols-2 gap-2 mt-auto pt-2">
              <button
                type="button"
                onClick={() => handleChange('gender', 0)}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className={`py-2 px-2 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  formData.gender === 0
                    ? 'bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white shadow-clay-button'
                    : 'bg-[#EFEBF5] text-[#635F69] shadow-clay-pressed hover:bg-white'
                }`}
              >
                Female
              </button>
              <button
                type="button"
                onClick={() => handleChange('gender', 1)}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className={`py-2 px-2 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  formData.gender === 1
                    ? 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white shadow-clay-button'
                    : 'bg-[#EFEBF5] text-[#635F69] shadow-clay-pressed hover:bg-white'
                }`}
              >
                Male
              </button>
            </div>
          </div>

          {/* 3. Blood Pressure Circular Selector */}
          <CircularSelector
            label="Systolic BP"
            unit="mmHg"
            value={formData.blood_pressure}
            min={80}
            max={220}
            icon={<Gauge className="w-4 h-4" />}
            colorScheme={{
              stroke: '#EA580C',
              text: 'text-[#EA580C]',
              badgeBg: 'bg-[#FFEDD5]',
              iconBg: 'bg-gradient-to-br from-[#FB923C] to-[#EA580C]',
              glow: 'rgba(234, 88, 12, 0.2)'
            }}
            onChange={(val) => handleChange('blood_pressure', val)}
            helperText="80–220 mmHg"
          />

          {/* 4. Cholesterol Circular Selector */}
          <CircularSelector
            label="Cholesterol"
            unit="mg/dL"
            value={formData.cholesterol}
            min={100}
            max={400}
            icon={<Droplet className="w-4 h-4" />}
            colorScheme={{
              stroke: '#7C3AED',
              text: 'text-[#7C3AED]',
              badgeBg: 'bg-[#EDE9FE]',
              iconBg: 'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]',
              glow: 'rgba(124, 58, 237, 0.2)'
            }}
            onChange={(val) => handleChange('cholesterol', val)}
            helperText="100–400 mg/dL"
          />

          {/* 5. Heart Rate Circular Selector */}
          <CircularSelector
            label="Heart Rate"
            unit="bpm"
            value={formData.heart_rate}
            min={40}
            max={180}
            icon={<Heart className="w-4 h-4" />}
            colorScheme={{
              stroke: '#DC2626',
              text: 'text-[#DC2626]',
              badgeBg: 'bg-[#FEE2E2]',
              iconBg: 'bg-gradient-to-br from-[#F87171] to-[#DC2626]',
              glow: 'rgba(220, 38, 38, 0.2)'
            }}
            onChange={(val) => handleChange('heart_rate', val)}
            helperText="40–180 bpm"
          />
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
