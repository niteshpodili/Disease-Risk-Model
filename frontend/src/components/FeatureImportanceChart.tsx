import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BarChart3, AlertCircle } from 'lucide-react';
import type { ModelMetadataResponse } from '../types';

interface FeatureImportanceChartProps {
  metadata: ModelMetadataResponse | null;
}

export const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ metadata }) => {
  if (!metadata || !metadata.global_feature_importances) {
    return null;
  }

  const data = Object.entries(metadata.global_feature_importances)
    .map(([feature, weight]) => ({
      feature,
      weight: Number((weight * 100).toFixed(1)),
      raw: weight
    }))
    .sort((a, b) => b.weight - a.weight);

  const colors = ['#7C3AED', '#DB2777', '#0EA5E9', '#10B981', '#F59E0B'];

  return (
    <div className="bg-white/85 backdrop-blur-xl border border-white/80 shadow-clay-surface rounded-[36px] p-6 sm:p-10 space-y-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F2]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white flex items-center justify-center shadow-clay-button shrink-0">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'Nunito, sans-serif' }} className="text-2xl font-black text-[#332F3A] tracking-tight">
              Global Model Feature Importance
            </h3>
            <p className="text-xs text-[#635F69] font-medium mt-0.5">
              Dataset-level predictive weight distribution from trained {metadata.model_name}.
            </p>
          </div>
        </div>

        <div
          style={{ fontFamily: 'Nunito, sans-serif' }}
          className="text-xs font-black text-[#7C3AED] bg-white border border-[#E9E4F2] shadow-clay-orb px-4 py-2 rounded-full"
        >
          5-Fold CV Acc: {(metadata.cv_metrics.cv_accuracy_mean * 100).toFixed(1)}% | ROC-AUC: {metadata.cv_metrics.cv_roc_auc_mean.toFixed(3)}
        </div>
      </div>

      {/* Recharts Chart */}
      <div className="h-60 w-full bg-white/60 border border-white/80 rounded-[28px] p-4 shadow-clay-card">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[0, 50]}
              stroke="#94a3b8"
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
              unit="%"
            />
            <YAxis
              type="category"
              dataKey="feature"
              stroke="#94a3b8"
              tick={{ fill: '#332F3A', fontSize: 12, fontWeight: 700 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }}
              formatter={(val: any) => [`${val}% weight`, 'Global Importance']}
            />
            <Bar dataKey="weight" radius={[0, 12, 12, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Methodology Disclaimer Pill */}
      <div className="p-4 rounded-[22px] bg-[#F4F1FA] border border-[#E9E4F2] shadow-clay-pressed flex items-start gap-3 text-xs text-[#635F69]">
        <AlertCircle className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong style={{ fontFamily: 'Nunito, sans-serif' }} className="text-[#332F3A] font-extrabold">Methodology Note:</strong> {metadata.disclaimer}
        </p>
      </div>
    </div>
  );
};
