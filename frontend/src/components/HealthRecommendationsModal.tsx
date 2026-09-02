import React from 'react';
import type { AnalysisResponse } from '../types';
import {
  X,
  Salad,
  Dumbbell,
  Moon,
  Stethoscope,
  HeartPulse,
  Sparkles,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface HealthRecommendationsModalProps {
  isOpen: boolean;
  result: AnalysisResponse | null;
  onClose: () => void;
}

export const HealthRecommendationsModal: React.FC<HealthRecommendationsModalProps> = ({
  isOpen,
  result,
  onClose
}) => {
  if (!isOpen || !result) return null;

  const { classical_ml, input } = result;
  const { risk_percentage, risk_category } = classical_ml;
  const isHigh = risk_category === 'High Risk' || risk_percentage >= 67;
  const isFemale = input.gender === 0;

  const avatarSrc = isHigh
    ? isFemale
      ? '/avatars/avatar_female_high_risk.jpg'
      : '/avatars/avatar_high_risk.jpg'
    : isFemale
    ? '/avatars/avatar_female_moderate.jpg'
    : '/avatars/avatar_moderate.jpg';

  // Dynamic recommendations based on user's actual biometric inputs
  const dietAdvice =
    input.cholesterol >= 200
      ? 'Adopt a Mediterranean/DASH diet rich in soluble fiber (oats, legumes) and omega-3 fatty acids. Limit saturated fats to <6% of daily calories to manage serum cholesterol.'
      : 'Prioritize whole grains, leafy greens, and lean proteins. Maintain hydration and minimize ultra-processed foods.';

  const bpAdvice =
    input.blood_pressure >= 130
      ? 'Reduce dietary sodium to under 1,500 mg daily. Increase dietary potassium through bananas, spinach, and avocados to promote vascular elasticity.'
      : 'Maintain healthy sodium-to-potassium balance and keep consistent daily hydration levels.';

  const exerciseAdvice =
    input.heart_rate >= 85
      ? 'Incorporate 150 minutes of moderate-intensity Zone 2 cardio per week (brisk walking, cycling, swimming) to strengthen cardiac stroke volume and lower resting heart rate.'
      : 'Aim for 30 minutes of daily physical activity combined with light resistance training twice a week to boost metabolic rate.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#332F3A]/45 backdrop-blur-md animate-fadeIn">
      {/* Container */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white/95 backdrop-blur-2xl border border-white rounded-[36px] shadow-clay-surface flex flex-col overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-[#E9E4F2] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-[20px] text-white flex items-center justify-center shadow-clay-button shrink-0 ${
                isHigh
                  ? 'bg-gradient-to-br from-[#F87171] to-[#DC2626]'
                  : 'bg-gradient-to-br from-[#FBBF24] to-[#D97706]'
              }`}
            >
              {isHigh ? <ShieldAlert className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className="text-xl font-black text-[#332F3A] tracking-tight"
                >
                  {isHigh ? 'Actionable Health Improvement Plan' : 'Recommended Lifestyle Adjustments'}
                </h3>
                <span
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full text-white ${
                    isHigh ? 'bg-[#DC2626]' : 'bg-[#D97706]'
                  }`}
                >
                  {risk_category} ({risk_percentage.toFixed(1)}%)
                </span>
              </div>
              <p className="text-xs text-[#635F69] font-medium mt-0.5">
                Targeted guidance based on your submitted biometric profile ({input.age}y {isFemale ? 'Female' : 'Male'}, {input.blood_pressure} BP, {input.cholesterol} Chol).
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-button-secondary text-[#635F69] hover:text-[#332F3A] flex items-center justify-center hover:-translate-y-0.5 active:scale-90 active:shadow-clay-pressed transition-all duration-200 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs text-[#332F3A]">
          {/* Avatar reaction mini-card */}
          <div className="p-4 rounded-[26px] bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed flex items-center gap-4">
            <div className="w-16 h-16 rounded-full p-1 border-2 border-white shadow-clay-orb bg-white shrink-0 overflow-hidden">
              <img
                src={avatarSrc}
                alt="Avatar reaction"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="space-y-1">
              <span
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className="text-xs font-black text-[#332F3A]"
              >
                {isHigh ? 'High Risk Indicator Notice' : 'Moderate Attention Suggested'}
              </span>
              <p className="text-[11px] text-[#635F69] leading-relaxed">
                {isHigh
                  ? 'Your current biometric markers show elevated risk levels. Proactive dietary, exercise, and clinical steps can significantly improve your cardiovascular health score.'
                  : 'Your parameters are slightly elevated. Adopting the following evidence-based habits will help bring your scores back into the optimal baseline range.'}
              </p>
            </div>
          </div>

          {/* Actionable Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Diet & Nutrition */}
            <div className="p-5 rounded-[26px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34D399] to-[#059669] text-white flex items-center justify-center shadow-clay-orb shrink-0">
                  <Salad className="w-4 h-4" />
                </div>
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-extrabold text-sm text-[#332F3A]">
                  Diet & Nutrition
                </h4>
              </div>
              <p className="text-[11px] text-[#635F69] leading-relaxed">
                {dietAdvice}
              </p>
              <div className="pt-2 border-t border-[#E9E4F2] text-[10px] font-bold text-[#059669] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Focus on fiber & heart-healthy fats</span>
              </div>
            </div>

            {/* 2. Physical Activity & Cardio */}
            <div className="p-5 rounded-[26px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white flex items-center justify-center shadow-clay-orb shrink-0">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-extrabold text-sm text-[#332F3A]">
                  Exercise & Cardio
                </h4>
              </div>
              <p className="text-[11px] text-[#635F69] leading-relaxed">
                {exerciseAdvice}
              </p>
              <div className="pt-2 border-t border-[#E9E4F2] text-[10px] font-bold text-[#0284C7] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>150 mins/week moderate activity</span>
              </div>
            </div>

            {/* 3. Blood Pressure Management */}
            <div className="p-5 rounded-[26px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white flex items-center justify-center shadow-clay-orb shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-extrabold text-sm text-[#332F3A]">
                  Blood Pressure Care
                </h4>
              </div>
              <p className="text-[11px] text-[#635F69] leading-relaxed">
                {bpAdvice}
              </p>
              <div className="pt-2 border-t border-[#E9E4F2] text-[10px] font-bold text-[#EA580C] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Track BP weekly & limit sodium</span>
              </div>
            </div>

            {/* 4. Sleep & Clinical Checkup */}
            <div className="p-5 rounded-[26px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white flex items-center justify-center shadow-clay-orb shrink-0">
                  {isHigh ? <Stethoscope className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-extrabold text-sm text-[#332F3A]">
                  {isHigh ? 'Clinical Follow-up' : 'Sleep & Recovery'}
                </h4>
              </div>
              <p className="text-[11px] text-[#635F69] leading-relaxed">
                {isHigh
                  ? 'Schedule an appointment with a primary care physician or cardiologist for comprehensive lipid panel and ECG verification.'
                  : 'Maintain 7–8 hours of restorative sleep nightly and practice mindfulness to reduce resting cortisol levels.'}
              </p>
              <div className="pt-2 border-t border-[#E9E4F2] text-[10px] font-bold text-[#7C3AED] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHigh ? 'Physician consultation recommended' : '7–8 hours quality sleep'}</span>
              </div>
            </div>
          </div>

          {/* Educational disclaimer */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#635F69] pt-2">
            <Heart className="w-3.5 h-3.5 text-[#DB2777]" />
            <span>Educational guidance generated from model estimates — always consult a healthcare professional.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#F4F1FA] border-t border-[#E9E4F2] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#7C3AED]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CardioQuantum Wellness Plan</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="px-6 py-2 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white font-extrabold text-xs shadow-clay-button hover:shadow-clay-button-hover active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
