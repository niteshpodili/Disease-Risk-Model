import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Sparkles,
  Activity,
  Lock,
  CheckCircle2
} from 'lucide-react';

export type DocTab = 'guide' | 'privacy' | 'terms';

interface DocsModalProps {
  isOpen: boolean;
  initialTab?: DocTab;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({
  isOpen,
  initialTab = 'guide',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<DocTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#332F3A]/40 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close container */}
      <div
        className="relative w-full max-w-3xl max-h-[88vh] bg-white/95 backdrop-blur-2xl border border-white rounded-[36px] shadow-clay-surface flex flex-col overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Tabs */}
        <div className="p-6 sm:p-8 pb-4 border-b border-[#E9E4F2] flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[18px] bg-gradient-to-br from-[#C4B5FD] to-[#7C3AED] text-white flex items-center justify-center shadow-clay-orb shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className="text-xl font-black text-[#332F3A] tracking-tight"
                >
                  Platform Documentation & Policies
                </h3>
                <span className="text-xs text-[#635F69] font-medium">
                  CardioQuantum (SIH26139) Reference & Guidelines
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-button-secondary text-[#635F69] hover:text-[#332F3A] flex items-center justify-center hover:-translate-y-0.5 active:scale-90 active:shadow-clay-pressed transition-all duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed rounded-[22px] overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-[18px] text-xs font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clay-button'
                  : 'text-[#635F69] hover:text-[#332F3A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              How to Use
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-[18px] text-xs font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white shadow-clay-button'
                  : 'text-[#635F69] hover:text-[#332F3A]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-[18px] text-xs font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white shadow-clay-button'
                  : 'text-[#635F69] hover:text-[#332F3A]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Terms of Service
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#332F3A] leading-relaxed">
          {/* TAB 1: HOW TO USE */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="p-4 rounded-[22px] bg-[#EDE9FE] border border-[#DDD6FE] shadow-clay-card flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                <div>
                  <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#7C3AED]">
                    Quick 2-Minute Demonstration Flow
                  </h4>
                  <p className="text-[11px] text-[#4C1D95] mt-1">
                    CardioQuantum demonstrates hybrid cardiovascular risk prediction combining a Scikit-learn Machine Learning classifier with a 4-qubit Qiskit quantum circuit simulation.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#332F3A] uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#7C3AED]" />
                  Step-by-Step Instructions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-[22px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2">
                    <span style={{ fontFamily: 'Nunito, sans-serif' }} className="w-6 h-6 rounded-full bg-[#7C3AED] text-white font-black text-xs flex items-center justify-center shadow-sm">
                      1
                    </span>
                    <h5 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-bold text-[#332F3A] text-xs">
                      Choose Input Method
                    </h5>
                    <p className="text-[11px] text-[#635F69]">
                      Click a <strong>Quick Preset</strong> (Healthy, Moderate, High Risk) or drag the modern <strong>radial circular dials</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2">
                    <span style={{ fontFamily: 'Nunito, sans-serif' }} className="w-6 h-6 rounded-full bg-[#7C3AED] text-white font-black text-xs flex items-center justify-center shadow-sm">
                      2
                    </span>
                    <h5 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-bold text-[#332F3A] text-xs">
                      Run Hybrid Analysis
                    </h5>
                    <p className="text-[11px] text-[#635F69]">
                      Click <strong>Run Hybrid Risk Analysis</strong> to trigger parallel ML inference and Qiskit 1024-shot circuit simulation.
                    </p>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-[#E9E4F2] shadow-clay-card space-y-2">
                    <span style={{ fontFamily: 'Nunito, sans-serif' }} className="w-6 h-6 rounded-full bg-[#7C3AED] text-white font-black text-xs flex items-center justify-center shadow-sm">
                      3
                    </span>
                    <h5 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-bold text-[#332F3A] text-xs">
                      Compare Results
                    </h5>
                    <p className="text-[11px] text-[#635F69]">
                      Inspect the radial risk gauge, compare ML vs Quantum scores, and review the top measured basis states.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-[24px] bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed space-y-2">
                  <h5 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-black text-xs text-[#332F3A]">
                    Understanding the Risk Tiers:
                  </h5>
                  <ul className="space-y-1.5 text-[11px] text-[#635F69]">
                    <li className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-sm shrink-0" />
                      <strong>Low Risk (0–33%)</strong>: Biometrics align with baseline healthy distributions.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-sm shrink-0" />
                      <strong>Moderate Risk (34–66%)</strong>: Borderline parameters; monitoring recommended.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] shadow-sm shrink-0" />
                      <strong>High Risk (67–100%)</strong>: Elevated probability cluster indicating cardiovascular risk.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-[22px] bg-[#E0F2FE] border border-[#BAE6FD] shadow-clay-card flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#0284C7]">
                    Zero-PII Compliance Guarantee
                  </h4>
                  <p className="text-[11px] text-[#0369A1] mt-1">
                    CardioQuantum strictly does not collect, record, or track any Personally Identifiable Information.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#332F3A] uppercase tracking-wider">
                  What We Never Collect:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#635F69]">
                  <div className="p-2.5 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] font-bold">
                    ✕ No Patient Names
                  </div>
                  <div className="p-2.5 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] font-bold">
                    ✕ No Emails or Phones
                  </div>
                  <div className="p-2.5 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] font-bold">
                    ✕ No Government IDs
                  </div>
                  <div className="p-2.5 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] font-bold">
                    ✕ No Hospital MRNs
                  </div>
                  <div className="p-2.5 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] font-bold">
                    ✕ No IP / GPS Tracking
                  </div>
                  <div className="p-2.5 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] font-bold">
                    ✕ No Tracking Cookies
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-[24px] bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed space-y-2">
                <h5 style={{ fontFamily: 'Nunito, sans-serif' }} className="font-black text-xs text-[#332F3A]">
                  Data Storage & Encryption:
                </h5>
                <p className="text-[11px] text-[#635F69] leading-relaxed">
                  Only anonymous numeric biometrics and computed risk percentages are indexed with ephemeral UUIDs in PostgreSQL. All communication is encrypted via TLS 1.3/HTTPS, and storage volumes employ AES-256 encryption.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-[22px] bg-[#FEF3C7] border border-[#FDE68A] shadow-clay-card flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#92400E]">
                    Strict Non-Clinical Educational Disclaimer
                  </h4>
                  <p className="text-[11px] text-[#78350F] mt-1">
                    This platform is an academic demonstration developed for the Smart India Hackathon (SIH26139).
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#332F3A] uppercase tracking-wider">
                  Important Terms & Boundaries:
                </h4>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-card flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                    <div>
                      <strong style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-bold text-[#332F3A]">
                        Not a Medical Diagnostic Tool:
                      </strong>
                      <p className="text-[11px] text-[#635F69] mt-0.5">
                        The outputs are algorithmic estimates. Never use this platform as a substitute for professional clinical medical advice or emergency care.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-card flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                    <div>
                      <strong style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-bold text-[#332F3A]">
                        No Doctor-Patient Relationship:
                      </strong>
                      <p className="text-[11px] text-[#635F69] mt-0.5">
                        Interactions with this platform do not establish any medical, diagnostic, or therapeutic relationship.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[20px] bg-white border border-[#E9E4F2] shadow-clay-card flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                    <div>
                      <strong style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-bold text-[#332F3A]">
                        Quantum Simulation Scope:
                      </strong>
                      <p className="text-[11px] text-[#635F69] mt-0.5">
                        The 4-qubit variational circuit is an academic research experiment and must not be considered clinically validated or superior to standard medical diagnostic protocols.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#F4F1FA] border-t border-[#E9E4F2] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#7C3AED]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CardioQuantum · SIH26139</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="px-6 py-2 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white font-extrabold text-xs shadow-clay-button hover:shadow-clay-button-hover active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
