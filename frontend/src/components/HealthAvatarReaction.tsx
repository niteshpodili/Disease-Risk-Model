import React from 'react';
import { ShieldCheck, AlertCircle, ShieldAlert, Heart } from 'lucide-react';

interface HealthAvatarReactionProps {
  riskPercentage: number;
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | string;
  gender?: number; // 0 for Female, 1 for Male
}

export const HealthAvatarReaction: React.FC<HealthAvatarReactionProps> = ({
  riskPercentage,
  riskCategory,
  gender = 1
}) => {
  const isHigh = riskCategory === 'High Risk' || riskPercentage >= 67;
  const isModerate = !isHigh && (riskCategory === 'Moderate Risk' || riskPercentage >= 34);
  const isFemale = gender === 0;

  const stateConfig = isHigh
    ? {
        image: isFemale
          ? '/avatars/avatar_female_high_risk.jpg'
          : '/avatars/avatar_high_risk.jpg',
        title: 'Elevated Risk Level',
        subtitle: `${isFemale ? 'Female' : 'Male'} Low Health Score Simulation`,
        expression: 'Fatigued & Concerned',
        quote: 'Multiple biometric risk markers elevated. Clinical consultation and formal diagnostic checkup strongly advised.',
        badgeColor: 'bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white',
        ringColor: 'border-[#FCA5A5] shadow-[0_0_25px_rgba(239,68,68,0.25)]',
        accentText: 'text-[#DC2626]',
        icon: <ShieldAlert className="w-4 h-4 text-white" />
      }
    : isModerate
    ? {
        image: isFemale
          ? '/avatars/avatar_female_moderate.jpg'
          : '/avatars/avatar_moderate.jpg',
        title: 'Moderate Attention Advised',
        subtitle: `${isFemale ? 'Female' : 'Male'} Medium Health Score Simulation`,
        expression: 'Slightly Concerned',
        quote: 'Borderline biometric indicators detected. Routine monitoring and healthy lifestyle adjustments suggested.',
        badgeColor: 'bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white',
        ringColor: 'border-[#FDE68A] shadow-[0_0_25px_rgba(245,158,11,0.25)]',
        accentText: 'text-[#D97706]',
        icon: <AlertCircle className="w-4 h-4 text-white" />
      }
    : {
        image: isFemale
          ? '/avatars/avatar_female_healthy.jpg'
          : '/avatars/avatar_healthy.jpg',
        title: 'Optimal Health Profile',
        subtitle: `${isFemale ? 'Female' : 'Male'} High Health Score Simulation`,
        expression: 'Radiant & Confident',
        quote: 'Evaluated biometric parameters align well within healthy low-probability baseline distributions.',
        badgeColor: 'bg-gradient-to-br from-[#34D399] to-[#059669] text-white',
        ringColor: 'border-[#A7F3D0] shadow-[0_0_25px_rgba(16,185,129,0.25)]',
        accentText: 'text-[#059669]',
        icon: <ShieldCheck className="w-4 h-4 text-white" />
      };

  return (
    <div className="bg-white/90 border border-white rounded-[32px] p-6 shadow-clay-card flex flex-col sm:flex-row items-center gap-6 transition-all duration-300">
      {/* Character Avatar Container with 3D Aura & Clay Ring */}
      <div className="relative shrink-0 select-none">
        <div
          className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 border-4 ${stateConfig.ringColor} bg-white shadow-clay-orb overflow-hidden transition-all duration-500 transform hover:scale-105`}
        >
          <img
            src={stateConfig.image}
            alt={`${isFemale ? 'Female' : 'Male'} character state: ${stateConfig.expression}`}
            className="w-full h-full object-cover rounded-full transition-opacity duration-500 ease-in-out"
          />
        </div>

        {/* Reaction Pill Badge */}
        <div
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-clay-orb whitespace-nowrap ${stateConfig.badgeColor}`}
        >
          {stateConfig.icon}
          <span>{stateConfig.expression}</span>
        </div>
      </div>

      {/* Description & Reactive Dialogue */}
      <div className="flex-1 space-y-2.5 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className={`text-lg font-black tracking-tight ${stateConfig.accentText}`}
              >
                {stateConfig.title}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE]">
                {isFemale ? 'Female Avatar' : 'Male Avatar'}
              </span>
            </div>
            <p className="text-[11px] text-[#635F69] font-medium">
              {stateConfig.subtitle} (App Score: {riskPercentage.toFixed(1)}%)
            </p>
          </div>
        </div>

        {/* Dialogue Balloon */}
        <div className="p-3.5 rounded-[20px] bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed text-xs text-[#332F3A] font-medium leading-relaxed relative">
          <p>"{stateConfig.quote}"</p>
        </div>

        {/* Non-clinical disclaimer tag */}
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] text-[#635F69]">
          <Heart className="w-3 h-3 text-[#DB2777]" />
          <span>Expression reflects algorithmic model score only — not a clinical diagnosis.</span>
        </div>
      </div>
    </div>
  );
};
