import React, { useState } from 'react';
import { Occupation271 } from '../data/occupations271';
import { Compass, ExternalLink, X, ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react';

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
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Active Occupation Token"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 font-sans select-none"
    >
      {/* Expanded Mini Context Card */}
      {expanded && (
        <div className="mb-2 w-72 sm:w-80 bg-[#161C25] text-[#EEF2F6] rounded-xl shadow-2xl border border-[#222B38] p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start justify-between gap-2 border-b border-[#222B38] pb-2 mb-3">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#22D3EE] tracking-wider font-semibold">
                Tracked Profession
              </span>
              <h4 className="font-serif font-bold text-sm text-[#EEF2F6] leading-snug">
                {occupation.occupation_title}
              </h4>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#94A3B8] hover:text-[#EEF2F6] p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
            <div className="bg-[#0C1016] border border-[#222B38] p-2 rounded-lg">
              <span className="text-[10px] text-[#94A3B8] block">AI Exposure</span>
              <span className="font-bold text-[#22D3EE] text-sm">
                {(occupation.ai_exposure_llm_human * 100).toFixed(0)}%
              </span>
              <span className="text-[9px] text-[#94A3B8] block capitalize">{occupation.ai_exposure_level} tier</span>
            </div>
            <div className="bg-[#0C1016] border border-[#222B38] p-2 rounded-lg">
              <span className="text-[10px] text-[#94A3B8] block">10-Yr US Growth</span>
              <span
                className={`font-bold text-sm ${
                  occupation.projected_growth_pct_2024_2034 >= 3.1
                    ? 'text-[#10B981]'
                    : occupation.projected_growth_pct_2024_2034 >= 0
                    ? 'text-[#EEF2F6]'
                    : 'text-[#F43F5E]'
                }`}
              >
                {occupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                {occupation.projected_growth_pct_2024_2034}%
              </span>
              <span className="text-[9px] text-[#94A3B8] block truncate">{occupation.growth_outlook}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#94A3B8] mb-3 space-y-1">
            <div className="flex justify-between">
              <span>Median Wage:</span>
              <span className="font-mono font-medium text-[#EEF2F6]">${occupation.median_annual_wage_usd.toLocaleString()}/yr</span>
            </div>
            <div className="flex justify-between">
              <span>Distinctive Strength:</span>
              <span className="font-mono font-medium text-[#22D3EE]">{occupation.distinctive_cognitive_strength}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#222B38]">
            <button
              onClick={() => {
                setExpanded(false);
                onOpenInChapter10(occupation);
              }}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#22D3EE] text-[#0C1016] text-xs font-mono font-semibold hover:bg-[#38BDF8] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Work Card</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setExpanded(false);
                onSelectAnother();
              }}
              className="py-1.5 px-2.5 rounded-lg bg-[#1C2430] hover:bg-[#222B38] text-[#EEF2F6] text-xs font-mono border border-[#222B38] transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Tiny Subtly Following Token Pill */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#161C25]/95 text-[#EEF2F6] text-xs font-mono rounded-full shadow-lg border border-[#222B38] hover:border-[#22D3EE] transition-all cursor-pointer backdrop-blur-md group"
      >
        <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
        <span className="font-sans font-semibold truncate max-w-[120px] sm:max-w-[160px] text-[#EEF2F6]">
          {occupation.occupation_title}
        </span>
        <span className="px-1.5 py-0.2 rounded bg-[#0C1016] border border-[#222B38] text-[10px] text-[#22D3EE] font-bold">
          {(occupation.ai_exposure_llm_human * 100).toFixed(0)}%
        </span>
        {expanded ? <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />}
      </button>
    </aside>
  );
};
