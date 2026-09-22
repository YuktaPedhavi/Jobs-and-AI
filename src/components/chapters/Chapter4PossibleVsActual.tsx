import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Layers, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Zap, TrendingUp } from 'lucide-react';

interface Chapter4Props {
  onOpenEvidence: (id: string) => void;
}

export const Chapter4PossibleVsActual: React.FC<Chapter4Props> = ({ onOpenEvidence }) => {
  const [activeTab, setActiveTab] = useState<'anthropic' | 'microsoft' | 'ilo'>('anthropic');

  return (
    <article
      id="ch04_possible_actual"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">04</span>
            <span>POSSIBLE ≠ ACTUAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#EEF2F6] tracking-tight leading-tight">
            What an AI model can do in a test benchmark is rarely what happens in an office.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            Theoretical exposure calculations assume frictionless deployment. But real-world data from the International Labour Organization, Anthropic, and Microsoft show a massive gap between technical capability and everyday adoption.
          </p>
        </header>

        {/* Reality Gap Comparison Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Laboratory Benchmark */}
          <div className="p-6 rounded-2xl bg-[#161C25] border border-[#222B38] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#94A3B8] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
              <span>Benchmark Potential (Laboratory)</span>
            </div>
            <h3 className="text-xl font-display font-extrabold tracking-tight text-[#EEF2F6]">
              80% of workers could see ≥10% tasks affected
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              OpenAI / UPenn benchmark study: 19% of US workers have at least 50% of their daily job duties theoretically touched by LLMs at current capability levels.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] flex justify-between items-center text-[#94A3B8]">
                <span>Theoretical task automation</span>
                <span className="font-bold text-[#EEF2F6]">High</span>
              </div>
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] flex justify-between items-center text-[#94A3B8]">
                <span>Assumed deployment friction</span>
                <span className="font-bold text-[#EEF2F6]">Zero</span>
              </div>
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] flex justify-between items-center text-[#94A3B8]">
                <span>Legal & HIPAA constraints</span>
                <span className="font-bold text-[#EEF2F6]">Ignored</span>
              </div>
            </div>
          </div>

          {/* Right: Observed Workplace Reality */}
          <div className="p-6 rounded-2xl bg-[#161C25] border border-[#22D3EE]/30 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#22D3EE] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" />
              <span>Observed Workplace Use (Empirical)</span>
            </div>
            <h3 className="text-xl font-display font-extrabold tracking-tight text-[#EEF2F6]">
              Real adoption is selective, cautious, and collaborative
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Global telemetry demonstrates that AI is primarily deployed to assist human workers with drafted summaries and code boilerplates, rather than wholesale role replacement.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] flex justify-between items-center text-[#94A3B8]">
                <span>Global workers in highest exposure tier</span>
                <span className="font-bold text-[#22D3EE]">3.3% (ILO)</span>
              </div>
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] flex justify-between items-center text-[#94A3B8]">
                <span>Enterprise usage: Augment vs Automate</span>
                <span className="font-bold text-[#22D3EE]">57% vs 43%</span>
              </div>
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38] flex justify-between items-center text-[#94A3B8]">
                <span>Friction: compliance, liability, training</span>
                <span className="font-bold text-[#22D3EE]">Substantial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Three-Study Telemetry Switcher */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222B38] pb-4">
            <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
              Explore Empirical Workplace Telemetry:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('anthropic')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'anthropic'
                    ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                    : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38] hover:text-[#EEF2F6]'
                }`}
              >
                Anthropic Index
              </button>
              <button
                onClick={() => setActiveTab('microsoft')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'microsoft'
                    ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                    : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38] hover:text-[#EEF2F6]'
                }`}
              >
                Microsoft Copilot
              </button>
              <button
                onClick={() => setActiveTab('ilo')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'ilo'
                    ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                    : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38] hover:text-[#EEF2F6]'
                }`}
              >
                ILO 2025 Global
              </button>
            </div>
          </div>

          {/* Anthropic Tab Content */}
          {activeTab === 'anthropic' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#EEF2F6]">
                  Anthropic Economic Index: 36% of occupations show active task use
                </h4>
                <EvidenceBadge id="C004" onClick={onOpenEvidence} labelOverride="Anthropic · Economic Index" />
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Analyzing real enterprise conversations with Claude across occupations reveals that in 36% of SOC occupations, the model is actively invoked for ≥25% of core work tasks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[#EEF2F6]">Augmentation (Co-Working)</span>
                    <span className="font-bold text-[#22D3EE]">57%</span>
                  </div>
                  <div className="w-full bg-[#161C25] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#22D3EE] h-full rounded-full" style={{ width: '57%' }} />
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Human worker reviews, directs, iteratively refines, and retains final output ownership.
                  </p>
                </div>
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[#EEF2F6]">Automation (Batch Execution)</span>
                    <span className="font-bold text-[#94A3B8]">43%</span>
                  </div>
                  <div className="w-full bg-[#161C25] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#94A3B8] h-full rounded-full" style={{ width: '43%' }} />
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Standalone translation, syntactic linting, formula generation without manual sentence-by-sentence oversight.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Microsoft Tab Content */}
          {activeTab === 'microsoft' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#EEF2F6]">
                  Microsoft Copilot: 200,000 Real Enterprise Work Interactions
                </h4>
                <EvidenceBadge id="C005" onClick={onOpenEvidence} labelOverride="Microsoft · 200k Copilot Interactions" />
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Empirical evaluation of 200k enterprise Copilot sessions shows how workers actually invoke assistants during their work hours:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-2xl font-serif font-bold text-[#22D3EE] block font-mono">42%</span>
                  <span className="text-xs font-bold text-[#EEF2F6] block mt-1">Information Gathering</span>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Searching corporate intranet, summarizing meetings, extracting dates and action items.
                  </p>
                </div>
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-2xl font-serif font-bold text-[#22D3EE] block font-mono">34%</span>
                  <span className="text-xs font-bold text-[#EEF2F6] block mt-1">Writing & Drafting</span>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Drafting email replies, memos, documentation outlines, and polishing client phrasing.
                  </p>
                </div>
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-2xl font-serif font-bold text-[#22D3EE] block font-mono">24%</span>
                  <span className="text-xs font-bold text-[#EEF2F6] block mt-1">Advising & Ideation</span>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Brainstorming project risks, formula syntax, structure suggestions, and code review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ILO Tab Content */}
          {activeTab === 'ilo' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold tracking-tight text-lg text-[#EEF2F6]">
                  ILO 2025 Global Synthesis: The 25% vs 3.3% Discrepancy
                </h4>
                <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="ILO · Global Study" />
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                The International Labour Organization analyzed employment across 140+ countries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-3xl font-mono font-bold text-[#22D3EE] block">25% vs 3.3%</span>
                  <span className="text-xs font-bold text-[#EEF2F6] block mt-1">Global Exposure vs Replacement Risk</span>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    While 25% of global jobs feature some exposure, only 3.3% exist in the highest tier where entire roles are at imminent risk of wholesale substitution.
                  </p>
                </div>
                <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-3xl font-mono font-bold text-[#F59E0B] block">34% vs 11%</span>
                  <span className="text-xs font-bold text-[#EEF2F6] block mt-1">High-Income vs Low-Income Divide</span>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    High-income economies possess far higher exposure (34%) due to knowledge work concentration, compared to low-income economies (11%) where physical labor dominates.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
