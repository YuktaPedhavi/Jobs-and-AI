import React, { useState } from 'react';
import { Occupation271 } from '../../data/occupations271';
import { calculatedKeyFindings } from '../../data/researchData';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, BookOpen } from 'lucide-react';

interface Chapter2Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

interface RankedTaskItem {
  id: string;
  name: string;
  exposureEstimatePct: number;
  aiAssists: string[];
  peopleContribute: string[];
  takeaway: string;
}

/* Ranked highest to lowest from existing project task-spectrum dataset */
const RANKED_TASKS: RankedTaskItem[] = [
  {
    id: 'writing',
    name: 'Writing & Drafting',
    exposureEstimatePct: 76,
    aiAssists: [
      'Generating initial email, memo, and report drafts',
      'Reformatting notes into structured outlines',
      'Producing routine boilerplate phrasing'
    ],
    peopleContribute: [
      'Defining the core argument and intended audience',
      'Judging tone, nuance, and institutional voice',
      'Taking accountability for published claims'
    ],
    takeaway: 'When initial phrasing is fast, clarity of intent and editorial judgement matter more.'
  },
  {
    id: 'info_search',
    name: 'Information Search',
    exposureEstimatePct: 72,
    aiAssists: [
      'Scanning internal manuals and knowledge bases',
      'Locating relevant sections across long documents',
      'Summarizing search results into quick briefs'
    ],
    peopleContribute: [
      'Formulating the right investigative question',
      'Judging whether retrieved sources are authoritative',
      'Spotting missing context outside indexed files'
    ],
    takeaway: 'Fast retrieval reduces lookup time, while human questioning guides what gets found.'
  },
  {
    id: 'research',
    name: 'Research & Synthesis',
    exposureEstimatePct: 68,
    aiAssists: [
      'Condensing lengthy papers and public filings',
      'Comparing recurring themes across source sets',
      'Drafting structured literature checklists'
    ],
    peopleContribute: [
      'Verifying primary citations and source reliability',
      'Identifying methodological gaps or biased samples',
      'Synthesizing original conclusions across domains'
    ],
    takeaway: 'Summaries accelerate reading, but verification prevents flawed inputs from spreading.'
  },
  {
    id: 'documentation',
    name: 'Documentation & Notes',
    exposureEstimatePct: 65,
    aiAssists: [
      'Converting meeting audio into structured action notes',
      'Drafting standardized intake or clinical summaries',
      'Tagging records into predefined templates'
    ],
    peopleContribute: [
      'Checking factual accuracy before records are filed',
      'Handling sensitive omissions and privacy rules',
      'Signing off on legal or compliance accuracy'
    ],
    takeaway: 'Drafting records is easier to automate than accepting legal sign-off for them.'
  },
  {
    id: 'analysis',
    name: 'Quantitative Analysis',
    exposureEstimatePct: 58,
    aiAssists: [
      'Writing spreadsheet formulas and data-cleaning scripts',
      'Drafting standard database queries',
      'Flagging obvious formatting anomalies'
    ],
    peopleContribute: [
      'Distinguishing correlation from real-world causation',
      'Auditing edge cases and silent data assumptions',
      'Interpreting what metrics mean for decisions'
    ],
    takeaway: 'Models speed up syntax and formatting, while framing the analytical question stays human.'
  },
  {
    id: 'routine_decisions',
    name: 'Routine Decisions',
    exposureEstimatePct: 54,
    aiAssists: [
      'Routing incoming requests to the right queue',
      'Pre-screening standard applications against fixed rules',
      'Flagging unusual patterns for human inspection'
    ],
    peopleContribute: [
      'Resolving ambiguous exceptions outside policy rules',
      'Weighing fairness, ethics, and edge-case trade-offs',
      'Explaining decisions to affected people'
    ],
    takeaway: 'Rule-based triage shifts easily; exceptions and fairness appeals require human authority.'
  },
  {
    id: 'creative_assist',
    name: 'Creative Assistance',
    exposureEstimatePct: 48,
    aiAssists: [
      'Generating rough layout or concept variations',
      'Producing visual mockups and background cleanups',
      'Brainstorming alternative angles during ideation'
    ],
    peopleContribute: [
      'Exercising aesthetic taste and cultural awareness',
      'Selecting the single direction that fits a brand',
      'Creating original work rooted in lived experience'
    ],
    takeaway: 'Abundant rough variations place higher value on curation and creative direction.'
  },
  {
    id: 'communication',
    name: 'Routine Communication',
    exposureEstimatePct: 45,
    aiAssists: [
      'Suggesting standard customer reply phrasing',
      'Translating routine updates across languages',
      'Adjusting message length or formality'
    ],
    peopleContribute: [
      'Navigating tense conversations with genuine empathy',
      'Building durable trust across clients and teams',
      'Reading unspoken emotional cues in real time'
    ],
    takeaway: 'Routine phrasing scales easily; interpersonal trust remains distinctly human.'
  }
];

/* Custom consistent 18x18 geometric SVG pictograms (strokeWidth 1.6, no generic AI icons) */
const TaskPictogram: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  const props = {
    viewBox: '0 0 20 20',
    className: 'w-[18px] h-[18px] shrink-0',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };

  switch (id) {
    case 'writing':
      return (
        <svg {...props}>
          <path d="M4 15.5h12" />
          <path d="M5.5 12.5l7.5-7.5 2.5 2.5-7.5 7.5H5.5v-2.5z" />
          <path d="M11.5 6.5l2.5 2.5" />
        </svg>
      );
    case 'info_search':
      return (
        <svg {...props}>
          <circle cx="8.5" cy="8.5" r="4.5" />
          <path d="M12 12l4.5 4.5" />
          <path d="M6.5 8.5h4" />
        </svg>
      );
    case 'research':
      return (
        <svg {...props}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="15" cy="6" r="2" />
          <circle cx="10" cy="14.5" r="2" />
          <path d="M6.8 7l2.2 5.5M13.2 7L11 12.5M7 6h6" />
        </svg>
      );
    case 'documentation':
      return (
        <svg {...props}>
          <rect x="4" y="3" width="12" height="14" rx="2" />
          <path d="M7 7.5h6M7 10.5h6M7 13.5h3.5" />
        </svg>
      );
    case 'analysis':
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" />
          <path d="M3.5 8.5h13M9 8.5v8" />
          <path d="M11.5 14v-2.5M14 14v-3.5" />
        </svg>
      );
    case 'routine_decisions':
      return (
        <svg {...props}>
          <circle cx="5" cy="10" r="2" />
          <circle cx="15" cy="5.5" r="2" />
          <circle cx="15" cy="14.5" r="2" />
          <path d="M7 10h2.5c1.5 0 2-4.5 3.5-4.5M9.5 10c1.5 0 2 4.5 3.5 4.5" />
        </svg>
      );
    case 'creative_assist':
      return (
        <svg {...props}>
          <path d="M4 14.5C6.5 8 11 5.5 16 5.5" />
          <circle cx="4" cy="14.5" r="1.5" />
          <circle cx="16" cy="5.5" r="1.5" />
          <path d="M10.5 7.5L7 4M10.5 7.5l3.5 3.5" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="3.5" y="4.5" width="13" height="9.5" rx="2" />
          <path d="M7 14l-2 2.5V14" />
          <path d="M7 8.5h6M7 11h4" />
        </svg>
      );
  }
};

export const Chapter2CognitiveReach: React.FC<Chapter2Props> = ({
  onOpenEvidence
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedTaskId, setSelectedTaskId] = useState<string>('writing');
  const [methodOpen, setMethodOpen] = useState(false);

  const activeTask =
    RANKED_TASKS.find((t) => t.id === selectedTaskId) || RANKED_TASKS[0];

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    barNeutral: isDark ? '#3a577d' : '#94a3b8',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    lime: isDark ? '#d7e63b' : '#5c6800',
    amber: isDark ? '#f59e0b' : '#b45309'
  };

  return (
    <article
      id="ch03_understanding_tasks"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Compact Opening Header */}
        <header className="space-y-3 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span className="font-bold">03</span>
            <span aria-hidden="true">·</span>
            <span>Understanding Tasks</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            Which Parts of Work Can AI Change?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            AI interacts with specific workplace tasks first—not entire jobs at once.
          </p>
        </header>

        {/* Dominant Visualization: Ranked Task Spectrum + Inline Details */}
        <section
          aria-labelledby="ranked-task-spectrum-heading"
          className="rounded-2xl border p-5 sm:p-8 space-y-6"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          {/* Spectrum Header & Axis Label */}
          <div
            className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b"
            style={{ borderColor: palette.border }}
          >
            <div>
              <h3
                id="ranked-task-spectrum-heading"
                className="text-base sm:text-lg font-sans font-semibold"
                style={{ color: palette.textMain }}
              >
                Ranked Task Spectrum
              </h3>
              <p className="text-xs font-sans mt-0.5" style={{ color: palette.textMuted }}>
                Illustrative task-exposure index (0–100% scale) · Select a task bar to inspect roles
              </p>
            </div>
            <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
              Highest → lowest exposure
            </span>
          </div>

          {/* 0–100% Axis Tick Header (aligned with bar track on md+) */}
          <div className="hidden md:grid grid-cols-[210px_1fr_56px] items-center gap-4 text-[11px] font-mono tabular-nums" style={{ color: palette.textMuted }}>
            <span>Task category</span>
            <div className="flex justify-between border-b pb-1" style={{ borderColor: palette.border }}>
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <span className="text-right">Index</span>
          </div>

          {/* Interactive Ranked Bars */}
          <div
            role="listbox"
            aria-label="Ranked work task categories by illustrative AI exposure"
            className="space-y-2"
          >
            {RANKED_TASKS.map((task, idx) => {
              const isSelected = task.id === selectedTaskId;
              const barColor = isSelected ? palette.cyan : palette.barNeutral;

              return (
                <button
                  key={task.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTaskId(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const next = RANKED_TASKS[(idx + 1) % RANKED_TASKS.length];
                      setSelectedTaskId(next.id);
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prev =
                        RANKED_TASKS[(idx - 1 + RANKED_TASKS.length) % RANKED_TASKS.length];
                      setSelectedTaskId(prev.id);
                    }
                  }}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border text-left transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 grid grid-cols-[1fr_auto] md:grid-cols-[210px_1fr_56px] items-center gap-x-4 gap-y-2"
                  style={{
                    backgroundColor: isSelected ? palette.surfaceSubtle : 'transparent',
                    borderColor: isSelected ? palette.cyan : 'transparent'
                  }}
                >
                  {/* Label + Pictogram */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TaskPictogram
                      id={task.id}
                      color={isSelected ? palette.cyan : palette.textMuted}
                    />
                    <span
                      className={`text-sm font-sans truncate ${
                        isSelected ? 'font-semibold' : 'font-medium'
                      }`}
                      style={{ color: isSelected ? palette.textMain : palette.textMuted }}
                    >
                      {task.name}
                    </span>
                  </div>

                  {/* Mobile inline percentage */}
                  <span
                    className="md:hidden font-mono text-sm font-bold tabular-nums"
                    style={{ color: isSelected ? palette.cyan : palette.textMuted }}
                  >
                    {task.exposureEstimatePct}%
                  </span>

                  {/* Consistent 0-100% Horizontal Bar Track */}
                  <div
                    className="col-span-2 md:col-span-1 h-3.5 w-full rounded-sm relative overflow-hidden"
                    style={{ backgroundColor: palette.surfaceSubtle }}
                  >
                    {/* Subtle 25/50/75 reference lines */}
                    {[25, 50, 75].map((tick) => (
                      <span
                        key={tick}
                        className="absolute top-0 bottom-0 w-px opacity-35"
                        style={{ left: `${tick}%`, backgroundColor: palette.border }}
                        aria-hidden="true"
                      />
                    ))}
                    <div
                      className="h-full rounded-sm transition-colors duration-150"
                      style={{
                        width: `${task.exposureEstimatePct}%`,
                        backgroundColor: barColor
                      }}
                    />
                  </div>

                  {/* Desktop right-aligned value */}
                  <span
                    className="hidden md:block text-right font-mono text-sm font-bold tabular-nums"
                    style={{ color: isSelected ? palette.cyan : palette.textMuted }}
                  >
                    {task.exposureEstimatePct}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Task Details Immediately Below */}
          <div
            className="pt-6 border-t space-y-5"
            style={{ borderColor: palette.border }}
            aria-live="polite"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <TaskPictogram id={activeTask.id} color={palette.cyan} />
                <span
                  className="text-lg sm:text-xl font-sans font-bold"
                  style={{ color: palette.textMain }}
                >
                  {activeTask.name}
                </span>
              </div>
              <span className="text-xs font-mono tabular-nums" style={{ color: palette.cyan }}>
                Illustrative index: {activeTask.exposureEstimatePct}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group 1: AI can assist */}
              <div
                className="p-4 sm:p-5 rounded-xl border space-y-2.5"
                style={{
                  backgroundColor: palette.surfaceSubtle,
                  borderColor: palette.border
                }}
              >
                <div
                  className="text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ color: palette.cyan }}
                >
                  AI can assist
                </div>
                <ul className="space-y-1.5 text-sm font-sans" style={{ color: palette.textMain }}>
                  {activeTask.aiAssists.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: palette.cyan }} aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Group 2: People contribute */}
              <div
                className="p-4 sm:p-5 rounded-xl border space-y-2.5"
                style={{
                  backgroundColor: palette.surfaceSubtle,
                  borderColor: palette.border
                }}
              >
                <div
                  className="text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ color: palette.amber }}
                >
                  People contribute
                </div>
                <ul className="space-y-1.5 text-sm font-sans" style={{ color: palette.textMain }}>
                  {activeTask.peopleContribute.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: palette.amber }} aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Single concise takeaway + Expandable methodology */}
            <div
              className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{ borderColor: palette.border }}
            >
              <p className="text-sm font-sans" style={{ color: palette.textMuted }}>
                {activeTask.takeaway}
              </p>

              <button
                type="button"
                onClick={() => setMethodOpen((v) => !v)}
                aria-expanded={methodOpen}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 cursor-pointer hover:underline self-start sm:self-center"
                style={{ color: palette.cyan }}
              >
                <span>Source &amp; methodology</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    methodOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {methodOpen && (
              <div
                className="pt-3 border-t text-xs font-sans space-y-2"
                style={{ borderColor: palette.border, color: palette.textMuted }}
              >
                <p>
                  <strong style={{ color: palette.textMain }}>Metric clarification:</strong>{' '}
                  The eight bar values above are illustrative task-exposure estimates summarizing how language-model capabilities align with common workplace task types—not empirically measured task speedup percentages from a single trial.
                </p>
                <p>
                  <strong style={{ color: palette.textMain }}>Verified dataset anchor:</strong>{' '}
                  Across all {calculatedKeyFindings.occupation_count} occupations in the project dataset, verbal cognitive demand correlates strongly with LLM task exposure (
                  <span className="font-mono tabular-nums" style={{ color: palette.textMain }}>
                    r = +{calculatedKeyFindings.correlation_exposure_vs_verbal_ability.toFixed(2)}
                  </span>
                  ), while spatial ability correlates negatively (
                  <span className="font-mono tabular-nums" style={{ color: palette.textMain }}>
                    r = {calculatedKeyFindings.correlation_exposure_vs_spatial_ability.toFixed(2)}
                  </span>
                  ).
                </p>
                <button
                  type="button"
                  onClick={() => onOpenEvidence('C001')}
                  className="inline-flex items-center gap-1.5 font-mono font-semibold cursor-pointer hover:underline"
                  style={{ color: palette.cyan }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Evidence Vault</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </article>
  );
};
