import React, { useEffect, useState, useCallback } from 'react';
import type { AnalysisHistoryItem } from '../types';
import { History, ShieldAlert, ShieldCheck, AlertCircle, Loader2, Wifi } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface HistoryTableProps {
  /** Initial rows fetched by the parent; Realtime will append new ones */
  initialHistory: AnalysisHistoryItem[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ initialHistory }) => {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>(initialHistory);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Keep local state in sync when parent re-fetches (e.g. first load)
  useEffect(() => {
    setHistory(initialHistory);
  }, [initialHistory]);

  // ── Supabase Realtime Subscription ──────────────────────────────────────────
  const subscribeRealtime = useCallback(() => {
    if (!supabase) {
      setIsLive(false);
      return () => {};
    }

    const channel = supabase
      .channel('analyses-live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'analyses' },
        (payload) => {
          const raw = payload.new as Record<string, unknown>;
          const newRow: AnalysisHistoryItem = {
            id:               String(raw.id ?? ''),
            age:              Number(raw.age ?? 0),
            gender:           Number(raw.gender ?? 0),
            blood_pressure:   Number(raw.blood_pressure ?? 0),
            cholesterol:      Number(raw.cholesterol ?? 0),
            heart_rate:       Number(raw.heart_rate ?? 0),
            ml_risk_percentage: Number(raw.ml_risk_percentage ?? 0),
            ml_risk_category: String(raw.ml_risk_category ?? ''),
            quantum_score:    Number(raw.quantum_score ?? 0),
            created_at:       String(raw.created_at ?? ''),
          };
          setHistory((prev) => [newRow, ...prev].slice(0, 15));
        }
      )
      .subscribe((status) => {
        setIsLive(status === 'SUBSCRIBED');
      });

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeRealtime();
    return unsubscribe;
  }, [subscribeRealtime]);

  // ── Risk Badge Helper ────────────────────────────────────────────────────────
  const getBadge = (cat: string) => {
    if (cat === 'High Risk') {
      return (
        <span
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white shadow-sm"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          High
        </span>
      );
    }
    if (cat === 'Moderate Risk') {
      return (
        <span
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white shadow-sm"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          Moderate
        </span>
      );
    }
    return (
      <span
        style={{ fontFamily: 'Nunito, sans-serif' }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-br from-[#34D399] to-[#059669] text-white shadow-sm"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        Low
      </span>
    );
  };

  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-surface rounded-[36px] p-6 sm:p-10 space-y-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F2]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white flex items-center justify-center shadow-clay-button shrink-0">
            <History className="w-7 h-7" />
          </div>
          <div>
            <h3
              style={{ fontFamily: 'Nunito, sans-serif' }}
              className="text-2xl font-black text-[#332F3A] tracking-tight"
            >
              Recent Analysis Sessions
            </h3>
            <p className="text-xs text-[#635F69] font-medium mt-0.5">
              Anonymized session history via Supabase PostgreSQL — updates live.
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#E9E4F2] shadow-clay-orb text-xs font-extrabold text-[#332F3A]"
        >
          {isLive ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#059669]">Supabase Realtime — Live</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981] animate-pulse" />
            </>
          ) : (
            <>
              <Loader2 className="w-3.5 h-3.5 text-[#7C3AED] animate-spin" />
              <span className="text-[#635F69]">Connecting to Realtime...</span>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed rounded-[28px] p-3 overflow-x-auto">
        <table className="w-full text-left text-xs text-[#332F3A]">
          <thead className="text-[#635F69] uppercase text-[11px] font-extrabold tracking-wider border-b border-[#E9E4F2]">
            <tr>
              <th className="py-3 px-4">Session</th>
              <th className="py-3 px-4">Age / Gen</th>
              <th className="py-3 px-4">BP (mmHg)</th>
              <th className="py-3 px-4">Chol (mg/dL)</th>
              <th className="py-3 px-4">HR (bpm)</th>
              <th className="py-3 px-4">ML Risk</th>
              <th className="py-3 px-4">Quantum Exp.</th>
              <th className="py-3 px-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E4F2]">
            {history.map((item, idx) => (
              <tr
                key={item.id}
                className={`hover:bg-white/60 transition-colors duration-150 ${
                  idx === 0 ? 'bg-[#EDE9FE]/30' : ''
                }`}
              >
                <td className="py-3 px-4 font-mono font-bold text-[#7C3AED] truncate max-w-[110px]">
                  {item.id.slice(0, 8)}…
                </td>
                <td
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className="py-3 px-4 font-bold text-[#332F3A]"
                >
                  {item.age}y / {item.gender === 1 ? 'M' : 'F'}
                </td>
                <td className="py-3 px-4 font-mono font-bold">{item.blood_pressure}</td>
                <td className="py-3 px-4 font-mono font-bold">{item.cholesterol}</td>
                <td className="py-3 px-4 font-mono font-bold">{item.heart_rate}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                      className="font-black text-[#332F3A] text-sm"
                    >
                      {item.ml_risk_percentage.toFixed(1)}%
                    </span>
                    {getBadge(item.ml_risk_category)}
                  </div>
                </td>
                <td
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className="py-3 px-4 font-black text-[#7C3AED] text-sm"
                >
                  {item.quantum_score.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-[#635F69] font-medium text-[11px]">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleTimeString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
