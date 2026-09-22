import React, { useState } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { EvidenceBadge } from '../EvidenceBadge';
import { Scale, Eye, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface Chapter3Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

const DISAGREEMENT_EXAMPLES = [
  '31-9094', // Medical transcriptionists
  '43-3031', // Bookkeeping clerks
  '23-2092', // Court reporters
  '17-2061', // Computer hardware engineers
  '39-6012', // Concierges
  '19-3022', // Survey researchers
  '27-3041'  // Editors (high agreement)
];

export const Chapter3ThreeLenses: React.FC<Chapter3Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(activeOccupation.soc_code);

  const occ = occupations271.find((o) => o.soc_code === selectedCode) || activeOccupation;

  // Normalized AIOE representation (raw is standardized z-score roughly -2.0 to +2.0)
  const aioeNormalized = Math.max(0, Math.min(1, (occ.ai_exposure_aioe + 2) / 4));

  const humanPct = (occ.ai_exposure_llm_human * 100).toFixed(0);
  const gpt4Pct = (occ.ai_exposure_llm_gpt4 * 100).toFixed(0);
  const gapPct = Math.abs(occ.ai_exposure_llm_human - occ.ai_exposure_llm_gpt4) * 100;

  return (
    <article
      id="ch03_three_lenses"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">03</span>
            <span>ONE JOB. THREE AI LENSES.</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EEF2F6] tracking-tight leading-tight">
            There is no single "AI risk number."
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            While human rubrics and automated models correlate strongly overall (<strong className="font-mono text-[#EEF2F6]">r = 0.835</strong>), individual occupations produce surprising disagreements. Depending on who evaluates the work, the same job looks entirely exposed or largely human-intensive.
          </p>
        </header>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161C25] p-3.5 rounded-xl border border-[#222B38]">
          <span className="text-xs font-mono text-[#94A3B8]">Sample high-divergence occupations:</span>
          <div className="flex flex-wrap gap-1.5">
            {DISAGREEMENT_EXAMPLES.map((code) => {
              const item = occupations271.find((o) => o.soc_code === code);
              if (!item) return null;
              const isSelected = selectedCode === code;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedCode(code);
                    onSelectOccupation(item);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#22D3EE] text-[#0C1016] font-bold shadow-md'
                      : 'bg-[#0C1016] text-[#94A3B8] hover:text-[#EEF2F6] hover:bg-[#1C2430] border border-[#222B38]'
                  }`}
                >
                  {item.occupation_title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Three Lenses Comparison Display */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#222B38] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#22D3EE]">
                  {occ.job_category}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0C1016] border border-[#222B38] text-[#94A3B8]">
                  SOC {occ.soc_code}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6] mt-1">
                {occ.occupation_title}
              </h3>
            </div>
            <EvidenceBadge id="C005" onClick={onOpenEvidence} labelOverride="Measurement Divergence Audit" />
          </div>

          {/* Three Measurement Lenses Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lens 1: Human Expert Rubric */}
            <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#22D3EE]" /> Human Expert
                </span>
                <span className="text-[10px] uppercase font-bold text-[#22D3EE]">Baseline</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold font-mono text-[#22D3EE] block">
                  {humanPct}%
                </span>
                <span className="text-[11px] text-[#94A3B8] block">
                  Tasks accelerated by ≥50%
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-[#222B38]">
                Human labor researchers evaluate detailed O*NET task statements, considering real workplace friction and legal barriers.
              </p>
            </div>

            {/* Lens 2: GPT-4 Direct Model Evaluation */}
            <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#38BDF8]" /> GPT-4 Rubric
                </span>
                <span className="text-[10px] uppercase text-[#38BDF8] font-bold">Algorithmic</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold font-mono text-[#38BDF8] block">
                  {gpt4Pct}%
                </span>
                <span className="text-[11px] text-[#94A3B8] block">
                  Model self-assessed capability
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-[#222B38]">
                Direct model evaluation based on technical input/output requirements, often rating tasks higher due to lack of real-world friction.
              </p>
            </div>

            {/* Lens 3: Felten et al. AIOE Z-Score */}
            <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" /> Felten AIOE
                </span>
                <span className="text-[10px] uppercase text-[#F59E0B] font-bold">Academic</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold font-mono text-[#F59E0B] block">
                  {occ.ai_exposure_aioe > 0 ? `+${occ.ai_exposure_aioe.toFixed(2)}` : occ.ai_exposure_aioe.toFixed(2)}
                </span>
                <span className="text-[11px] text-[#94A3B8] block">
                  Relative Z-Score (mean 0.0)
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-[#222B38]">
                Standardized ability-weighted exposure index connecting 52 cognitive skills to 10 AI applications.
              </p>
            </div>
          </div>

          {/* Divergence Analysis Banner */}
          <div className="p-4 rounded-xl bg-[#0C1016] border border-[#222B38] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-[#22D3EE] font-semibold">
                Evaluation Gap for this role: {gapPct.toFixed(1)} percentage points
              </span>
              <p className="text-xs text-[#94A3B8]">
                {gapPct > 15
                  ? 'High divergence: Human experts and automated rubrics sharply disagree on the feasibility of automating this role in practice.'
                  : 'High consensus: Human evaluators and automated models largely agree on the task boundary for this profession.'}
              </p>
            </div>
            <div className="text-right font-mono text-xs text-[#94A3B8]">
              <span>Overall Correlation:</span>{' '}
              <strong className="text-[#EEF2F6]">r = +0.835</strong>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
