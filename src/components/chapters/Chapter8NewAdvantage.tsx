import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import {
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Compass,
  Eye,
  Heart,
  Scale
} from 'lucide-react';

interface Chapter8Props {
  onOpenEvidence: (id: string) => void;
}

interface ValueShiftPair {
  id: string;
  lessValuable: {
    title: string;
    description: string;
    reason: string;
  };
  moreValuable: {
    title: string;
    icon: any;
    description: string;
    whyScarce: string;
    workplaceTest: string;
  };
}

const VALUE_SHIFTS: ValueShiftPair[] = [
  {
    id: 'framing',
    lessValuable: {
      title: 'Formulaic drafting & answers',
      description: 'Writing generic memos, templated emails, and introductory paragraphs.',
      reason: 'LLMs generate infinite fluent prose in under two seconds.'
    },
    moreValuable: {
      title: 'Framing the right question',
      icon: Compass,
      description: 'Decomposing ambiguous, messy real-world challenges into solvable problem statements.',
      whyScarce: 'Models cannot invent direction; they require sharp, context-aware prompt steering.',
      workplaceTest: 'A strategy analyst framing a complex market expansion into five crisp, testable hypotheses.'
    }
  },
  {
    id: 'taste',
    lessValuable: {
      title: 'Generating 50 raw variations',
      description: 'Churning out dozens of layout options, color swatches, or copywriting drafts.',
      reason: 'Generative models make surface variations free and infinite.'
    },
    moreValuable: {
      title: 'Discerning taste & selection',
      icon: Eye,
      description: 'Knowing what to discard and having the cultural discernment to choose the one right solution.',
      whyScarce: 'When generation is free, editing and curated taste become the sole differentiator.',
      workplaceTest: 'A creative director rejecting 49 AI logo iterations to back the single metaphor that resonates with the brand.'
    }
  },
  {
    id: 'verification',
    lessValuable: {
      title: 'Trusting plausible syntax',
      description: 'Assuming fluent text or generated code is factual without auditing.',
      reason: 'Hallucinations and subtle bugs fool generalists and introduce enterprise risk.'
    },
    moreValuable: {
      title: 'Real-world verification & audits',
      icon: ShieldCheck,
      description: 'Treating unverified AI outputs as an ungrounded liability and rigorously fact-checking citations.',
      whyScarce: 'Generating plausible claims costs pennies; validating their truth requires deep rigor.',
      workplaceTest: 'A paralegal cross-checking every statute cited in an AI draft to confirm it is currently valid law.'
    }
  },
  {
    id: 'context',
    lessValuable: {
      title: 'Memorizing static rules',
      description: 'Reciting textbook definitions and standardized procedural checklists.',
      reason: 'Retrieval systems access any documentation or manual instantaneously.'
    },
    moreValuable: {
      title: 'Deep domain context & nuance',
      icon: CheckCircle2,
      description: 'Understanding tacit institutional knowledge, unwritten politics, and edge cases.',
      whyScarce: 'Models lack the physical experience and private corporate history behind decisions.',
      workplaceTest: 'A plant engineer recognizing that an anomalous sensor reading is caused by local humidity, not engine failure.'
    }
  },
  {
    id: 'relationships',
    lessValuable: {
      title: 'Routine customer responses',
      description: 'Answering common FAQs and sending scripted status notifications.',
      reason: 'Chatbots resolve baseline repetitive queries 24/7 at negligible cost.'
    },
    moreValuable: {
      title: 'Communication & human trust',
      icon: Heart,
      description: 'Reading emotional temperature, calming high-stakes conflicts, and building mutual trust.',
      whyScarce: 'Synthesized politeness cannot replace authentic human presence in vulnerable moments.',
      workplaceTest: 'A wealth advisor guiding an anxious family through estate planning during a personal medical crisis.'
    }
  },
  {
    id: 'responsibility',
    lessValuable: {
      title: 'Executing without liability',
      description: 'Producing intermediate work products without personal skin in the game.',
      reason: 'Software cannot be held legally or morally liable when systems fail.'
    },
    moreValuable: {
      title: 'Ethical & legal responsibility',
      icon: Scale,
      description: 'Standing behind the decision with professional license, fiduciary duty, and reputation.',
      whyScarce: 'Algorithms cannot go to court, lose their medical license, or accept fiduciary blame.',
      workplaceTest: 'A chief medical officer signing off on diagnostic protocol with personal legal accountability.'
    }
  }
];

export const Chapter8NewAdvantage: React.FC<Chapter8Props> = ({ onOpenEvidence }) => {
  const [selectedShiftId, setSelectedShiftId] = useState<string>('framing');

  const activeShift = VALUE_SHIFTS.find((s) => s.id === selectedShiftId) || VALUE_SHIFTS[0];
  const IconComponent = activeShift.moreValuable.icon;

  return (
    <article
      id="ch08_new_advantage"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">05</span>
            <span>WHAT BECOMES MORE VALUABLE?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EEF2F6] tracking-tight leading-tight">
            When drafting is cheap, judgement becomes the prize.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            The World Economic Forum finds that <strong className="text-[#EEF2F6] font-semibold">59 out of 100 workers</strong> will need upskilling by 2030. As routine execution commoditizes, value shifts decisively from doing the mechanics to framing, verifying, and taking responsibility.
          </p>
        </header>

        {/* WEF Macro Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 bg-[#161C25] rounded-xl border border-[#222B38]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">Retraining Demand</span>
            <span className="text-2xl font-bold text-[#22D3EE] mt-1 block">59 / 100</span>
            <span className="text-[11px] text-[#94A3B8]">workers require retraining before 2030 (WEF 2025)</span>
          </div>

          <div className="p-4 bg-[#161C25] rounded-xl border border-[#222B38]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">Talent Bottleneck</span>
            <span className="text-2xl font-bold text-[#F59E0B] mt-1 block">63%</span>
            <span className="text-[11px] text-[#94A3B8]">of employers report skill mismatch as primary barrier</span>
          </div>

          <div className="p-4 bg-[#161C25] rounded-xl border border-[#222B38]">
            <span className="text-[10px] text-[#94A3B8] uppercase block">Enterprise Response</span>
            <span className="text-2xl font-bold text-[#10B981] mt-1 block">77%</span>
            <span className="text-[11px] text-[#94A3B8]">of firms investing heavily in internal upskilling</span>
          </div>
        </div>

        {/* Clear Before / After Comparison Interactive Layout */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222B38] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE]">
                The Value Inversion
              </span>
              <h3 className="text-xl font-serif font-bold text-[#EEF2F6] mt-0.5">
                The 6 Essential Human Shifts
              </h3>
            </div>
            <EvidenceBadge id="C016" onClick={onOpenEvidence} labelOverride="WEF 2025 · Skills Outlook" />
          </div>

          {/* Interactive Shift Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {VALUE_SHIFTS.map((shift) => {
              const isSelected = selectedShiftId === shift.id;
              const SIcon = shift.moreValuable.icon;
              return (
                <button
                  key={shift.id}
                  onClick={() => setSelectedShiftId(shift.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                    isSelected
                      ? 'bg-[#22D3EE]/10 border-[#22D3EE] ring-2 ring-[#22D3EE]/30'
                      : 'bg-[#0C1016] border-[#222B38] hover:border-[#38BDF8] hover:bg-[#1A222E]'
                  }`}
                >
                  <SIcon className={`w-4 h-4 ${isSelected ? 'text-[#22D3EE]' : 'text-[#94A3B8]'}`} />
                  <span className="font-serif font-bold text-xs text-[#EEF2F6] leading-tight">
                    {shift.moreValuable.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Before / After Deep Dive Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* What Becomes LESS Valuable */}
            <div className="p-6 rounded-xl bg-[#0C1016] border border-[#F43F5E]/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#F43F5E] flex items-center gap-1.5 font-bold">
                  <TrendingDown className="w-4 h-4" /> What Becomes Less Valuable
                </span>
                <span className="text-[10px] font-mono text-[#94A3B8]">Commoditized by AI</span>
              </div>

              <h4 className="text-xl font-serif font-bold text-[#EEF2F6]">
                {activeShift.lessValuable.title}
              </h4>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {activeShift.lessValuable.description}
              </p>

              <div className="p-3 bg-[#161C25] rounded-lg border border-[#222B38] text-xs text-[#94A3B8]">
                <strong className="text-[#EEF2F6] block mb-0.5 font-sans">Why value declines:</strong>
                <span>{activeShift.lessValuable.reason}</span>
              </div>
            </div>

            {/* What Becomes MORE Valuable */}
            <div className="p-6 rounded-xl bg-[#0C1016] border border-[#22D3EE]/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#22D3EE] flex items-center gap-1.5 font-bold">
                  <TrendingUp className="w-4 h-4" /> What Becomes More Valuable
                </span>
                <span className="text-[10px] font-mono text-[#22D3EE] font-semibold">Gains Scarcity Premium</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#161C25] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h4 className="text-xl font-serif font-bold text-[#EEF2F6]">
                  {activeShift.moreValuable.title}
                </h4>
              </div>

              <p className="text-sm text-[#EEF2F6] leading-relaxed">
                {activeShift.moreValuable.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#161C25] rounded-lg border border-[#222B38] text-[#94A3B8]">
                  <strong className="text-[#22D3EE] block mb-0.5 font-sans">Why it becomes scarce:</strong>
                  <span>{activeShift.moreValuable.whyScarce}</span>
                </div>

                <div className="p-3 bg-[#161C25] rounded-lg border border-[#222B38] text-[#94A3B8]">
                  <strong className="text-[#EEF2F6] block mb-0.5 font-sans">Everyday workplace test:</strong>
                  <span>{activeShift.moreValuable.workplaceTest}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
