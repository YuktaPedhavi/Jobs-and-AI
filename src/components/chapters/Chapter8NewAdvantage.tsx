import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { useTheme } from '../../context/ThemeContext';
import {
  TrendingDown,
  TrendingUp,
  Compass,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Scale
} from 'lucide-react';

interface Chapter8Props {
  onOpenEvidence: (id: string) => void;
  embedded?: boolean;
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
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    description: string;
    whyScarce: string;
    workplaceTest: string;
  };
}

const VALUE_SHIFTS: ValueShiftPair[] = [
  {
    id: 'framing',
    lessValuable: {
      title: 'Formulaic drafting',
      description: 'Writing generic memos, templated emails, and introductory paragraphs.',
      reason: 'Language models generate fluent boilerplate in seconds.'
    },
    moreValuable: {
      title: 'Framing the right question',
      icon: Compass,
      description: 'Breaking ambiguous, real-world problems into clear, testable questions.',
      whyScarce: 'Models need clear direction and context before they can assist effectively.',
      workplaceTest: 'A strategy analyst translating an unclear market goal into five testable hypotheses.'
    }
  },
  {
    id: 'taste',
    lessValuable: {
      title: 'Generating raw variations',
      description: 'Producing dozens of routine layout options, color palettes, or copy drafts.',
      reason: 'Software makes producing surface variations fast and inexpensive.'
    },
    moreValuable: {
      title: 'Taste & selection',
      icon: Eye,
      description: 'Knowing what to discard and choosing the solution that genuinely fits the audience.',
      whyScarce: 'When options are plentiful, judgement and editing become the differentiator.',
      workplaceTest: 'A creative director discarding 49 drafts to refine the single concept that fits the brand.'
    }
  },
  {
    id: 'verification',
    lessValuable: {
      title: 'Accepting plausible outputs',
      description: 'Passing along fluent text or generated code without checking accuracy.',
      reason: 'Unchecked errors and fabricated citations create real workplace risk.'
    },
    moreValuable: {
      title: 'Verification & auditing',
      icon: ShieldCheck,
      description: 'Treating AI output as a first draft and verifying claims, edge cases, and sources.',
      whyScarce: 'Generating plausible claims is cheap; confirming truth takes domain rigor.',
      workplaceTest: 'A legal assistant checking every statute in an AI draft against current law.'
    }
  },
  {
    id: 'context',
    lessValuable: {
      title: 'Reciting static rules',
      description: 'Memorizing textbook definitions and standard procedural checklists.',
      reason: 'Search and retrieval tools surface standard reference material immediately.'
    },
    moreValuable: {
      title: 'Deep domain context',
      icon: CheckCircle2,
      description: 'Applying local institutional knowledge, unwritten constraints, and edge-case awareness.',
      whyScarce: 'Systems lack lived workplace context and real-world physical experience.',
      workplaceTest: 'A plant engineer spotting that an unusual sensor spike is caused by local humidity.'
    }
  },
  {
    id: 'relationships',
    lessValuable: {
      title: 'Routine status replies',
      description: 'Answering common FAQs and sending scripted status notifications.',
      reason: 'Automated support resolves repetitive baseline queries at low cost.'
    },
    moreValuable: {
      title: 'Trust & communication',
      icon: Heart,
      description: 'Reading emotional nuance, calming conflicts, and earning lasting stakeholder trust.',
      whyScarce: 'Scripted politeness cannot replace accountable human empathy in sensitive moments.',
      workplaceTest: 'An advisor guiding a worried family through difficult financial decisions.'
    }
  },
  {
    id: 'responsibility',
    lessValuable: {
      title: 'Drafting without sign-off',
      description: 'Producing intermediate materials with no responsibility for the final outcome.',
      reason: 'Software cannot hold professional licenses or legal accountability.'
    },
    moreValuable: {
      title: 'Ethical & legal accountability',
      icon: Scale,
      description: 'Standing behind high-stakes decisions with professional duty and judgement.',
      whyScarce: 'Organizations and regulators still require accountable human decision-makers.',
      workplaceTest: 'A clinician reviewing diagnostic support tools and owning the care plan.'
    }
  }
];

export const Chapter8NewAdvantage: React.FC<Chapter8Props> = ({
  onOpenEvidence,
  embedded = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedShiftId, setSelectedShiftId] = useState<string>('framing');

  const activeShift =
    VALUE_SHIFTS.find((s) => s.id === selectedShiftId) || VALUE_SHIFTS[0];
  const IconComponent = activeShift.moreValuable.icon;

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    amber: isDark ? '#f59e0b' : '#b45309',
    coral: isDark ? '#fb7185' : '#e11d48',
    lime: isDark ? '#d7e63b' : '#5c6800'
  };

  const innerContent = (
    <div className={embedded ? 'space-y-6' : 'max-w-5xl mx-auto px-4 sm:px-6 space-y-8'}>
      {/* Section Header */}
      <div
        className={`flex flex-col md:flex-row md:items-end justify-between gap-4 ${
          embedded ? 'pt-6 border-t' : ''
        }`}
        style={embedded ? { borderColor: palette.border } : undefined}
      >
        <div className="space-y-1.5 max-w-2xl">
          <span
            className="text-xs font-mono uppercase tracking-widest block"
            style={{ color: palette.cyan }}
          >
            The Value Shift — Skills to Develop
          </span>
          <h3
            className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            When drafting gets cheaper, human judgement stands out.
          </h3>
          <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
            World Economic Forum survey estimates suggest{' '}
            <strong className="font-semibold" style={{ color: palette.textMain }}>
              59 out of 100 workers
            </strong>{' '}
            will need retraining by 2030. Select a capability below to see how value shifts from routine execution to human judgement.
          </p>
        </div>

        <div className="shrink-0">
          <EvidenceBadge
            id="C016"
            onClick={onOpenEvidence}
            labelOverride="C016 · WEF 2025 (59/100)"
          />
        </div>
      </div>

      {/* Interactive 6-Shift Explorer */}
      <div
        className="rounded-2xl border p-5 sm:p-7 space-y-6"
        style={{
          backgroundColor: palette.surfaceBg,
          borderColor: palette.border
        }}
      >
        {/* Selectable Skill Chips */}
        <div
          role="tablist"
          aria-label="Human skills gaining value"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {VALUE_SHIFTS.map((shift) => {
            const isSelected = selectedShiftId === shift.id;
            const SIcon = shift.moreValuable.icon;
            return (
              <button
                key={shift.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedShiftId(shift.id)}
                className="p-3 min-h-[76px] rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: isSelected
                    ? palette.surfaceSubtle
                    : palette.surfaceBg,
                  borderColor: isSelected ? palette.cyan : palette.border,
                  boxShadow: isSelected ? `0 0 0 1px ${palette.cyan}` : 'none'
                }}
              >
                <SIcon
                  className="w-4 h-4 shrink-0"
                  style={{ color: isSelected ? palette.cyan : palette.textMuted }}
                />
                <span
                  className="font-sans font-semibold text-xs leading-snug block"
                  style={{ color: palette.textMain }}
                >
                  {shift.moreValuable.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Becoming Routine */}
          <div
            className="p-5 rounded-xl border space-y-3"
            style={{
              backgroundColor: palette.surfaceSubtle,
              borderColor: palette.border
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                style={{ color: palette.coral }}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                <span>More Routine</span>
              </span>
              <span className="text-[11px] font-mono" style={{ color: palette.textMuted }}>
                Easier to automate
              </span>
            </div>

            <div
              className="text-base sm:text-lg font-sans font-semibold"
              style={{ color: palette.textMain }}
            >
              {activeShift.lessValuable.title}
            </div>

            <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
              {activeShift.lessValuable.description}
            </p>

            <div
              className="pt-3 border-t text-xs font-sans"
              style={{ borderColor: palette.border, color: palette.textMuted }}
            >
              <strong style={{ color: palette.textMain }}>Why it shifts: </strong>
              {activeShift.lessValuable.reason}
            </div>
          </div>

          {/* Gaining Human Value */}
          <div
            className="p-5 rounded-xl border space-y-3"
            style={{
              backgroundColor: palette.surfaceSubtle,
              borderColor: palette.cyan
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                style={{ color: palette.cyan }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Gaining Human Value</span>
              </span>
              <span className="text-[11px] font-mono" style={{ color: palette.cyan }}>
                Harder to replace
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <IconComponent
                className="w-4 h-4 shrink-0"
                style={{ color: palette.cyan }}
              />
              <div
                className="text-base sm:text-lg font-sans font-semibold"
                style={{ color: palette.textMain }}
              >
                {activeShift.moreValuable.title}
              </div>
            </div>

            <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMain }}>
              {activeShift.moreValuable.description}
            </p>

            <div
              className="pt-3 border-t text-xs font-sans space-y-1.5"
              style={{ borderColor: palette.border, color: palette.textMuted }}
            >
              <div>
                <strong style={{ color: palette.cyan }}>In practice: </strong>
                {activeShift.moreValuable.workplaceTest}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <article
      id="ch06_careers_skills_value"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      {innerContent}
    </article>
  );
};
