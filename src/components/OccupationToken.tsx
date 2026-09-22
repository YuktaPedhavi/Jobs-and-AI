import React, { useState } from 'react';
import { Occupation271 } from '../data/occupations271';
import { X, ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface OccupationTokenProps {
  occupation: Occupation271;
  onOpenInChapter10: (occ: Occupation271) => void;
  onSelectAnother: () => void;
}

export const OccupationToken: React.FC<OccupationTokenProps> = ({
  occupation,
  onOpenInChapter10,
  onSelectAnother
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Active Occupation Token"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 font-sans select-none"
    >
      {/* Expanded Mini Context Card */}
      {expanded && (
        <div
          className="mb-2 w-72 sm:w-80 rounded-xl shadow-2xl border p-4 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-md"
          style={{
            backgroundColor: isDark ? '#0b1f3c' : '#ffffff',
            borderColor: isDark ? '#163560' : '#d5dde7',
            color: isDark ? '#f7faeb' : '#061329'
          }}
        >
          <div
            className="flex items-start justify-between gap-2 border-b pb-2 mb-3"
            style={{ borderColor: isDark ? '#163560' : '#d5dde7' }}
          >
            <div>
              <span
                className="font-mono text-[10px] uppercase tracking-wider font-semibold block"
                style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
              >
                Tracked Profession
              </span>
              <h4
                className="font-display font-extrabold text-sm tracking-tight leading-snug"
                style={{ color: isDark ? '#f7faeb' : '#061329' }}
              >
                {occupation.occupation_title}
              </h4>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="p-0.5 cursor-pointer transition-colors"
              style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
            <div
              className="border p-2 rounded-lg"
              style={{
                backgroundColor: isDark ? '#071731' : '#f1efe6',
                borderColor: isDark ? '#142e53' : '#cbd4df'
              }}
            >
              <span
                className="text-[10px] block"
                style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
              >
                AI Exposure
              </span>
              <span
                className="font-bold text-sm"
                style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
              >
                {(occupation.ai_exposure_llm_human * 100).toFixed(0)}%
              </span>
              <span
                className="text-[9px] block capitalize"
                style={{ color: isDark ? '#5f7d9f' : '#64748b' }}
              >
                {occupation.ai_exposure_level} tier
              </span>
            </div>
            <div
              className="border p-2 rounded-lg"
              style={{
                backgroundColor: isDark ? '#071731' : '#f1efe6',
                borderColor: isDark ? '#142e53' : '#cbd4df'
              }}
            >
              <span
                className="text-[10px] block"
                style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
              >
                10-Yr US Growth
              </span>
              <span
                className={`font-bold text-sm ${
                  occupation.projected_growth_pct_2024_2034 >= 3.1
                    ? 'text-[#10B981]'
                    : occupation.projected_growth_pct_2024_2034 >= 0
                    ? isDark ? 'text-[#f7faeb]' : 'text-[#061329]'
                    : 'text-[#F43F5E]'
                }`}
              >
                {occupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                {occupation.projected_growth_pct_2024_2034}%
              </span>
              <span
                className="text-[9px] block truncate"
                style={{ color: isDark ? '#5f7d9f' : '#64748b' }}
              >
                {occupation.growth_outlook}
              </span>
            </div>
          </div>

          <div
            className="text-[11px] mb-3 space-y-1"
            style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
          >
            <div className="flex justify-between">
              <span>Median Wage:</span>
              <span
                className="font-mono font-medium"
                style={{ color: isDark ? '#f7faeb' : '#061329' }}
              >
                ${occupation.median_annual_wage_usd.toLocaleString()}/yr
              </span>
            </div>
            <div className="flex justify-between">
              <span>Distinctive Strength:</span>
              <span
                className="font-mono font-medium"
                style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
              >
                {occupation.distinctive_cognitive_strength}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 pt-2 border-t"
            style={{ borderColor: isDark ? '#163560' : '#d5dde7' }}
          >
            <button
              onClick={() => {
                setExpanded(false);
                onOpenInChapter10(occupation);
              }}
              className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
              style={{
                backgroundColor: isDark ? '#d7e63b' : '#1e5bb4',
                color: isDark ? '#061329' : '#ffffff'
              }}
            >
              <span>Work Card</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setExpanded(false);
                onSelectAnother();
              }}
              className="py-1.5 px-2.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer"
              style={{
                backgroundColor: isDark ? '#071731' : '#f1efe6',
                borderColor: isDark ? '#142e53' : '#cbd4df',
                color: isDark ? '#9bb2cf' : '#475e77'
              }}
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Tiny Subtly Following Token Pill */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full shadow-lg border transition-all cursor-pointer backdrop-blur-md group"
        style={{
          backgroundColor: isDark ? 'rgba(11, 31, 60, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? '#163560' : '#d5dde7',
          color: isDark ? '#f7faeb' : '#061329'
        }}
        data-cursor-interactive="true"
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: isDark ? '#d7e63b' : '#1e5bb4' }}
        />
        <span
          className="font-sans font-semibold truncate max-w-[120px] sm:max-w-[160px]"
          style={{ color: isDark ? '#f7faeb' : '#061329' }}
        >
          {occupation.occupation_title}
        </span>
        <span
          className="px-1.5 py-0.2 rounded border text-[10px] font-bold"
          style={{
            backgroundColor: isDark ? '#071731' : '#f1efe6',
            borderColor: isDark ? '#142e53' : '#cbd4df',
            color: isDark ? '#d7e63b' : '#1e5bb4'
          }}
        >
          {(occupation.ai_exposure_llm_human * 100).toFixed(0)}%
        </span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5" style={{ color: isDark ? '#9bb2cf' : '#526a85' }} />
        ) : (
          <ChevronUp className="w-3.5 h-3.5" style={{ color: isDark ? '#9bb2cf' : '#526a85' }} />
        )}
      </button>
    </aside>
  );
};
