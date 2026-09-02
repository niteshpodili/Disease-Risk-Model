import React from 'react';
import type { AnalysisResponse } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Atom, Cpu, ArrowRightLeft, Info, Layers } from 'lucide-react';

interface ComparisonCardProps {
  result: AnalysisResponse;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ result }) => {
  const { classical_ml, quantum_simulation, comparison } = result;

  const chartData = [
    {
      name: 'Classical ML',
      score: classical_ml.risk_percentage,
      type: 'Clinical Predictor',
      color: '#0EA5E9'
    },
    {
      name: 'Quantum Exp.',
      score: quantum_simulation.experimental_score,
      type: 'Toy Simulation',
      color: '#7C3AED'
    }
  ];

  // Top quantum states
  const quantumStatesData = quantum_simulation.top_state_counts
    ? Object.entries(quantum_simulation.top_state_counts).map(([state, count]) => ({
        state: `|${state}⟩`,
        probability: Number(((count / quantum_simulation.shots) * 100).toFixed(1)),
        count
      }))
    : [];

  return (
    <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-surface rounded-[36px] p-6 sm:p-10 space-y-8 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F2]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-[#C084FC] to-[#9333EA] text-white flex items-center justify-center shadow-clay-button shrink-0">
            <ArrowRightLeft className="w-7 h-7" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-2xl font-black text-[#332F3A] tracking-tight">
              Classical vs Experimental Quantum Comparison
            </h2>
            <p className="text-xs text-[#635F69] font-medium mt-0.5">
              Comparative analysis between the primary Scikit-learn model and 4-qubit Qiskit toy circuit.
            </p>
          </div>
        </div>

        {/* Delta Pill */}
        <div
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E9E4F2] shadow-clay-orb text-xs font-black text-[#7C3AED]"
        >
          <Info className="w-4 h-4 text-[#7C3AED]" />
          <span>Delta: {comparison.delta.toFixed(1)}% ({comparison.agreement_level})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Classical ML Card */}
        <div className="bg-gradient-to-br from-white to-[#F0F9FF]/80 border border-white rounded-[30px] p-6 shadow-clay-card hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-extrabold text-[#0284C7] flex items-center gap-2 uppercase tracking-wider">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white flex items-center justify-center shadow-clay-orb">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              Classical Prediction Engine
            </span>
            <span
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]"
            >
              Primary
            </span>
          </div>

          <div>
            <div style={{ fontFamily: 'Nunito, sans-serif' }} className="text-4xl font-black text-[#0284C7] tracking-tight">
              {classical_ml.risk_percentage.toFixed(1)}%
            </div>
            <div className="text-xs text-[#635F69] font-medium mt-1">
              Evaluated {classical_ml.model_name} Risk Probability
            </div>
          </div>

          <div className="pt-4 border-t border-[#E0F2FE] text-xs font-medium text-[#635F69] space-y-2">
            <div className="flex justify-between">
              <span>Risk Classification:</span>
              <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black">{classical_ml.risk_category}</span>
            </div>
            <div className="flex justify-between">
              <span>Class Probability:</span>
              <span className="font-mono font-bold text-[#332F3A]">{classical_ml.risk_probability.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Quantum Simulation Card */}
        <div className="bg-gradient-to-br from-white to-[#FAF5FF]/80 border border-white rounded-[30px] p-6 shadow-clay-card hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-xs font-extrabold text-[#7C3AED] flex items-center gap-2 uppercase tracking-wider">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C084FC] to-[#9333EA] text-white flex items-center justify-center shadow-clay-orb">
                <Atom className="w-3.5 h-3.5" />
              </div>
              Qiskit Quantum Simulation
            </span>
            <span
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE]"
            >
              Non-Clinical
            </span>
          </div>

          <div>
            <div style={{ fontFamily: 'Nunito, sans-serif' }} className="text-4xl font-black text-[#7C3AED] tracking-tight">
              {quantum_simulation.experimental_score.toFixed(1)}%
            </div>
            <div className="text-xs text-[#635F69] font-medium mt-1">
              Experimental Subspace Entanglement Alignment
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDE9FE] text-xs font-medium text-[#635F69] space-y-2">
            <div className="flex justify-between">
              <span>Circuit Architecture:</span>
              <span style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-black">4 Qubits (H + Ry + CX)</span>
            </div>
            <div className="flex justify-between">
              <span>Simulation Iterations:</span>
              <span className="font-mono font-bold text-[#332F3A]">{quantum_simulation.shots} (AerSimulator)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-[#E9E4F2]">
        {/* Metric Bar Comparison */}
        <div className="bg-white/90 border border-white rounded-[28px] p-6 shadow-clay-card space-y-3">
          <h3 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#332F3A] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0EA5E9]" />
            Score Comparison Bar
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  formatter={(val: any) => [`${Number(val).toFixed(1)}%`, 'Score']}
                />
                <Bar dataKey="score" radius={[12, 12, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quantum Statevector Distribution */}
        <div className="bg-white/90 border border-white rounded-[28px] p-6 shadow-clay-card space-y-3">
          <h3 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-sm font-black text-[#332F3A] uppercase tracking-wider flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#7C3AED]" />
            Top Measured Quantum States (Qiskit Aer)
          </h3>
          {quantumStatesData.length > 0 ? (
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quantumStatesData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="state" stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 12, fontFamily: 'monospace', fontWeight: 600 }} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    formatter={(val: any) => [`${Number(val).toFixed(1)}%`, 'Probability']}
                  />
                  <Bar dataKey="probability" fill="#8B5CF6" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-xs text-[#635F69] py-14 text-center">No quantum states captured.</p>
          )}
        </div>
      </div>
    </div>
  );
};
