import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import {
  Globe,
  Users,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';

interface Chapter9Props {
  onOpenEvidence: (id: string) => void;
}

export const Chapter9IndiaLens: React.FC<Chapter9Props> = ({ onOpenEvidence }) => {
  const [activeSegment, setActiveSegment] = useState<'all' | 'complementary' | 'displacement' | 'low_exp'>('all');

  return (
    <article
      id="ch09_india_lens"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Dataset Limitation Disclosure */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#161C25] border border-[#F59E0B]/30 text-[#EEF2F6] flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
            <span className="font-display font-extrabold text-[#F59E0B] block tracking-tight">
              Methodological Disclosure: Geographic Context
            </span>
            <p className="text-[#94A3B8] font-sans">
              The underlying dataset is 83.6% US-based. Applying US occupational task coefficients directly to India would produce distorted conclusions. This chapter is grounded strictly in macroeconomic research from the <strong className="text-[#EEF2F6]">IMF</strong>, <strong className="text-[#EEF2F6]">World Bank</strong>, and <strong className="text-[#EEF2F6]">NASSCOM</strong>.
            </p>
          </div>
        </div>

        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">07</span>
            <span>INDIA & GLOBAL LABOR ARBITRAGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#EEF2F6] tracking-tight leading-tight">
            The end of cheap hours: How global knowledge work is shifting.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            For twenty years, nations like India grew rapidly because knowledge work could be delivered at a lower cost per hour. Now that software generates baseline code, drafts, and support answers almost for free, the basis of global competition is fundamentally changing.
          </p>
        </header>

        {/* The Core Shift: Past Advantage vs New Advantage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Past Advantage */}
          <div className="p-6 rounded-2xl bg-[#161C25] border border-[#F43F5E]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#F43F5E] font-bold flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" /> Past Advantage (2000–2022)
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8]">Cost Arbitrage</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#EEF2F6]">
              Lower Cost Per Hour
            </h3>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Global delivery was won on headcount volume: ticket resolution, routine maintenance, tier-1 tech support, and data labeling priced in dollar-rupee exchange differentials.
            </p>

            <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] text-xs text-[#94A3B8] space-y-1">
              <span className="text-[#F43F5E] block font-mono font-semibold">The vulnerability:</span>
              <p>Autonomous LLM pipelines compress routine maintenance and ticketing billing models by 40–70%.</p>
            </div>
          </div>

          {/* New Advantage */}
          <div className="p-6 rounded-2xl bg-[#161C25] border border-[#22D3EE]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#22D3EE] font-bold flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> New Advantage (2024–2034)
              </span>
              <span className="text-[10px] font-mono text-[#22D3EE] font-semibold">Value Arbitrage</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#EEF2F6]">
              Architecture, Systems & Product Context
            </h3>

            <p className="text-xs sm:text-sm text-[#EEF2F6] leading-relaxed">
              Global demand is pivoting from raw coding hours to deep system architects, domain-specific AI fine-tuning, complex data pipelines, and end-to-end product ownership.
            </p>

            <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] text-xs text-[#94A3B8] space-y-1">
              <span className="text-[#22D3EE] block font-mono font-semibold">The expansion:</span>
              <p>NASSCOM projects India's pool of advanced AI architects and specialized engineers to surpass 1.25M by 2027.</p>
            </div>
          </div>
        </div>

        {/* Why The Impact Is Uneven: Two Sides */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222B38] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE]">
                Bifurcated Labor Reality
              </span>
              <h3 className="text-xl font-serif font-bold text-[#EEF2F6] mt-0.5">
                Why The Impact Is Deeply Uneven
              </h3>
            </div>
            <EvidenceBadge id="C018" onClick={onOpenEvidence} labelOverride="IMF 2024 · India Labor Exposure" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-2">
              <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-wider font-semibold">
                Facing Pricing Pressure
              </span>
              <h4 className="text-base font-display font-extrabold tracking-tight text-[#EEF2F6]">
                Routine Global Delivery Hubs
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
                Back-office accounting processing, basic manual software testing, and Tier-1 voice call centers face severe fee compression as international clients deploy internal AI agents to handle first-touch interactions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-2">
              <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider font-semibold">
                Surging Premium Demand
              </span>
              <h4 className="text-base font-display font-extrabold tracking-tight text-[#EEF2F6]">
                Architectural & Domain Engineers
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
                Engineers who can design resilient distributed infrastructure, evaluate model hallucinations, and translate messy real-world corporate business rules into production AI workflows command rising global billing rates.
              </p>
            </div>
          </div>

          {/* The 100-Worker Indian Workforce Field (IMF Macro Model) */}
          <div className="pt-4 border-t border-[#222B38] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-[#EEF2F6]">
                IMF 100-Worker Macroeconomic Exposure Model
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setActiveSegment('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeSegment === 'all'
                      ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                      : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38]'
                  }`}
                >
                  All 100
                </button>
                <button
                  onClick={() => setActiveSegment('complementary')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeSegment === 'complementary'
                      ? 'bg-[#10B981] text-[#0C1016] font-bold'
                      : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38]'
                  }`}
                >
                  14% Augmentation
                </button>
                <button
                  onClick={() => setActiveSegment('displacement')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeSegment === 'displacement'
                      ? 'bg-[#F43F5E] text-white font-bold'
                      : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38]'
                  }`}
                >
                  12% BPO/Testing Risk
                </button>
                <button
                  onClick={() => setActiveSegment('low_exp')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeSegment === 'low_exp'
                      ? 'bg-[#94A3B8] text-[#0C1016] font-bold'
                      : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38]'
                  }`}
                >
                  74% Agriculture & Physical
                </button>
              </div>
            </div>

            {/* 100-dot grid */}
            <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38] space-y-3">
              <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 select-none">
                {Array.from({ length: 100 }).map((_, idx) => {
                  let dotType: 'complementary' | 'displacement' | 'low_exp' = 'low_exp';
                  if (idx < 14) dotType = 'complementary';
                  else if (idx < 26) dotType = 'displacement';

                  const isHighlighted = activeSegment === 'all' || activeSegment === dotType;

                  let bgColor = '#1E2633';
                  if (dotType === 'complementary') bgColor = '#10B981';
                  if (dotType === 'displacement') bgColor = '#F43F5E';

                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: bgColor,
                        opacity: isHighlighted ? 1 : 0.2
                      }}
                      title={`Worker #${idx + 1}: ${dotType}`}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm transition-all hover:scale-125 cursor-pointer"
                    />
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] pt-2 border-t border-[#222B38] font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
                  <span>14% High Complementarity (Advanced Engineering & Advisory)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#F43F5E]" />
                  <span>12% Displacement Risk (Routine BPO, Data Labeling)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#1E2633]" />
                  <span>74% Insulated (Physical, Agricultural, Local Trades)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
