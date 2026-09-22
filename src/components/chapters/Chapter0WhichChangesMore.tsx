import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Sparkles, ArrowRight, ArrowDown, Check, HelpCircle, Shuffle } from 'lucide-react';
import { Occupation271, occupations271 } from '../../data/occupations271';

interface Chapter0Props {
  onOpenEvidence: (id: string) => void;
  onSelectOccupation: (occ: Occupation271) => void;
  onContinue?: () => void;
}

interface ChoiceItem {
  title: string;
  socCode: string;
  category: string;
  exposure: number;
  growth: number;
  wage: number;
  aiTouches: string;
  humanValue: string;
}

interface CuriosityPair {
  jobA: ChoiceItem;
  jobB: ChoiceItem;
  curiosityPrompt: string;
  editorialInsight: string;
  evidenceId: string;
}

const CURIOSITY_PAIRS: CuriosityPair[] = [
  {
    jobA: {
      title: 'Graphic Designer',
      socCode: '27-1024',
      category: 'Arts & Design',
      exposure: 0.411,
      growth: 2.0,
      wage: 61300,
      aiTouches: 'Layout drafts, asset variations, background fills',
      humanValue: 'Creative direction, visual taste, cultural context'
    },
    jobB: {
      title: 'Accountant',
      socCode: '13-2011',
      category: 'Business & Financial',
      exposure: 0.672,
      growth: 4.0,
      wage: 79880,
      aiTouches: 'Ledger reconciliation, tax form synthesis, audit sampling',
      humanValue: 'Fiduciary sign-off, tax strategy, client advisory'
    },
    curiosityPrompt: 'Creative vs Analytical',
    editorialInsight:
      'Many assume AI hits visual designers harder than numbers-driven accountants. In reality, accounting tasks are more structured and rule-bound (67% exposure vs 41%). Yet both occupations have positive expected job growth. AI changes the daily workflow—it does not simply eliminate the profession.',
    evidenceId: 'C001'
  },
  {
    jobA: {
      title: 'Software Developer',
      socCode: '15-1252',
      category: 'Computer & Mathematical',
      exposure: 0.61,
      growth: 17.0,
      wage: 130160,
      aiTouches: 'Code autocompletion, test boilerplates, bug triage',
      humanValue: 'System architecture, trade-offs, production reliability'
    },
    jobB: {
      title: 'High School Teacher',
      socCode: '25-2031',
      category: 'Education',
      exposure: 0.341,
      growth: -2.0,
      wage: 64580,
      aiTouches: 'Lesson plan variations, quiz questions, rubric drafts',
      humanValue: 'Classroom relationships, emotional presence, pastoral care'
    },
    curiosityPrompt: 'High Tech vs Human Care',
    editorialInsight:
      'Software developers face massive AI exposure (61%), yet their projected 10-year job growth is +17% as cheaper code expands software demand. Meanwhile teaching has lower exposure (34%) but projected contraction (-2%) driven by demographic student enrollments.',
    evidenceId: 'C002'
  },
  {
    jobA: {
      title: 'Customer Support Agent',
      socCode: '43-4051',
      category: 'Office & Admin',
      exposure: 0.705,
      growth: -5.0,
      wage: 42830,
      aiTouches: 'Knowledge base retrieval, auto-reply suggestions',
      humanValue: 'Handling complex crises, angry customer de-escalation'
    },
    jobB: {
      title: 'Financial Advisor',
      socCode: '13-2052',
      category: 'Finance',
      exposure: 0.671,
      growth: 10.0,
      wage: 102140,
      aiTouches: 'Portfolio simulations, market summary briefings',
      humanValue: 'Personal empathy during market panics, life-transition trust'
    },
    curiosityPrompt: 'Routine Service vs Fiduciary Trust',
    editorialInsight:
      'Both roles share high AI task overlap (~67–71%). But customer support is projected to decline (-5%) while personal financial advising expands (+10%). Why? Trust, liability, and personal relationships command an increasing premium when routine information is commoditized.',
    evidenceId: 'C003'
  }
];

export const Chapter0WhichChangesMore: React.FC<Chapter0Props> = ({
  onOpenEvidence,
  onSelectOccupation,
  onContinue
}) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [chosenSide, setChosenSide] = useState<'A' | 'B' | null>(null);

  const pair = CURIOSITY_PAIRS[selectedPairIndex];

  const handleChoose = (side: 'A' | 'B') => {
    setChosenSide(side);
    const chosenJob = side === 'A' ? pair.jobA : pair.jobB;
    const occ = occupations271.find((o) => o.soc_code === chosenJob.socCode);
    if (occ) onSelectOccupation(occ);
  };

  const handleCyclePair = () => {
    setSelectedPairIndex((prev) => (prev + 1) % CURIOSITY_PAIRS.length);
    setChosenSide(null);
  };

  return (
    <article
      id="ch00_which_changes"
      className="scroll-mt-12 min-h-[90vh] flex flex-col justify-center py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-12">
        {/* Minimal Hero Header matching prompt verbatim */}
        <header className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span>HOW AI IS CHANGING WORK · 271 OCCUPATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-[#EEF2F6] leading-[1.04]">
            THE NEW VALUE OF WORK
          </h1>

          <p className="text-xl sm:text-2xl font-serif text-[#94A3B8] font-normal max-w-2xl leading-relaxed">
            AI is changing work. But not every job in the same way.
          </p>
        </header>

        {/* The Core Question & Interactive Test */}
        <div className="space-y-6 pt-4 border-t border-[#1E2633]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] font-semibold">
                Will AI actually replace jobs?
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6] mt-1">
                Which job do you think AI affects more?
              </h2>
            </div>

            <button
              onClick={handleCyclePair}
              className="px-3 py-1.5 rounded-lg bg-[#161C25] hover:bg-[#1C2430] border border-[#222B38] text-xs font-mono text-[#94A3B8] hover:text-[#EEF2F6] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Try another pair ({selectedPairIndex + 1}/{CURIOSITY_PAIRS.length})</span>
            </button>
          </div>

          {/* Two Large Occupation Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Job A Option */}
            <button
              onClick={() => handleChoose('A')}
              className={`p-6 sm:p-8 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                chosenSide === 'A'
                  ? 'bg-[#161C25] border-[#22D3EE] ring-2 ring-[#22D3EE]/30 shadow-2xl scale-[1.01]'
                  : chosenSide === 'B'
                  ? 'bg-[#161C25]/50 border-[#1E2633] opacity-60'
                  : 'bg-[#161C25] border-[#222B38] hover:border-[#22D3EE]/60 hover:bg-[#1A222E]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>{pair.jobA.category}</span>
                  {chosenSide === 'A' && (
                    <span className="flex items-center gap-1 text-[#22D3EE] font-bold">
                      <Check className="w-4 h-4" /> Your choice
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6] group-hover:text-[#22D3EE] transition-colors">
                  {pair.jobA.title}
                </h3>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Focus: {pair.jobA.aiTouches}
                </p>

                {/* Revealed Data on Click */}
                {chosenSide && (
                  <div className="pt-4 border-t border-[#222B38] space-y-3 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                        <span className="text-[10px] text-[#94A3B8] block">AI affects:</span>
                        <span className="text-xl font-bold text-[#22D3EE]">
                          {(pair.jobA.exposure * 100).toFixed(0)}%
                        </span>
                        <span className="text-[9px] text-[#94A3B8] block">of work tasks</span>
                      </div>
                      <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                        <span className="text-[10px] text-[#94A3B8] block">Expected growth:</span>
                        <span
                          className={`text-xl font-bold ${
                            pair.jobA.growth >= 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                          }`}
                        >
                          {pair.jobA.growth > 0 ? '+' : ''}
                          {pair.jobA.growth}%
                        </span>
                        <span className="text-[9px] text-[#94A3B8] block">U.S. 2024–34</span>
                      </div>
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                      <strong className="text-[#EEF2F6] block font-sans">Human core:</strong>
                      <span>{pair.jobA.humanValue}</span>
                    </div>
                  </div>
                )}
              </div>
            </button>

            {/* Job B Option */}
            <button
              onClick={() => handleChoose('B')}
              className={`p-6 sm:p-8 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                chosenSide === 'B'
                  ? 'bg-[#161C25] border-[#22D3EE] ring-2 ring-[#22D3EE]/30 shadow-2xl scale-[1.01]'
                  : chosenSide === 'A'
                  ? 'bg-[#161C25]/50 border-[#1E2633] opacity-60'
                  : 'bg-[#161C25] border-[#222B38] hover:border-[#22D3EE]/60 hover:bg-[#1A222E]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>{pair.jobB.category}</span>
                  {chosenSide === 'B' && (
                    <span className="flex items-center gap-1 text-[#22D3EE] font-bold">
                      <Check className="w-4 h-4" /> Your choice
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6] group-hover:text-[#22D3EE] transition-colors">
                  {pair.jobB.title}
                </h3>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Focus: {pair.jobB.aiTouches}
                </p>

                {/* Revealed Data on Click */}
                {chosenSide && (
                  <div className="pt-4 border-t border-[#222B38] space-y-3 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                        <span className="text-[10px] text-[#94A3B8] block">AI affects:</span>
                        <span className="text-xl font-bold text-[#22D3EE]">
                          {(pair.jobB.exposure * 100).toFixed(0)}%
                        </span>
                        <span className="text-[9px] text-[#94A3B8] block">of work tasks</span>
                      </div>
                      <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                        <span className="text-[10px] text-[#94A3B8] block">Expected growth:</span>
                        <span
                          className={`text-xl font-bold ${
                            pair.jobB.growth >= 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                          }`}
                        >
                          {pair.jobB.growth > 0 ? '+' : ''}
                          {pair.jobB.growth}%
                        </span>
                        <span className="text-[9px] text-[#94A3B8] block">U.S. 2024–34</span>
                      </div>
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                      <strong className="text-[#EEF2F6] block font-sans">Human core:</strong>
                      <span>{pair.jobB.humanValue}</span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Prompt to click if not chosen yet */}
          {!chosenSide && (
            <p className="text-xs font-mono text-[#94A3B8] text-center sm:text-left flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
              Tap either profession to reveal how AI touches both
            </p>
          )}

          {/* Curiosity Payoff / Editorial Insight when revealed */}
          {chosenSide && (
            <div className="p-6 bg-[#161C25] rounded-2xl border border-[#22D3EE]/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider font-semibold">
                  Key Finding · {pair.curiosityPrompt}
                </span>
                <EvidenceBadge id={pair.evidenceId} onClick={onOpenEvidence} labelOverride="BLS · Felten et al. Data" />
              </div>

              <p className="text-sm sm:text-base font-serif text-[#EEF2F6] leading-relaxed">
                {pair.editorialInsight}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#94A3B8] font-mono">
                  This comparison is not a test score—it demonstrates that exposure ≠ replacement.
                </span>

                <button
                  onClick={onContinue}
                  className="px-5 py-2.5 rounded-xl bg-[#22D3EE] text-[#0C1016] text-xs font-mono font-bold hover:bg-[#38BDF8] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>See all 271 occupations</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
