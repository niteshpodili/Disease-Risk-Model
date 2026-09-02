import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { PatientForm } from './components/PatientForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ComparisonCard } from './components/ComparisonCard';
import { FeatureImportanceChart } from './components/FeatureImportanceChart';
import { HistoryTable } from './components/HistoryTable';
import type {
  HeartPredictionInput,
  AnalysisResponse,
  AnalysisHistoryItem,
  ModelMetadataResponse
} from './types';
import { api } from './services/api';
import { AlertTriangle, Sparkles, Heart } from 'lucide-react';

export function App() {
  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [modelMetadata, setModelMetadata] = useState<ModelMetadataResponse | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisResponse | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      console.error("Initial load warning:", err);
      setIsHealthy(false);
    }
  };

  const handleAnalyze = async (input: HeartPredictionInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentResult(null); // clear stale result immediately before new request
    try {
      const response = await api.analyze(input);
      setCurrentResult(response);
      // History table self-updates via Supabase Realtime — no manual refetch needed.
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
        {/* Violet Blob Top-Left */}
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#C4B5FD]/40 blur-3xl animate-clay-float" />
        {/* Hot Pink Blob Top-Right */}
        <div className="absolute top-[10%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FBCFE8]/40 blur-3xl animate-clay-float-delayed" />
        {/* Sky Blue Blob Center-Left */}
        <div className="absolute top-[45%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#BAE6FD]/40 blur-3xl animate-clay-float-slow" />
        {/* Emerald Blob Bottom-Right */}
        <div className="absolute -bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#A7F3D0]/35 blur-3xl animate-clay-breathe" />
      </div>

      <Navbar
        isHealthy={isHealthy}
        modelName={modelMetadata?.model_name || 'Classical Classifier'}
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

        {/* Results Section — key forces full remount on every new result */}
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
        <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-card rounded-[32px] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#635F69] font-medium">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#DB2777]" />
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="font-extrabold text-[#332F3A]">
              CardioQuantum Platform
            </span>
            <span>— Smart India Hackathon (SIH26139)</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#7C3AED] font-bold">
            <span>React + TypeScript + FastAPI + Scikit-learn + Qiskit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
