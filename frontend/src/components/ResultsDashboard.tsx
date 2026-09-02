import React, { useState, useEffect, useRef } from 'react';
import type { AnalysisResponse } from '../types';
import { ShieldAlert, ShieldCheck, Activity, Cpu, AlertCircle, HeartPulse } from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResponse;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  // ── Extract every field from the live API response ─────────────────────────
  const { classical_ml, input } = result;
  const {
    risk_percentage,
    risk_category,
    prediction_label,
    model_name,
    risk_probability,
  } = classical_ml;

  // ── Risk category theme ───────────────────────────────────────────────────
  const isHigh     = risk_category === 'High Risk';
  const isModerate = risk_category === 'Moderate Risk';

  const theme = isHigh
    ? { color: 'text-[#DC2626]', badgeBg: 'bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white', stroke: '#DC2626', icon: <ShieldAlert className="w-5 h-5 text-white" /> }
    : isModerate
    ? { color: 'text-[#D97706]', badgeBg: 'bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white', stroke: '#D97706', icon: <AlertCircle className="w-5 h-5 text-white" /> }
    : { color: 'text-[#059669]', badgeBg: 'bg-gradient-to-br from-[#34D399] to-[#059669] text-white', stroke: '#059669', icon: <ShieldCheck className="w-5 h-5 text-white" /> };

  // ── SVG gauge: animate smoothly whenever risk_percentage changes ──────────
  const radius        = 62;
  const circumference = 2 * Math.PI * radius;
  const [animatedOffset, setAnimatedOffset] = useState<number>(circumference); // start empty
  const runId = useRef<string>('');

  useEffect(() => {
    // Reset to empty on each new result, then animate to the real value
    if (result.id !== runId.current) {
      runId.current = result.id;
      setAnimatedOffset(circumference);                                  // reset
      const raf = requestAnimationFrame(() => {
        setAnimatedOffset(circumference - (risk_percentage / 100) * circumference); // animate
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [result.id, risk_percentage, circumference]);

  return (
    <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-surface rounded-[36px] p-6 sm:p-10 space-y-8 transition-all duration-300">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F2]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white flex items-center justify-center shadow-clay-button shrink-0">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-2xl font-black text-[#332F3A] tracking-tight">
                Clinical Risk Assessment
              </h2>
              <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                Primary Engine
              </span>
            </div>
            <p className="text-xs text-[#635F69] font-medium mt-0.5">
              Evaluated by validated Scikit-learn <strong>{model_name}</strong> pipeline.
            </p>
          </div>
        </div>

        {/* Risk Category Badge — live from API */}
        <div
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className={`px-5 py-2 rounded-full font-black text-sm flex items-center gap-2.5 shadow-clay-button ${theme.badgeBg}`}
        >
          {theme.icon}
          <span>{risk_category}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

        {/* ── Radial Gauge — animates on every new result ──────────────────── */}
        <div className="flex flex-col items-center justify-center p-8 bg-white/90 border border-white rounded-[32px] shadow-clay-card relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Track */}
              <circle cx="80" cy="80" r={radius} stroke="#E9E4F2" strokeWidth="14" fill="transparent" />
              {/* Live progress ring */}
              <circle
                cx="80" cy="80" r={radius}
                stroke={theme.stroke}
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={animatedOffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.4s ease' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span style={{ fontFamily: 'Nunito, sans-serif' }} className={`text-4xl font-black ${theme.color} tracking-tight`}>
                {risk_percentage.toFixed(1)}%
              </span>
              <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[11px] font-extrabold uppercase text-[#635F69] tracking-wider mt-0.5">
                Risk Score
              </span>
            </div>
          </div>
          <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-bold text-[#635F69] text-center mt-3">
            Prob: {risk_probability.toFixed(4)} · Calibrated Class Probability
          </span>
        </div>

        {/* ── Detailed Metrics ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Diagnostic Prediction */}
          <div className="bg-white/90 border border-white rounded-[28px] p-6 shadow-clay-card space-y-2">
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-extrabold text-[#635F69] flex items-center gap-2 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#7C3AED]" />
              Diagnostic Prediction
            </span>
            <div style={{ fontFamily: 'Nunito, sans-serif' }} className={`text-xl font-black ${theme.color}`}>
              {prediction_label === 1 ? 'Disease Indicated' : 'No Disease Indicated'}
            </div>
            <p className="text-xs text-[#635F69] font-medium leading-relaxed">
              {prediction_label === 1
                ? 'Clinical biometric patterns suggest elevated cardiovascular risk factor clusters.'
                : 'Biometric values remain within baseline low-probability distributions.'}
            </p>
          </div>

          {/* Model Info */}
          <div className="bg-white/90 border border-white rounded-[28px] p-6 shadow-clay-card space-y-2">
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-extrabold text-[#635F69] flex items-center gap-2 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-[#0EA5E9]" />
              Model Architecture
            </span>
            <div style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xl font-black text-[#332F3A]">
              {model_name}
            </div>
            <p className="text-xs text-[#635F69] font-medium leading-relaxed">
              Trained on stratified clinical parameters with StandardScaler feature normalization.
            </p>
          </div>

          {/* ── Biometrics Summary — sourced from result.input (what was SENT) */}
          <div className="sm:col-span-2 bg-[#F4F1FA] border border-[#E9E4F2] rounded-[28px] p-5 shadow-clay-pressed">
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-extrabold text-[#635F69] uppercase tracking-wider block mb-3">
              Evaluated Patient Biometrics (Submitted):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-orb">
                <span className="text-[#635F69] block text-[11px] font-medium">Age</span>
                <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black text-sm">{input.age} yrs</span>
              </div>
              <div className="p-3 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-orb">
                <span className="text-[#635F69] block text-[11px] font-medium">Gender</span>
                <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black text-sm">{input.gender === 1 ? 'Male' : 'Female'}</span>
              </div>
              <div className="p-3 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-orb">
                <span className="text-[#635F69] block text-[11px] font-medium">BP</span>
                <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black text-sm">{input.blood_pressure} mmHg</span>
              </div>
              <div className="p-3 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-orb">
                <span className="text-[#635F69] block text-[11px] font-medium">Cholesterol</span>
                <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black text-sm">{input.cholesterol} mg/dL</span>
              </div>
              <div className="p-3 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-orb">
                <span className="text-[#635F69] block text-[11px] font-medium">Heart Rate</span>
                <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black text-sm">{input.heart_rate} bpm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
