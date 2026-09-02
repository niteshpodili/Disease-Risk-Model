import React from 'react';
import { Activity, Cpu, Sparkles, BookOpen } from 'lucide-react';
import type { DocTab } from './DocsModal';

interface NavbarProps {
  isHealthy: boolean;
  modelName: string;
  onOpenDocs: (tab?: DocTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isHealthy, modelName, onOpenDocs }) => {
  return (
    <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-card rounded-[32px] px-6 py-3 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-[20px] bg-gradient-to-br from-[#C4B5FD] to-[#7C3AED] text-white shadow-clay-button animate-clay-breathe">
            <Activity className="w-6 h-6 text-white" />
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047] absolute -top-1 -right-1" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className="font-black text-xl tracking-tight bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#DB2777] bg-clip-text text-transparent"
              >
                CardioQuantum
              </span>
              <span
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE] shadow-sm"
              >
                SIH26139
              </span>
            </div>
            <p className="text-xs text-[#635F69] font-medium hidden sm:block">
              High-Fidelity Quantum-Inspired Disease Risk Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Docs & Guide Button */}
          <button
            type="button"
            onClick={() => onOpenDocs('guide')}
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#E9E4F2] shadow-clay-button-secondary text-xs font-black text-[#7C3AED] hover:-translate-y-0.5 active:scale-95 active:shadow-clay-pressed transition-all duration-200 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="hidden xs:inline">User Guide & Docs</span>
            <span className="xs:hidden">Docs</span>
          </button>

          {/* Active Model Pill */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed text-xs font-semibold text-[#332F3A]">
            <Cpu className="w-4 h-4 text-[#7C3AED]" />
            <span style={{ fontFamily: 'Nunito, sans-serif' }}>{modelName || 'Gradient Boosting'}</span>
          </div>

          {/* Health Status Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E9E4F2] shadow-clay-orb text-xs font-bold text-[#332F3A]">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isHealthy ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-[#EF4444] shadow-[0_0_8px_#EF4444]'
              }`}
            />
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="hidden sm:inline">
              {isHealthy ? 'System Active' : 'Connecting...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
