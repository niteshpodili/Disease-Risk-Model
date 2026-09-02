import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="bg-gradient-to-r from-[#FEF3C7]/95 via-white/95 to-[#EDE9FE]/95 border border-[#FDE68A] shadow-clay-card rounded-[24px] px-5 py-3 text-xs text-[#332F3A] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F59E0B] text-white shadow-clay-orb shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <strong style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#92400E] font-extrabold text-sm">
              Educational & Research Prototype:
            </strong>{' '}
            <span className="text-[#4B5563] font-medium">
              Classical ML is the primary validated clinical risk predictor. The 4-qubit quantum module is an experimental toy simulation. Not intended for clinical medical diagnosis.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9E4F2] shadow-clay-orb text-[11px] font-bold text-[#7C3AED] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span style={{ fontFamily: 'Nunito, sans-serif' }}>Non-Clinical Use Only</span>
        </div>
      </div>
    </div>
  );
};
