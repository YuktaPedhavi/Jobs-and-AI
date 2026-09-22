import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import {
  TrendingUp,
  Scale,
  Users,
  AlertCircle,
  HelpCircle,
  Zap,
  BarChart3,
  Award,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Chapter6Props {
  onOpenEvidence: (id: string) => void;
}

export const Chapter6FasterThenWhat: React.FC<Chapter6Props> = ({ onOpenEvidence }) => {
  const [activeStudy, setActiveStudy] = useState<'bcg' | 'callcenter' | 'denmark'>('bcg');

  return (
    <article
      id="ch06_faster_then_what"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">05</span>
            <span>PRODUCTIVITY & THE SKILL COMPRESSION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EEF2F6] tracking-tight leading-tight">
            AI makes individual tasks faster. Who actually benefits?
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            Every study shows that generative AI accelerates drafting, coding, and support. But the benefits do not distribute evenly across the career ladder. Instead, AI acts as a great equalizer—compressing the skill gap between novice and veteran.
          </p>
        </header>

        {/* The Three Core Questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#161C25] border border-[#222B38] space-y-2">
            <span className="text-xs font-mono uppercase text-[#22D3EE] font-semibold">
              Question 01
            </span>
            <h4 className="text-lg font-serif font-bold text-[#EEF2F6]">
              Faster individual tasks?
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              <strong className="text-[#10B981]">Yes, unequivocally.</strong> Controlled trials show 25% to 55% speedups on discrete drafting, transcription, and programming tasks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#161C25] border border-[#222B38] space-y-2">
            <span className="text-xs font-mono uppercase text-[#F59E0B] font-semibold">
              Question 02
            </span>
            <h4 className="text-lg font-serif font-bold text-[#EEF2F6]">
              More productive companies?
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              <strong className="text-[#F59E0B]">Partially.</strong> Output volume increases, but administrative overhead, compliance review, and verification meetings expand to absorb freed time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#161C25] border border-[#222B38] space-y-2">
            <span className="text-xs font-mono uppercase text-[#F43F5E] font-semibold">
              Question 03
            </span>
            <h4 className="text-lg font-serif font-bold text-[#EEF2F6]">
              Higher worker wages?
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              <strong className="text-[#F43F5E]">Not yet.</strong> NBER nationwide administrative records from Denmark show zero measurable wage premium over two full years of AI adoption.
            </p>
          </div>
        </div>

        {/* Interactive Evidence Explorer */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222B38] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE]">
                Controlled Empirical Field Trials
              </span>
              <h3 className="text-xl font-serif font-bold text-[#EEF2F6] mt-0.5">
                The Skill-Leveling Phenomenon
              </h3>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                onClick={() => setActiveStudy('bcg')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeStudy === 'bcg'
                    ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                    : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38] hover:text-[#EEF2F6]'
                }`}
              >
                Harvard / BCG Trial
              </button>
              <button
                onClick={() => setActiveStudy('callcenter')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeStudy === 'callcenter'
                    ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                    : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38] hover:text-[#EEF2F6]'
                }`}
              >
                Stanford Call Center
              </button>
              <button
                onClick={() => setActiveStudy('denmark')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeStudy === 'denmark'
                    ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                    : 'bg-[#0C1016] text-[#94A3B8] border border-[#222B38] hover:text-[#EEF2F6]'
                }`}
              >
                Denmark NBER Study
              </button>
            </div>
          </div>

          {/* Harvard / BCG Experiment */}
          {activeStudy === 'bcg' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-bold text-[#EEF2F6]">
                    Harvard / BCG Consulting Trial (Dell'Acqua et al.)
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    758 elite management consultants evaluated across 18 realistic knowledge-work tasks.
                  </p>
                </div>
                <EvidenceBadge id="C008" onClick={onOpenEvidence} labelOverride="Harvard/BCG Study" />
              </div>

              {/* The 43% vs 17% visual comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0C1016] border border-[#22D3EE]/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#94A3B8]">Bottom Half Performers</span>
                    <span className="text-[#22D3EE] font-bold">+43% Quality Boost</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-full bg-[#161C25] rounded-full overflow-hidden">
                      <div className="bg-[#22D3EE] h-full rounded-full" style={{ width: '86%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Consultants who scored in the bottom half without AI experienced a massive <strong>43% performance jump</strong> when equipped with GPT-4, instantly elevating their work to near-veteran standards.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#94A3B8]">Top Half Performers</span>
                    <span className="text-[#EEF2F6] font-bold">+17% Quality Boost</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-full bg-[#161C25] rounded-full overflow-hidden">
                      <div className="bg-[#EEF2F6] h-full rounded-full" style={{ width: '34%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Already top-performing consultants also improved (+17%), but benefited far less. The machine provided baseline templates they already knew how to produce.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stanford Call Center Experiment */}
          {activeStudy === 'callcenter' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-bold text-[#EEF2F6]">
                    Brynjolfsson, Li & Raymond: 5,000+ Customer Support Agents
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    Real-time generative AI assistant deployed across customer support teams over one full year.
                  </p>
                </div>
                <EvidenceBadge id="C007" onClick={onOpenEvidence} labelOverride="Stanford Call Center Trial" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0C1016] border border-[#22D3EE]/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#94A3B8]">Newest / Least Skilled Agents</span>
                    <span className="text-[#22D3EE] font-bold">+34% Resolutions / Hr</span>
                  </div>
                  <div className="h-3 w-full bg-[#161C25] rounded-full overflow-hidden">
                    <div className="bg-[#22D3EE] h-full rounded-full" style={{ width: '68%' }} />
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Agents with under 2 months of experience reached the performance curve of 6-month veterans in just two months. AI captured tacit best practices from senior agents and spoon-fed them to beginners.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#94A3B8]">Experienced Senior Agents</span>
                    <span className="text-[#94A3B8] font-bold">~0% Noticeable Gain</span>
                  </div>
                  <div className="h-3 w-full bg-[#161C25] rounded-full overflow-hidden">
                    <div className="bg-[#94A3B8] h-full rounded-full" style={{ width: '4%' }} />
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Top-quintile performers experienced virtually zero productivity gains. In some edge cases, reviewing model suggestions slightly slowed down their natural intuitive problem solving.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Denmark Study */}
          {activeStudy === 'denmark' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-bold text-[#EEF2F6]">
                    NBER Denmark Nationwide Administrative Tax Records
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    Tracking 25,000+ knowledge workers over 24 months to measure actual wage and hour impacts.
                  </p>
                </div>
                <EvidenceBadge id="C011" onClick={onOpenEvidence} labelOverride="NBER Denmark Study" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-2">
                  <span className="text-xs font-mono text-[#F43F5E] uppercase font-semibold">
                    Measurable Wage Impact
                  </span>
                  <div className="text-3xl font-mono font-bold text-[#EEF2F6]">0.0%</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Workers who adopted AI tools did not receive wage increases relative to non-adopting peers in the same job codes. Speed gains were absorbed into firm operations.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-2">
                  <span className="text-xs font-mono text-[#F59E0B] uppercase font-semibold">
                    Workweek Hours Impact
                  </span>
                  <div className="text-3xl font-mono font-bold text-[#EEF2F6]">0.0 hrs</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Total hours worked per week remained identical (40.2 vs 40.1 hrs). Time saved drafting was consumed by increased output quotas and asynchronous messaging.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* The Provocative Closing Question */}
          <div className="p-6 rounded-2xl bg-[#0C1016] border border-[#22D3EE]/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>The Editorial Takeaway</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#EEF2F6] leading-snug">
              “If AI makes average workers perform like good workers, what makes a worker truly exceptional now?”
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              When baseline competence becomes a commodity provided by software for $20 a month, the premium shifts entirely to edge-case judgement, taste, trust, and the courage to take responsibility.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
