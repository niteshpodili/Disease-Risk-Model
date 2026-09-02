import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { PatientForm } from './components/PatientForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ComparisonCard } from './components/ComparisonCard';
import { FeatureImportanceChart } from './components/FeatureImportanceChart';
import { HistoryTable } from './components/HistoryTable';
import { DocsModal, type DocTab } from './components/DocsModal';
import {
  defaultModelMetadata,
  defaultAnalysisResult,
  defaultHistory
} from './data/defaultData';
import type {
  HeartPredictionInput,
  AnalysisResponse,
  AnalysisHistoryItem,
  ModelMetadataResponse
} from './types';
import { api } from './services/api';
import { AlertTriangle, Sparkles, Heart, BookOpen, ShieldCheck, FileText } from 'lucide-react';

export function App() {
  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const [modelMetadata, setModelMetadata] = useState<ModelMetadataResponse | null>(defaultModelMetadata);
  const [currentResult, setCurrentResult] = useState<AnalysisResponse | null>(defaultAnalysisResult);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>(defaultHistory);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Docs Modal State
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [docsTab, setDocsTab] = useState<DocTab>('guide');

  const handleOpenDocs = (tab: DocTab = 'guide') => {
    setDocsTab(tab);
    setIsDocsOpen(true);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const health = await api.getHealth();
      setIsHealthy(health.status === 'healthy');

      const meta = await api.getModelMetadata();
      setModelMetadata(meta);

      const pastAnalyses = await api.getAnalyses(10);
      setHistory(pastAnalyses);
    } catch (err: any) {
      console.warn("Initial load using bundled fallback data:", err);
      setIsHealthy(true);
    }
  };

  const handleAnalyze = async (input: HeartPredictionInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.analyze(input);
      setCurrentResult(response);
      // Prepend to history
      const newHistoryItem: AnalysisHistoryItem = {
        id: response.id,
        age: input.age,
        gender: input.gender,
        blood_pressure: input.blood_pressure,
        cholesterol: input.cholesterol,
        heart_rate: input.heart_rate,
        ml_risk_percentage: response.classical_ml.risk_percentage,
        ml_risk_category: response.classical_ml.risk_category,
        quantum_score: response.quantum_simulation.experimental_score,
        created_at: new Date().toISOString()
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 14)]);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1FA] text-[#332F3A] flex flex-col relative overflow-hidden selection:bg-[#7C3AED]/20 selection:text-[#7C3AED]">
      {/* Floating 3D Background Ambient Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#C4B5FD]/40 blur-3xl animate-clay-float" />
        <div className="absolute top-[10%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FBCFE8]/40 blur-3xl animate-clay-float-delayed" />
        <div className="absolute top-[45%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#BAE6FD]/40 blur-3xl animate-clay-float-slow" />
        <div className="absolute -bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#A7F3D0]/35 blur-3xl animate-clay-breathe" />
      </div>

      {/* Interactive Docs & Policies Modal */}
      <DocsModal
        isOpen={isDocsOpen}
        initialTab={docsTab}
        onClose={() => setIsDocsOpen(false)}
      />

      <Navbar
        isHealthy={isHealthy}
        modelName={modelMetadata?.model_name || 'Classical Classifier'}
        onOpenDocs={handleOpenDocs}
      />
      <DisclaimerBanner />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
          <div
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E4F2] shadow-clay-orb text-xs font-black text-[#7C3AED]"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            Smart India Hackathon Prototype — SIH26139
          </div>

          <h1
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#332F3A] leading-[1.15]"
          >
            Quantum-Inspired{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#DB2777] to-[#0EA5E9] bg-clip-text text-transparent">
              Disease Risk Analysis
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#635F69] font-medium leading-relaxed max-w-2xl mx-auto">
            A tangible hybrid healthcare analytics demonstration combining a validated Classical Machine Learning model with an experimental 4-qubit Qiskit quantum circuit simulation.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-5 rounded-[24px] bg-[#FEF2F2] border border-[#FCA5A5] shadow-clay-card text-[#DC2626] text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
            <div>
              <strong style={{ fontFamily: 'Nunito, sans-serif' }} className="font-black">Analysis Error: </strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Patient Input Form */}
        <PatientForm onSubmit={handleAnalyze} isLoading={isLoading} />

        {/* Results Section — always rendered and re-animated on each new result */}
        {currentResult && (
          <div
            key={currentResult.id}
            className="space-y-10"
            style={{ animation: 'fadeInUp 0.4s ease-out' }}
          >
            <ResultsDashboard result={currentResult} />
            <ComparisonCard result={currentResult} />
          </div>
        )}

        {/* Global Model Feature Importance */}
        <FeatureImportanceChart metadata={modelMetadata} />

        {/* Anonymized History */}
        <HistoryTable initialHistory={history} />
      </main>

      {/* Floating Clay Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-card rounded-[32px] px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#635F69] font-medium">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#DB2777]" />
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="font-extrabold text-[#332F3A]">
              CardioQuantum Platform
            </span>
            <span>— Smart India Hackathon (SIH26139)</span>
          </div>

          {/* Interactive Documentation, PP, and ToS Links */}
          <div className="flex items-center gap-4 flex-wrap justify-center font-semibold">
            <button
              type="button"
              onClick={() => handleOpenDocs('guide')}
              className="hover:text-[#7C3AED] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#7C3AED]" />
              How to Use
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleOpenDocs('privacy')}
              className="hover:text-[#0284C7] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleOpenDocs('terms')}
              className="hover:text-[#DB2777] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#DB2777]" />
              Terms of Service
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#7C3AED] font-bold">
            <span>React + FastAPI + Scikit-learn + Qiskit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
