import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { useTheme } from '../../context/ThemeContext';
import { BookOpen } from 'lucide-react';

interface Chapter5Props {
  onOpenEvidence: (id: string) => void;
  embedded?: boolean;
}

type ProfessionId = 'teacher' | 'doctor' | 'designer' | 'support';
type ActivityType = 'ai_assisted' | 'human_led';

interface WorkdayActivity {
  step: number;
  title: string;
  type: ActivityType;
  pictogram:
    | 'lesson_sheet'
    | 'classroom_dialogue'
    | 'assessment_draft'
    | 'student_support'
    | 'clinical_notes'
    | 'patient_exam'
    | 'medical_doc'
    | 'treatment_talk'
    | 'concept_explore'
    | 'creative_direction'
    | 'design_variations'
    | 'client_review'
    | 'info_retrieve'
    | 'customer_context'
    | 'draft_reply'
    | 'escalation_resolve';
  explanation: string;
}

interface VerifiedStat {
  metric: string;
  explanation: string;
  source: string;
  evidenceType: string;
  evidenceId?: string;
}

interface ProfessionWorkday {
  id: ProfessionId;
  label: string;
  context: string;
  activities: WorkdayActivity[];
  verifiedStat: VerifiedStat | null;
  takeaway: string;
}

const PROFESSIONS: ProfessionWorkday[] = [
  {
    id: 'teacher',
    label: 'Teacher',
    context: 'Classroom instruction & preparation',
    activities: [
      {
        step: 1,
        title: 'Prepare lesson materials',
        type: 'ai_assisted',
        pictogram: 'lesson_sheet',
        explanation:
          'Teachers can use AI to draft outlines or adapt reading levels, while checking accuracy and curriculum fit themselves.'
      },
      {
        step: 2,
        title: 'Teach and respond to students',
        type: 'human_led',
        pictogram: 'classroom_dialogue',
        explanation:
          'Leading live classroom discussion means noticing confusion, adjusting pace in real time, and keeping students engaged.'
      },
      {
        step: 3,
        title: 'Draft assessments',
        type: 'ai_assisted',
        pictogram: 'assessment_draft',
        explanation:
          'AI can propose practice questions and rubric structures that teachers review, edit, and align to learning goals.'
      },
      {
        step: 4,
        title: 'Support individual students',
        type: 'human_led',
        pictogram: 'student_support',
        explanation:
          'Mentoring a struggling student or speaking with families draws on trust, empathy, and pastoral responsibility.'
      }
    ],
    verifiedStat: {
      metric: '5.9 hours per week',
      explanation:
        'Average self-reported time saved by U.S. teachers who used AI at least weekly.',
      source: '2025 Gallup–Walton Family Foundation survey',
      evidenceType: 'Self-reported survey result'
    },
    takeaway:
      'Preparation and draft materials can be accelerated, while live teaching and student care remain central human responsibilities.'
  },
  {
    id: 'doctor',
    label: 'Doctor',
    context: 'Clinical consultation & care',
    activities: [
      {
        step: 1,
        title: 'Summarise clinical notes',
        type: 'ai_assisted',
        pictogram: 'clinical_notes',
        explanation:
          'AI tools can organize prior visit histories and reference summaries so clinicians review key context before an appointment.'
      },
      {
        step: 2,
        title: 'Examine and assess patients',
        type: 'human_led',
        pictogram: 'patient_exam',
        explanation:
          'Physical examination, observing subtle symptoms, and diagnostic judgement sit with the attending clinician.'
      },
      {
        step: 3,
        title: 'Draft documentation',
        type: 'ai_assisted',
        pictogram: 'medical_doc',
        explanation:
          'Drafting structured encounter notes can reduce paperwork, with the physician reviewing and signing off on the medical record.'
      },
      {
        step: 4,
        title: 'Discuss treatment decisions',
        type: 'human_led',
        pictogram: 'treatment_talk',
        explanation:
          'Weighing risks, quality of life, and patient preferences requires accountable human conversation and consent.'
      }
    ],
    verifiedStat: null,
    takeaway:
      'Drafting and summarizing records can become faster, while clinical assessment and medical accountability remain human-led.'
  },
  {
    id: 'designer',
    label: 'Designer',
    context: 'Visual & product design',
    activities: [
      {
        step: 1,
        title: 'Explore initial concepts',
        type: 'ai_assisted',
        pictogram: 'concept_explore',
        explanation:
          'Designers can prompt rough visual directions and mood explorations early on before committing to a focused path.'
      },
      {
        step: 2,
        title: 'Define creative direction',
        type: 'human_led',
        pictogram: 'creative_direction',
        explanation:
          'Choosing what fits a brand, audience, and cultural context depends on human taste and strategic intent.'
      },
      {
        step: 3,
        title: 'Generate variations',
        type: 'ai_assisted',
        pictogram: 'design_variations',
        explanation:
          'Producing layout alternatives, resized formats, and visual crops helps test options quickly under human review.'
      },
      {
        step: 4,
        title: 'Evaluate and present decisions',
        type: 'human_led',
        pictogram: 'client_review',
        explanation:
          'Explaining trade-offs to clients and curating the final work rests on design judgement and shared accountability.'
      }
    ],
    verifiedStat: null,
    takeaway:
      'Generating options becomes easier, shifting greater weight onto curation, taste, and clear rationale.'
  },
  {
    id: 'support',
    label: 'Customer Support',
    context: 'Service & resolution operations',
    activities: [
      {
        step: 1,
        title: 'Retrieve relevant information',
        type: 'ai_assisted',
        pictogram: 'info_retrieve',
        explanation:
          'AI assistants can surface relevant help articles and past ticket context while the specialist verifies what applies.'
      },
      {
        step: 2,
        title: "Understand the customer's circumstances",
        type: 'human_led',
        pictogram: 'customer_context',
        explanation:
          'Listening for urgency, frustration, and unspoken details helps specialists grasp what a customer actually needs.'
      },
      {
        step: 3,
        title: 'Draft a response',
        type: 'ai_assisted',
        pictogram: 'draft_reply',
        explanation:
          'Suggested reply text gives agents a starting point to edit for tone, accuracy, and company policy.'
      },
      {
        step: 4,
        title: 'Resolve sensitive escalations',
        type: 'human_led',
        pictogram: 'escalation_resolve',
        explanation:
          'Handling angry callers, policy exceptions, and high-stakes account issues depends on human discretion and empathy.'
      }
    ],
    verifiedStat: {
      metric: '+14% average (+34% for novices)',
      explanation:
        'Measured issues resolved per hour across 5,179 enterprise customer-support agents using a conversational AI assistant.',
      source: 'Brynjolfsson, Li & Raymond (NBER / QJE, published 2025)',
      evidenceType: 'Observed field study',
      evidenceId: 'C004'
    },
    takeaway:
      'Lookup and first-draft replies speed up routine tickets, while judgment and de-escalation matter most in complex cases.'
  }
];

/* Custom consistent thin-stroke geometric SVG pictograms (28x28 viewBox) */
const ActivityPictogram: React.FC<{
  kind: WorkdayActivity['pictogram'];
  color: string;
}> = ({ kind, color }) => {
  const svgProps = {
    viewBox: '0 0 28 28',
    className: 'w-7 h-7 shrink-0',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };

  switch (kind) {
    case 'lesson_sheet':
      return (
        <svg {...svgProps}>
          <rect x="6" y="4" width="16" height="20" rx="2" />
          <path d="M10 9.5h8M10 14h8M10 18.5h5" />
          <path d="M18 18.5l2 2 3-3.5" />
        </svg>
      );
    case 'classroom_dialogue':
      return (
        <svg {...svgProps}>
          <rect x="4" y="5" width="14" height="10" rx="2" />
          <path d="M8 15l-2 3v-3" />
          <path d="M12 19h10v-7a2 2 0 0 0-2-2h-2" />
          <path d="M20 19l2 3v-3" />
        </svg>
      );
    case 'assessment_draft':
      return (
        <svg {...svgProps}>
          <rect x="6" y="4" width="16" height="20" rx="2" />
          <rect x="9.5" y="9" width="3" height="3" rx="0.5" />
          <path d="M15 10.5h4" />
          <rect x="9.5" y="15.5" width="3" height="3" rx="0.5" />
          <path d="M15 17h4" />
        </svg>
      );
    case 'student_support':
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="9.5" r="3" />
          <path d="M5 21a5 5 0 0 1 10 0" />
          <circle cx="19" cy="11" r="2.3" />
          <path d="M16 21a3.8 3.8 0 0 1 7 0" />
        </svg>
      );
    case 'clinical_notes':
      return (
        <svg {...svgProps}>
          <rect x="6" y="4" width="16" height="20" rx="2" />
          <path d="M14 8v5M11.5 10.5h5" />
          <path d="M10 17h8M10 20.5h5" />
        </svg>
      );
    case 'patient_exam':
      return (
        <svg {...svgProps}>
          <path d="M4 14h4.5l2.5-5 3.5 10 2.5-5H24" />
          <circle cx="21" cy="7.5" r="2" />
        </svg>
      );
    case 'medical_doc':
      return (
        <svg {...svgProps}>
          <path d="M8 4h8l5 5v15H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M16 4v5h5" />
          <path d="M10 14h7M10 18h7" />
        </svg>
      );
    case 'treatment_talk':
      return (
        <svg {...svgProps}>
          <circle cx="9.5" cy="9.5" r="2.5" />
          <circle cx="18.5" cy="9.5" r="2.5" />
          <path d="M5.5 21a4 4 0 0 1 8 0" />
          <path d="M14.5 21a4 4 0 0 1 8 0" />
          <path d="M12 9.5h4" />
        </svg>
      );
    case 'concept_explore':
      return (
        <svg {...svgProps}>
          <rect x="4" y="5" width="9" height="9" rx="1.5" />
          <rect x="15" y="5" width="9" height="9" rx="1.5" />
          <rect x="9.5" y="15.5" width="9" height="7.5" rx="1.5" />
        </svg>
      );
    case 'creative_direction':
      return (
        <svg {...svgProps}>
          <circle cx="14" cy="14" r="9" />
          <polygon points="17.5,10.5 12.5,12.5 10.5,17.5 15.5,15.5" />
        </svg>
      );
    case 'design_variations':
      return (
        <svg {...svgProps}>
          <rect x="5" y="6" width="12" height="12" rx="1.5" />
          <path d="M9 22h12a1.5 1.5 0 0 0 1.5-1.5V10" />
          <path d="M8 15l3-3 3 3" />
        </svg>
      );
    case 'client_review':
      return (
        <svg {...svgProps}>
          <rect x="5" y="5" width="18" height="13" rx="2" />
          <path d="M9 11.5h10M11 22h6M14 18v4" />
        </svg>
      );
    case 'info_retrieve':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="6" />
          <path d="M16.5 16.5L22 22" />
          <path d="M9.5 12h5" />
        </svg>
      );
    case 'customer_context':
      return (
        <svg {...svgProps}>
          <circle cx="14" cy="10" r="3.5" />
          <path d="M7 22a7 7 0 0 1 14 0" />
          <path d="M21 7h3M21 10.5h2" />
        </svg>
      );
    case 'draft_reply':
      return (
        <svg {...svgProps}>
          <rect x="5" y="6" width="18" height="14" rx="2" />
          <path d="M9 11h10M9 15h6" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <path d="M6 19h16" />
          <path d="M14 5v9M10 9l4-4 4 4" />
          <circle cx="14" cy="21.5" r="1.5" />
        </svg>
      );
  }
};

export const Chapter5RealWorkday: React.FC<Chapter5Props> = ({
  onOpenEvidence,
  embedded = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedProfId, setSelectedProfId] = useState<ProfessionId>('teacher');
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const profession =
    PROFESSIONS.find((p) => p.id === selectedProfId) || PROFESSIONS[0];
  const activeActivity =
    profession.activities.find((a) => a.step === selectedStep) ||
    profession.activities[0];

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    amber: isDark ? '#f59e0b' : '#b45309',
    lime: isDark ? '#d7e63b' : '#5c6800'
  };

  const handleSelectProfession = (id: ProfessionId) => {
    setSelectedProfId(id);
    setSelectedStep(1);
  };

  const innerContent = (
    <div className={embedded ? 'space-y-8' : 'max-w-5xl mx-auto px-4 sm:px-6 space-y-10'}>
      {/* Opening Header */}
      {embedded ? (
        <div className="space-y-2 pt-4 border-t" style={{ borderColor: palette.border }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: palette.cyan }}
            >
              In Practice — AI in a Real Workday
            </span>
            <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
              Illustrative 4-step workflow
            </span>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            Where does AI fit into a working day?
          </h3>
          <p className="text-sm sm:text-base font-sans leading-relaxed max-w-2xl" style={{ color: palette.textMuted }}>
            Explore where AI can assist—and where human judgement still matters.
          </p>
        </div>
      ) : (
        <header className="space-y-3 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span>AI in a Real Workday</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: palette.textMuted }}>Illustrative Workday</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            Where does AI fit into a working day?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Explore where AI can assist—and where human judgement still matters.
          </p>
        </header>
      )}

        {/* Profession Selector */}
        <div
          role="tablist"
          aria-label="Select a profession to explore an illustrative workday"
          className="flex flex-wrap items-center gap-2"
        >
          {PROFESSIONS.map((prof) => {
            const isSelected = prof.id === selectedProfId;
            return (
              <button
                key={prof.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectProfession(prof.id)}
                className="px-4 py-2 min-h-[42px] rounded-lg border text-sm font-sans transition-colors cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: isSelected ? palette.cyan : palette.surfaceBg,
                  borderColor: isSelected ? palette.cyan : palette.border,
                  color: isSelected
                    ? isDark
                      ? '#061329'
                      : '#ffffff'
                    : palette.textMain,
                  fontWeight: isSelected ? 600 : 500
                }}
              >
                {prof.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Visualization: Workday Explorer */}
        <section
          aria-label={`Illustrative workday timeline for ${profession.label}`}
          className="rounded-2xl border p-5 sm:p-8 space-y-6"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          {/* Header & Color Legend */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b"
            style={{ borderColor: palette.border }}
          >
            <div>
              <span
                className="text-sm sm:text-base font-sans font-semibold block"
                style={{ color: palette.textMain }}
              >
                {profession.label} — Illustrative Workday
              </span>
              <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
                {profession.context} · Select any step to inspect
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-sans">
              <span className="inline-flex items-center gap-2" style={{ color: palette.textMain }}>
                <span
                  className="w-3 h-3 rounded-sm inline-block"
                  style={{ backgroundColor: palette.cyan }}
                  aria-hidden="true"
                />
                <span>AI-assisted</span>
              </span>
              <span className="inline-flex items-center gap-2" style={{ color: palette.textMain }}>
                <span
                  className="w-3 h-3 rounded-sm inline-block"
                  style={{ backgroundColor: palette.amber }}
                  aria-hidden="true"
                />
                <span>Human-led</span>
              </span>
            </div>
          </div>

          {/* Connected Timeline: Horizontal on md+, Vertical on mobile */}
          <div className="relative">
            {/* Desktop horizontal connector track */}
            <div
              className="hidden md:block absolute top-8 left-12 right-12 h-0.5 pointer-events-none"
              style={{ backgroundColor: palette.border }}
              aria-hidden="true"
            />
            {/* Mobile vertical connector track */}
            <div
              className="md:hidden absolute top-8 bottom-8 left-8 w-0.5 pointer-events-none"
              style={{ backgroundColor: palette.border }}
              aria-hidden="true"
            />

            <div
              role="listbox"
              aria-label="Workday activity sequence"
              className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 relative z-10"
            >
              {profession.activities.map((activity, idx) => {
                const isSelected = activity.step === selectedStep;
                const accent =
                  activity.type === 'ai_assisted' ? palette.cyan : palette.amber;
                const typeLabel =
                  activity.type === 'ai_assisted' ? 'AI-assisted' : 'Human-led';

                return (
                  <button
                    key={activity.step}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => setSelectedStep(activity.step)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next =
                          profession.activities[
                            (idx + 1) % profession.activities.length
                          ];
                        setSelectedStep(next.step);
                      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev =
                          profession.activities[
                            (idx - 1 + profession.activities.length) %
                              profession.activities.length
                          ];
                        setSelectedStep(prev.step);
                      }
                    }}
                    className="group text-left rounded-xl border p-4 min-h-[116px] md:min-h-[156px] flex md:flex-col items-start gap-3.5 md:gap-3 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: isSelected
                        ? palette.surfaceSubtle
                        : palette.surfaceBg,
                      borderColor: isSelected ? accent : palette.border,
                      boxShadow: isSelected
                        ? `0 0 0 1px ${accent}`
                        : 'none'
                    }}
                  >
                    {/* Step node + Pictogram */}
                    <div className="flex md:w-full items-center justify-between gap-2 shrink-0">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold tabular-nums border transition-colors"
                        style={{
                          backgroundColor: isSelected ? accent : palette.surfaceSubtle,
                          borderColor: accent,
                          color: isSelected
                            ? isDark
                              ? '#061329'
                              : '#ffffff'
                            : accent
                        }}
                      >
                        {activity.step}
                      </span>

                      <div className="hidden md:block">
                        <ActivityPictogram
                          kind={activity.pictogram}
                          color={isSelected ? accent : palette.textMuted}
                        />
                      </div>
                    </div>

                    {/* Title & Explicit Type Label */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2 md:block">
                        <span
                          className="text-[11px] font-mono font-semibold block"
                          style={{ color: accent }}
                        >
                          {typeLabel}
                        </span>
                        <div className="md:hidden">
                          <ActivityPictogram
                            kind={activity.pictogram}
                            color={isSelected ? accent : palette.textMuted}
                          />
                        </div>
                      </div>

                      <span
                        className="text-sm font-sans font-semibold leading-snug block"
                        style={{ color: palette.textMain }}
                      >
                        {activity.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inline Selected Step Explanation (smooth update without opening another card) */}
          <div
            className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-opacity duration-200"
            style={{ borderColor: palette.border }}
            aria-live="polite"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span
                  className="font-bold tabular-nums"
                  style={{
                    color:
                      activeActivity.type === 'ai_assisted'
                        ? palette.cyan
                        : palette.amber
                  }}
                >
                  Step 0{activeActivity.step}
                </span>
                <span aria-hidden="true" style={{ color: palette.textMuted }}>
                  ·
                </span>
                <span style={{ color: palette.textMain }} className="font-sans font-semibold">
                  {activeActivity.title}
                </span>
                <span aria-hidden="true" style={{ color: palette.textMuted }}>
                  ·
                </span>
                <span
                  style={{
                    color:
                      activeActivity.type === 'ai_assisted'
                        ? palette.cyan
                        : palette.amber
                  }}
                >
                  {activeActivity.type === 'ai_assisted' ? 'AI-assisted' : 'Human-led'}
                </span>
              </div>
              <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                {activeActivity.explanation}
              </p>
            </div>
          </div>

          {/* Verified Research Insight Row */}
          <div
            className="pt-4 border-t flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{ borderColor: palette.border }}
          >
            {profession.verifiedStat ? (
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span
                    className="text-xl sm:text-2xl font-mono font-bold tabular-nums"
                    style={{ color: palette.cyan }}
                  >
                    {profession.verifiedStat.metric}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: palette.textMuted }}
                  >
                    {profession.verifiedStat.evidenceType}
                  </span>
                </div>
                <p className="text-sm font-sans" style={{ color: palette.textMain }}>
                  {profession.verifiedStat.explanation}
                </p>
                <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                  Source: {profession.verifiedStat.source}
                </p>
              </div>
            ) : (
              <div className="space-y-1 max-w-2xl">
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: palette.textMuted }}
                >
                  Illustrative scenario
                </span>
                <p className="text-sm font-sans" style={{ color: palette.textMuted }}>
                  {profession.takeaway} No single comparable profession-wide time-saved statistic is displayed here.
                </p>
              </div>
            )}

            <div className="shrink-0">
              {profession.verifiedStat?.evidenceId ? (
                <EvidenceBadge
                  id={profession.verifiedStat.evidenceId}
                  onClick={onOpenEvidence}
                  labelOverride="Inspect NBER Study"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenEvidence('')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold cursor-pointer hover:underline whitespace-nowrap"
                  style={{ color: palette.cyan }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Evidence Vault</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Simplified Editorial Takeaway (only standalone) */}
        {!embedded && (
          <p
            className="text-base sm:text-lg font-sans font-medium"
            style={{ color: palette.textMain }}
          >
            AI can assist with tasks. People still make important decisions.
          </p>
        )}
    </div>
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <article
      id="ch05_real_workday"
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
