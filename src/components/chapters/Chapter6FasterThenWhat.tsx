import React, { useState, useEffect, useRef } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, ArrowDown, ExternalLink, BookOpen } from 'lucide-react';

interface Chapter6Props {
  onOpenEvidence: (id: string) => void;
}

type StageId = 'tasks' | 'firms' | 'workers';
type StudyId = 'bcg' | 'callcenter' | 'denmark';

interface StageConfig {
  id: StageId;
  index: string;
  label: string;
  headline: string;
  highlight: string;
  supporting: string;
  extraDetail: string;
}

const FLOW_STAGES: StageConfig[] = [
  {
    id: 'tasks',
    index: '01',
    label: 'TASKS',
    headline: 'Work gets faster',
    highlight: 'Measurable productivity gains',
    supporting: 'Studies show AI can improve performance in specific tasks.',
    extraDetail:
      'Controlled workplace trials show double-digit speed and quality improvements when workers apply AI to discrete drafting, coding, or support tasks.'
  },
  {
    id: 'firms',
    index: '02',
    label: 'FIRMS',
    headline: 'Benefits vary',
    highlight: 'Not all gains transfer',
    supporting:
      "Faster tasks don't automatically mean proportionally higher company productivity.",
    extraDetail:
      'Additional review steps, compliance checks, and team coordination often absorb part of the time saved on individual tasks.'
  },
  {
    id: 'workers',
    index: '03',
    label: 'WORKERS',
    headline: 'Higher pay? Not necessarily',
    highlight: 'No clear short-term wage effect in the cited Danish study',
    supporting:
      'Productivity improvements do not automatically translate into higher wages.',
    extraDetail:
      'Over two years of tracked adoption in Denmark, faster workflows did not translate into higher average earnings or fewer recorded hours.'
  }
];

/* -------------------------------------------------------------------------- */
/* Custom SVG Illustrations for Each Stage                                    */
/* -------------------------------------------------------------------------- */

const StageTasksSvg: React.FC<{ isDark: boolean; isActive: boolean }> = ({
  isDark,
  isActive
}) => {
  const cyan = isDark ? '#22d3ee' : '#0284c7';
  const lime = isDark ? '#d7e63b' : '#5c6800';
  const track = isDark ? '#163560' : '#cbd5e1';
  const surface = isDark ? '#0b1f3c' : '#ffffff';
  const textMuted = isDark ? '#9bb2cf' : '#475e77';

  return (
    <svg
      viewBox="0 0 240 132"
      className="w-full h-32 select-none overflow-visible"
      role="img"
      aria-label="Illustration of individual task documents completing faster along an accelerated workflow"
    >
      {/* Background document sheet */}
      <rect
        x="18"
        y="18"
        width="96"
        height="88"
        rx="8"
        fill={surface}
        stroke={isActive ? cyan : track}
        strokeWidth={isActive ? 1.75 : 1.2}
      />
      {/* Task lines inside document */}
      <line x1="32" y1="38" x2="78" y2="38" stroke={textMuted} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <line x1="32" y1="54" x2="96" y2="54" stroke={cyan} strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="70" x2="88" y2="70" stroke={cyan} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="32" y1="86" x2="64" y2="86" stroke={textMuted} strokeWidth="3" strokeLinecap="round" opacity="0.35" />

      {/* Acceleration sweep arc */}
      <path
        d="M 102 64 C 128 36, 152 36, 174 56"
        fill="none"
        stroke={cyan}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <polygon points="178,59 170,58 175,50" fill={cyan} />

      {/* Completed output block */}
      <rect
        x="156"
        y="46"
        width="66"
        height="58"
        rx="8"
        fill={surface}
        stroke={cyan}
        strokeWidth="1.75"
      />
      <path
        d="M 176 74 L 185 83 L 203 63"
        fill="none"
        stroke={lime}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="189"
        y="119"
        textAnchor="middle"
        fill={cyan}
        className="font-mono text-[10px] font-semibold"
      >
        TASK OUTPUT ↑
      </text>
    </svg>
  );
};

const StageFirmsSvg: React.FC<{ isDark: boolean; isActive: boolean }> = ({
  isDark,
  isActive
}) => {
  const cyan = isDark ? '#22d3ee' : '#0284c7';
  const amber = isDark ? '#f59e0b' : '#b45309';
  const track = isDark ? '#163560' : '#cbd5e1';
  const surface = isDark ? '#0b1f3c' : '#ffffff';
  const textMuted = isDark ? '#9bb2cf' : '#475e77';

  return (
    <svg
      viewBox="0 0 240 132"
      className="w-full h-32 select-none overflow-visible"
      role="img"
      aria-label="Illustration of multiple fast task outputs entering a company workflow with review and coordination steps"
    >
      {/* Multiple task inputs entering left */}
      <path d="M 14 34 L 74 54" stroke={cyan} strokeWidth="2" strokeLinecap="round" />
      <path d="M 14 66 L 74 66" stroke={cyan} strokeWidth="2" strokeLinecap="round" />
      <path d="M 14 98 L 74 78" stroke={cyan} strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="34" r="3.5" fill={cyan} />
      <circle cx="14" cy="66" r="3.5" fill={cyan} />
      <circle cx="14" cy="98" r="3.5" fill={cyan} />

      {/* Central Company Workflow / Review & Verification Hub */}
      <rect
        x="74"
        y="24"
        width="88"
        height="84"
        rx="10"
        fill={surface}
        stroke={isActive ? amber : track}
        strokeWidth={isActive ? 1.75 : 1.2}
      />

      {/* Internal verification & coordination loop */}
      <circle cx="102" cy="54" r="10" fill="none" stroke={amber} strokeWidth="1.6" />
      <text x="102" y="57" textAnchor="middle" fill={amber} className="font-mono text-[9px] font-bold">
        ?
      </text>
      <path
        d="M 116 54 L 144 54"
        stroke={textMuted}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <rect x="92" y="74" width="52" height="18" rx="4" fill="none" stroke={track} strokeWidth="1.2" />
      <text x="118" y="86" textAnchor="middle" fill={textMuted} className="font-mono text-[8px]">
        REVIEW LOOP
      </text>

      {/* Uneven / dampened output exiting right */}
      <path d="M 162 56 L 218 56" stroke={amber} strokeWidth="2" strokeDasharray="5 3" />
      <polygon points="224,56 216,52 216,60" fill={amber} />
      <path d="M 162 80 L 194 80" stroke={textMuted} strokeWidth="1.5" opacity="0.5" />
      <text
        x="118"
        y="122"
        textAnchor="middle"
        fill={amber}
        className="font-mono text-[10px] font-semibold"
      >
        VERIFY · COORDINATE
      </text>
    </svg>
  );
};

const StageWorkersSvg: React.FC<{ isDark: boolean; isActive: boolean }> = ({
  isDark,
  isActive
}) => {
  const cyan = isDark ? '#22d3ee' : '#0284c7';
  const amber = isDark ? '#f59e0b' : '#b45309';
  const track = isDark ? '#163560' : '#cbd5e1';
  const textMuted = isDark ? '#9bb2cf' : '#475e77';

  return (
    <svg
      viewBox="0 0 240 132"
      className="w-full h-32 select-none overflow-visible"
      role="img"
      aria-label="Chart illustration showing a rising productivity line diverging from a relatively flat wage line"
    >
      {/* Clean coordinate axes */}
      <line x1="28" y1="20" x2="28" y2="102" stroke={track} strokeWidth="1.2" />
      <line x1="28" y1="102" x2="216" y2="102" stroke={track} strokeWidth="1.2" />

      {/* Subtle horizontal grid */}
      <line x1="28" y1="42" x2="216" y2="42" stroke={track} strokeWidth="0.75" strokeDasharray="3 4" opacity="0.55" />
      <line x1="28" y1="72" x2="216" y2="72" stroke={track} strokeWidth="0.75" strokeDasharray="3 4" opacity="0.55" />

      {/* Rising task productivity curve */}
      <path
        d="M 32 88 C 80 80, 130 50, 206 26"
        fill="none"
        stroke={cyan}
        strokeWidth={isActive ? 3 : 2.4}
        strokeLinecap="round"
      />
      <circle cx="206" cy="26" r="4" fill={cyan} />
      <text x="150" y="24" fill={cyan} className="font-mono text-[9px] font-bold">
        TASK OUTPUT ↑
      </text>

      {/* Relatively flat wage line */}
      <path
        d="M 32 88 C 85 88, 145 86, 206 85"
        fill="none"
        stroke={amber}
        strokeWidth={isActive ? 3 : 2.4}
        strokeDasharray="6 3"
        strokeLinecap="round"
      />
      <circle cx="206" cy="85" r="4" fill={amber} />
      <text x="148" y="78" fill={amber} className="font-mono text-[9px] font-bold">
        AVERAGE PAY —
      </text>

      {/* Divergence bracket */}
      <line x1="214" y1="30" x2="214" y2="81" stroke={textMuted} strokeWidth="1" strokeDasharray="2 2" />

      <text x="122" y="120" textAnchor="middle" fill={textMuted} className="font-mono text-[10px]">
        TIME AFTER ADOPTION →
      </text>
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/* Animated Connector Between Flow Stages                                     */
/* -------------------------------------------------------------------------- */

const FlowConnector: React.FC<{
  isDark: boolean;
  inView: boolean;
  reducedMotion: boolean;
  tone: 'cyan-to-amber' | 'amber-to-muted';
  highlighted: boolean;
}> = ({ isDark, inView, reducedMotion, tone, highlighted }) => {
  const strokePrimary =
    tone === 'cyan-to-amber'
      ? isDark
        ? '#22d3ee'
        : '#0284c7'
      : isDark
      ? '#f59e0b'
      : '#b45309';

  const track = isDark ? '#163560' : '#cbd5e1';

  return (
    <>
      {/* Desktop horizontal connector */}
      <div
        className="hidden lg:flex items-center justify-center w-12 shrink-0 self-center"
        aria-hidden="true"
      >
        <svg viewBox="0 0 48 28" className="w-12 h-7 overflow-visible">
          <line
            x1="2"
            y1="14"
            x2="40"
            y2="14"
            stroke={highlighted ? strokePrimary : track}
            strokeWidth={highlighted ? 2 : 1.5}
            strokeDasharray={tone === 'amber-to-muted' ? '4 4' : undefined}
            className="transition-colors duration-200"
          />
          <polygon
            points="46,14 38,9 38,19"
            fill={highlighted ? strokePrimary : track}
            className="transition-colors duration-200"
          />
          {inView && !reducedMotion && (
            <circle r="3" cy="14" fill={strokePrimary}>
              <animate
                attributeName="cx"
                values="4;38"
                dur={tone === 'cyan-to-amber' ? '1.8s' : '2.8s'}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={tone === 'cyan-to-amber' ? '1.8s' : '2.8s'}
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      </div>

      {/* Mobile vertical connector */}
      <div
        className="flex lg:hidden items-center justify-center py-1"
        aria-hidden="true"
      >
        <ArrowDown
          className="w-5 h-5 transition-colors duration-200"
          style={{ color: highlighted ? strokePrimary : track }}
        />
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Main Section 05 Component                                                  */
/* -------------------------------------------------------------------------- */

export const Chapter6FasterThenWhat: React.FC<Chapter6Props> = ({ onOpenEvidence }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeStage, setActiveStage] = useState<StageId | null>(null);
  const [activeStudy, setActiveStudy] = useState<StudyId>('bcg');
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const flowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Theme-calibrated semantic palette
  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    lime: isDark ? '#d7e63b' : '#5c6800',
    amber: isDark ? '#f59e0b' : '#b45309'
  };

  const getStageAccent = (id: StageId) => {
    if (id === 'tasks') return palette.cyan;
    if (id === 'firms') return palette.amber;
    return palette.lime;
  };

  const handleStageToggle = (id: StageId) => {
    setActiveStage((prev) => (prev === id ? null : id));
  };

  return (
    <article
      id="ch05_productivity"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* =================================================================== */}
        {/* 1. REDESIGNED OPENING                                               */}
        {/* =================================================================== */}
        <header className="space-y-4 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span className="font-bold">05</span>
            <span aria-hidden="true">·</span>
            <span>Productivity &amp; Its Consequences</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            AI Makes Tasks Faster. Who Benefits?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            AI can speed up individual tasks, but the benefits don&apos;t always translate into higher company productivity or worker wages.
          </p>
        </header>

        {/* =================================================================== */}
        {/* 2. INTERACTIVE THREE-STAGE INFOGRAPHIC: TASKS → FIRMS → WORKERS     */}
        {/* =================================================================== */}
        <section
          ref={flowRef}
          aria-labelledby="three-stage-flow-title"
          className="space-y-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b" style={{ borderColor: palette.border }}>
            <h3
              id="three-stage-flow-title"
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: palette.textMuted }}
            >
              Value Transmission Flow — Tasks → Firms → Workers
            </h3>
            <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
              Hover or select a stage to inspect friction
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-2">
            {FLOW_STAGES.map((stage, idx) => {
              const isActive = activeStage === stage.id;
              const accent = getStageAccent(stage.id);

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => handleStageToggle(stage.id)}
                    onMouseEnter={() => setActiveStage(stage.id)}
                    onMouseLeave={() => setActiveStage((prev) => (prev === stage.id ? null : prev))}
                    onFocus={() => setActiveStage(stage.id)}
                    aria-pressed={isActive}
                    className="flex-1 text-left rounded-xl p-5 sm:p-6 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 flex flex-col justify-between"
                    style={{
                      backgroundColor: isActive ? palette.surfaceBg : palette.surfaceSubtle,
                      border: `1px solid ${isActive ? accent : palette.border}`,
                      opacity: inView || reducedMotion ? 1 : 0,
                      transform:
                        inView || reducedMotion
                          ? isActive
                            ? 'translateY(-2px)'
                            : 'translateY(0)'
                          : 'translateY(12px)',
                      transitionDelay: reducedMotion ? '0ms' : `${idx * 90}ms`
                    }}
                  >
                    <div className="space-y-4">
                      {/* Stage Index & Label */}
                      <div className="flex items-center justify-between gap-2 text-xs font-mono">
                        <span className="font-bold tracking-wider" style={{ color: accent }}>
                          {stage.index} · {stage.label}
                        </span>
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: palette.textMuted }}
                        >
                          {isActive ? 'Focused' : 'Inspect'}
                        </span>
                      </div>

                      {/* Custom SVG Visual */}
                      <div className="py-1">
                        {stage.id === 'tasks' && (
                          <StageTasksSvg isDark={isDark} isActive={isActive} />
                        )}
                        {stage.id === 'firms' && (
                          <StageFirmsSvg isDark={isDark} isActive={isActive} />
                        )}
                        {stage.id === 'workers' && (
                          <StageWorkersSvg isDark={isDark} isActive={isActive} />
                        )}
                      </div>

                      {/* Headline, Highlight & Concise Supporting Text */}
                      <div className="space-y-2">
                        <h4
                          className="text-xl font-display font-extrabold tracking-tight leading-snug"
                          style={{ color: palette.textMain }}
                        >
                          {stage.headline}
                        </h4>
                        <div
                          className="text-xs font-mono font-semibold"
                          style={{ color: accent }}
                        >
                          {stage.highlight}
                        </div>
                        <p
                          className="text-sm font-sans leading-relaxed"
                          style={{ color: palette.textMuted }}
                        >
                          {stage.supporting}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Additional Sentence */}
                    <div
                      className="mt-4 pt-3 border-t transition-opacity duration-200 min-h-[3.5rem] flex items-start"
                      style={{
                        borderColor: isActive ? `${accent}44` : 'transparent',
                        opacity: isActive ? 1 : 0.45
                      }}
                    >
                      <p
                        className="text-xs font-sans leading-relaxed"
                        style={{ color: isActive ? palette.textMain : palette.textMuted }}
                      >
                        {isActive
                          ? stage.extraDetail
                          : 'Select or hover to see why this stage behaves differently.'}
                      </p>
                    </div>
                  </button>

                  {idx < FLOW_STAGES.length - 1 && (
                    <FlowConnector
                      isDark={isDark}
                      inView={inView}
                      reducedMotion={reducedMotion}
                      tone={idx === 0 ? 'cyan-to-amber' : 'amber-to-muted'}
                      highlighted={
                        activeStage === stage.id ||
                        activeStage === FLOW_STAGES[idx + 1].id
                      }
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. RESEARCH EVIDENCE SECTION ("What the research actually shows")   */}
        {/* =================================================================== */}
        <section
          aria-labelledby="research-evidence-heading"
          className="pt-8 border-t space-y-8"
          style={{ borderColor: palette.border }}
        >
          {/* Header + Study Selector Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span
                className="text-xs font-mono uppercase tracking-widest block"
                style={{ color: palette.cyan }}
              >
                Empirical Field &amp; Administrative Studies
              </span>
              <h3
                id="research-evidence-heading"
                className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                style={{ color: palette.textMain }}
              >
                What the research actually shows
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Research studies"
              onKeyDown={(e) => {
                const order: StudyId[] = ['bcg', 'callcenter', 'denmark'];
                const currentIdx = order.indexOf(activeStudy);
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const next = order[(currentIdx + 1) % order.length];
                  setActiveStudy(next);
                  document.getElementById(`study-tab-${next}`)?.focus();
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prev = order[(currentIdx - 1 + order.length) % order.length];
                  setActiveStudy(prev);
                  document.getElementById(`study-tab-${prev}`)?.focus();
                }
              }}
              className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border self-start md:self-auto"
              style={{
                backgroundColor: palette.surfaceSubtle,
                borderColor: palette.border
              }}
            >
              {(
                [
                  { id: 'bcg', label: 'Harvard / BCG Trial' },
                  { id: 'callcenter', label: 'Stanford Call Center' },
                  { id: 'denmark', label: 'Denmark NBER Study' }
                ] as { id: StudyId; label: string }[]
              ).map((tab) => {
                const selected = activeStudy === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`study-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`study-panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveStudy(tab.id)}
                    className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: selected ? palette.cyan : 'transparent',
                      color: selected
                        ? isDark
                          ? '#061329'
                          : '#ffffff'
                        : palette.textMuted
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* STUDY 1: HARVARD / BCG TRIAL                                    */}
          {/* --------------------------------------------------------------- */}
          {activeStudy === 'bcg' && (
            <div
              role="tabpanel"
              id="study-panel-bcg"
              aria-labelledby="study-tab-bcg"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2"
            >
              {/* Left 7 cols: Prominent Finding + Shared-Scale Proportional Chart */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className="text-4xl sm:text-5xl font-mono font-extrabold tabular-nums tracking-tight"
                    style={{ color: palette.cyan }}
                  >
                    +43% vs +17%
                  </span>
                  <span className="text-sm font-sans" style={{ color: palette.textMuted }}>
                    task quality gain over non-AI baseline
                  </span>
                </div>

                {/* Shared 0%–50% Scale Bar Comparison SVG */}
                <div
                  className="p-5 sm:p-6 rounded-xl border space-y-4"
                  style={{
                    backgroundColor: palette.surfaceBg,
                    borderColor: palette.border
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono" style={{ color: palette.textMuted }}>
                    <span>Quality score improvement (same 0%–50% scale)</span>
                    <span>n = 758 consultants</span>
                  </div>

                  <svg
                    viewBox="0 0 520 148"
                    className="w-full h-auto overflow-visible"
                    role="img"
                    aria-label="Proportional horizontal bar chart comparing +43% quality improvement for lower-performing consultants versus +17% for higher-performing consultants on a shared 0% to 50% scale"
                  >
                    {/* Gridlines at 0%, 10%, 20%, 30%, 40%, 50% (x from 140 to 490 -> width 350px => 7px per %) */}
                    {[0, 10, 20, 30, 40, 50].map((tick) => {
                      const x = 140 + tick * 7;
                      return (
                        <g key={tick}>
                          <line
                            x1={x}
                            y1="14"
                            x2={x}
                            y2="112"
                            stroke={palette.border}
                            strokeWidth={tick === 0 ? 1.5 : 1}
                            strokeDasharray={tick === 0 ? undefined : '3 4'}
                          />
                          <text
                            x={x}
                            y="132"
                            textAnchor="middle"
                            fill={palette.textMuted}
                            className="font-mono text-[10px] tabular-nums"
                          >
                            +{tick}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Bar 1: Lower-performing consultants (+43% -> 43 * 7 = 301px) */}
                    <text
                      x="0"
                      y="38"
                      fill={palette.textMain}
                      className="font-sans text-[12px] font-semibold"
                    >
                      Lower-performing
                    </text>
                    <text
                      x="0"
                      y="52"
                      fill={palette.textMuted}
                      className="font-mono text-[10px]"
                    >
                      Bottom half baseline
                    </text>
                    <rect
                      x="140"
                      y="25"
                      width="350"
                      height="24"
                      rx="4"
                      fill={palette.surfaceSubtle}
                    />
                    <rect
                      x="140"
                      y="25"
                      width="301"
                      height="24"
                      rx="4"
                      fill={palette.cyan}
                    />
                    <text
                      x="449"
                      y="42"
                      fill={palette.cyan}
                      className="font-mono text-[13px] font-bold tabular-nums"
                    >
                      +43%
                    </text>

                    {/* Bar 2: Higher-performing consultants (+17% -> 17 * 7 = 119px) */}
                    <text
                      x="0"
                      y="86"
                      fill={palette.textMain}
                      className="font-sans text-[12px] font-semibold"
                    >
                      Higher-performing
                    </text>
                    <text
                      x="0"
                      y="100"
                      fill={palette.textMuted}
                      className="font-mono text-[10px]"
                    >
                      Top half baseline
                    </text>
                    <rect
                      x="140"
                      y="73"
                      width="350"
                      height="24"
                      rx="4"
                      fill={palette.surfaceSubtle}
                    />
                    <rect
                      x="140"
                      y="73"
                      width="119"
                      height="24"
                      rx="4"
                      fill={palette.textMuted}
                    />
                    <text
                      x="267"
                      y="90"
                      fill={palette.textMain}
                      className="font-mono text-[13px] font-bold tabular-nums"
                    >
                      +17%
                    </text>
                  </svg>

                  <p className="text-xs font-mono pt-1" style={{ color: palette.lime }}>
                    Lower-performing consultants benefited more in this study.
                  </p>
                </div>
              </div>

              {/* Right 5 cols: Study Description, Key Takeaway & Clickable Source */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <h4
                    className="text-lg font-display font-extrabold tracking-tight"
                    style={{ color: palette.textMain }}
                  >
                    Harvard / BCG Consulting Trial
                  </h4>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                    Dell&apos;Acqua et al. (2023) tested 758 Boston Consulting Group consultants across 18 realistic knowledge-work tasks inside GPT-4&apos;s capability frontier, measuring quality scores on an expert-graded rubric relative to a no-AI control group.
                  </p>
                </div>

                <div className="pt-4 border-t space-y-1.5" style={{ borderColor: palette.border }}>
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-bold block"
                    style={{ color: palette.lime }}
                  >
                    Key Takeaway
                  </span>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMain }}>
                    AI acted as a skill equalizer on these structured consulting tasks—not a universal guarantee across all professions or tasks outside the model&apos;s frontier.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.hbs.edu/faculty/Pages/item.aspx?num=64700"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold hover:underline"
                    style={{ color: palette.cyan }}
                  >
                    <span>Dell&apos;Acqua et al. (2023), HBS Working Paper 24-013</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenEvidence('')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono cursor-pointer transition-colors"
                    style={{
                      backgroundColor: palette.surfaceSubtle,
                      borderColor: palette.border,
                      color: palette.textMain
                    }}
                  >
                    <BookOpen className="w-3 h-3" style={{ color: palette.lime }} />
                    <span>Open Evidence Vault</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* STUDY 2: STANFORD CALL CENTER                                   */}
          {/* --------------------------------------------------------------- */}
          {activeStudy === 'callcenter' && (
            <div
              role="tabpanel"
              id="study-panel-callcenter"
              aria-labelledby="study-tab-callcenter"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2"
            >
              {/* Left 7 cols: Prominent +14% Finding + Before-vs-After Proportional Chart */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className="text-4xl sm:text-5xl font-mono font-extrabold tabular-nums tracking-tight"
                    style={{ color: palette.cyan }}
                  >
                    +14%
                  </span>
                  <span className="text-sm font-sans" style={{ color: palette.textMuted }}>
                    average issues resolved per hour (NBER Working Paper w31161)
                  </span>
                </div>

                {/* Before vs. After Proportional Bar Chart on Shared 0–140 Index Scale */}
                <div
                  className="p-5 sm:p-6 rounded-xl border space-y-4"
                  style={{
                    backgroundColor: palette.surfaceBg,
                    borderColor: palette.border
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono" style={{ color: palette.textMuted }}>
                    <span>Before vs. after AI rollout (Baseline = 100)</span>
                    <span>n = 5,179 support agents</span>
                  </div>

                  <svg
                    viewBox="0 0 520 186"
                    className="w-full h-auto overflow-visible"
                    role="img"
                    aria-label="Before versus after bar chart showing productivity index rising from 100 baseline to 114 overall average (+14%), and to 134 (+34%) for novice and lower-skilled agents"
                  >
                    {/* Gridlines for 0, 50, 100, 125, 140 (x from 150 to 475 -> 325px total => ~2.32px per index unit) */}
                    {[0, 50, 100, 125, 140].map((tick) => {
                      const x = 150 + tick * 2.32;
                      return (
                        <g key={tick}>
                          <line
                            x1={x}
                            y1="10"
                            x2={x}
                            y2="152"
                            stroke={tick === 100 ? palette.textMuted : palette.border}
                            strokeWidth={tick === 100 ? 1.5 : 1}
                            strokeDasharray={tick === 0 ? undefined : '3 4'}
                          />
                          <text
                            x={x}
                            y="170"
                            textAnchor="middle"
                            fill={palette.textMuted}
                            className="font-mono text-[10px] tabular-nums"
                          >
                            {tick}
                          </text>
                        </g>
                      );
                    })}

                    {/* Row 1: Before AI Baseline = 100 */}
                    <text x="0" y="34" fill={palette.textMain} className="font-sans text-[12px] font-semibold">
                      Before AI (Baseline)
                    </text>
                    <rect x="150" y="18" width="232" height="22" rx="4" fill={palette.textMuted} opacity="0.45" />
                    <text x="390" y="34" fill={palette.textMuted} className="font-mono text-[12px] font-bold tabular-nums">
                      100
                    </text>

                    {/* Row 2: With AI — Overall Average = 114 (+14%) */}
                    <text x="0" y="74" fill={palette.textMain} className="font-sans text-[12px] font-semibold">
                      With AI (All agents)
                    </text>
                    <rect x="150" y="58" width="264.5" height="22" rx="4" fill={palette.cyan} />
                    <text x="422" y="74" fill={palette.cyan} className="font-mono text-[12px] font-bold tabular-nums">
                      114 (+14%)
                    </text>

                    {/* Divider */}
                    <line x1="0" y1="96" x2="490" y2="96" stroke={palette.border} strokeWidth="0.75" />

                    {/* Row 3: Novice & lower-skilled subgroup = 134 (+34%) */}
                    <text x="0" y="122" fill={palette.textMain} className="font-sans text-[11px] font-medium">
                      Novice / lower-skilled
                    </text>
                    <rect x="150" y="106" width="310.9" height="20" rx="4" fill={palette.lime} />
                    <text x="468" y="120" fill={palette.lime} className="font-mono text-[11px] font-bold tabular-nums">
                      +34%
                    </text>

                    {/* Row 4: Experienced agents (~0% gain) */}
                    <text x="0" y="148" fill={palette.textMuted} className="font-sans text-[11px]">
                      Experienced agents
                    </text>
                    <rect x="150" y="134" width="232" height="16" rx="4" fill={palette.textMuted} opacity="0.3" />
                    <text x="390" y="146" fill={palette.textMuted} className="font-mono text-[11px] tabular-nums">
                      ~0% gain
                    </text>
                  </svg>

                  <p className="text-xs font-mono pt-1" style={{ color: palette.textMuted }}>
                    Labelled consistently using the NBER Working Paper (w31161) estimate (+14% overall average; +34% for novice/lower-skilled agents).
                  </p>
                </div>
              </div>

              {/* Right 5 cols: Study Description, Key Takeaway & Clickable Source */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <h4
                    className="text-lg font-display font-extrabold tracking-tight"
                    style={{ color: palette.textMain }}
                  >
                    Stanford / MIT Call Center Field Study
                  </h4>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                    Brynjolfsson, Li &amp; Raymond tracked 5,179 enterprise customer-support agents during a staggered deployment of a conversational AI assistant, measuring resolutions per hour across tenure and skill tiers.
                  </p>
                </div>

                <div className="pt-4 border-t space-y-1.5" style={{ borderColor: palette.border }}>
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-bold block"
                    style={{ color: palette.lime }}
                  >
                    Key Takeaway
                  </span>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMain }}>
                    Less experienced and lower-skilled workers gained the most (+34%), rapidly catching up to seasoned staff, while experienced agents saw virtually no productivity gain.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <EvidenceBadge
                    id="C004"
                    onClick={onOpenEvidence}
                    labelOverride="C004 · NBER w31161 (+14%)"
                  />
                  <EvidenceBadge
                    id="C005"
                    onClick={onOpenEvidence}
                    labelOverride="C005 · Novice Gain (+34%)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* STUDY 3: DENMARK NBER STUDY                                     */}
          {/* --------------------------------------------------------------- */}
          {activeStudy === 'denmark' && (
            <div
              role="tabpanel"
              id="study-panel-denmark"
              aria-labelledby="study-tab-denmark"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2"
            >
              {/* Left 7 cols: Estimate & Uncertainty Bound Visualization */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className="text-3xl sm:text-4xl font-mono font-extrabold tracking-tight"
                    style={{ color: palette.amber }}
                  >
                    No measurable average effect
                  </span>
                  <span className="text-sm font-sans" style={{ color: palette.textMuted }}>
                    on earnings or recorded hours within 2 years (bounds rule out &gt;2%)
                  </span>
                </div>

                {/* Estimate & Statistical Bound Graphic */}
                <div
                  className="p-5 sm:p-6 rounded-xl border space-y-4"
                  style={{
                    backgroundColor: palette.surfaceBg,
                    borderColor: palette.border
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono" style={{ color: palette.textMuted }}>
                    <span>Estimated 2-year average effect &amp; ±2% bound</span>
                    <span>Administrative tax records</span>
                  </div>

                  <svg
                    viewBox="0 0 520 166"
                    className="w-full h-auto overflow-visible"
                    role="img"
                    aria-label="Estimate and uncertainty visualization showing average earnings and recorded hours effects indistinguishable from zero within the study's ±2% statistical bound"
                  >
                    {/* Scale: -4% to +4% mapped across x=180 to x=480 (300px => 37.5px per 1%). 0% is at x=330 */}
                    {/* Shaded ±2% ruled-out bound band (x=255 to x=405) */}
                    <rect
                      x="255"
                      y="20"
                      width="150"
                      height="96"
                      fill={palette.amber}
                      opacity={isDark ? 0.1 : 0.12}
                    />

                    {/* Axis ticks at -4%, -2%, 0%, +2%, +4% */}
                    {[-4, -2, 0, 2, 4].map((tick) => {
                      const x = 330 + tick * 37.5;
                      return (
                        <g key={tick}>
                          <line
                            x1={x}
                            y1="20"
                            x2={x}
                            y2="116"
                            stroke={tick === 0 ? palette.textMain : palette.border}
                            strokeWidth={tick === 0 ? 1.5 : 1}
                            strokeDasharray={tick === 0 ? '4 3' : '2 4'}
                          />
                          <text
                            x={x}
                            y="134"
                            textAnchor="middle"
                            fill={tick === 0 ? palette.textMain : palette.textMuted}
                            className="font-mono text-[10px] font-semibold tabular-nums"
                          >
                            {tick > 0 ? `+${tick}%` : `${tick}%`}
                          </text>
                        </g>
                      );
                    })}

                    <text
                      x="330"
                      y="12"
                      textAnchor="middle"
                      fill={palette.amber}
                      className="font-mono text-[9px] font-semibold"
                    >
                      Documented bound rules out avg. effects &gt; ±2%
                    </text>

                    {/* Row 1: Average Earnings Effect (spans exact ±2% study bound: 255 to 405) */}
                    <text x="0" y="48" fill={palette.textMain} className="font-sans text-[12px] font-semibold">
                      Average earnings
                    </text>
                    <text x="0" y="62" fill={palette.textMuted} className="font-mono text-[10px]">
                      2-year difference-in-diff.
                    </text>
                    <line
                      x1="255"
                      y1="49"
                      x2="405"
                      y2="49"
                      stroke={palette.amber}
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                    <line x1="255" y1="43" x2="255" y2="55" stroke={palette.amber} strokeWidth="1.75" />
                    <line x1="405" y1="43" x2="405" y2="55" stroke={palette.amber} strokeWidth="1.75" />
                    <circle cx="330" cy="49" r="5.5" fill={palette.amber} />

                    {/* Row 2: Recorded Hours Effect (spans exact ±2% study bound: 255 to 405) */}
                    <text x="0" y="92" fill={palette.textMain} className="font-sans text-[12px] font-semibold">
                      Recorded work hours
                    </text>
                    <text x="0" y="106" fill={palette.textMuted} className="font-mono text-[10px]">
                      Exposed occupations
                    </text>
                    <line
                      x1="255"
                      y1="93"
                      x2="405"
                      y2="93"
                      stroke={palette.textMuted}
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                    <line x1="255" y1="87" x2="255" y2="99" stroke={palette.textMuted} strokeWidth="1.75" />
                    <line x1="405" y1="87" x2="405" y2="99" stroke={palette.textMuted} strokeWidth="1.75" />
                    <circle cx="330" cy="93" r="5.5" fill={palette.textMuted} />

                    <text
                      x="330"
                      y="156"
                      textAnchor="middle"
                      fill={palette.textMuted}
                      className="font-mono text-[10px]"
                    >
                      Average effect indistinguishable from zero (individual experiences still vary)
                    </text>
                  </svg>
                </div>
              </div>

              {/* Right 5 cols: Study Description, Key Takeaway & Clickable Source */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <h4
                    className="text-lg font-display font-extrabold tracking-tight"
                    style={{ color: palette.textMain }}
                  >
                    Denmark NBER Administrative Study
                  </h4>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                    Humlum &amp; Vestergaard (NBER w33777) linked nationwide chatbot-adoption surveys across 11 exposed occupations in Denmark to official administrative payroll and tax records over a two-year window (2023–2025).
                  </p>
                </div>

                <div className="pt-4 border-t space-y-1.5" style={{ borderColor: palette.border }}>
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-bold block"
                    style={{ color: palette.amber }}
                  >
                    Key Takeaway
                  </span>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMain }}>
                    Even with widespread adoption and task reorganization, researchers found no detectable average effect on earnings or work hours—showing that faster tasks do not automatically raise pay.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <EvidenceBadge
                    id="C006"
                    onClick={onOpenEvidence}
                    labelOverride="C006 · NBER w33777 (Denmark)"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =================================================================== */}
        {/* 4. CONCISE EDITORIAL CLOSING STATEMENT                              */}
        {/* =================================================================== */}
        <footer
          className="pt-10 pb-2 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: palette.border }}
        >
          <p
            className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight leading-snug max-w-3xl"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            AI can narrow performance gaps, but faster work doesn&apos;t automatically mean higher pay.
          </p>

          <a
            href="#ch06_careers_skills"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 hover:underline self-start sm:self-center"
            style={{ color: palette.lime }}
          >
            <span>Next: Careers &amp; Human Skills</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </footer>
      </div>
    </article>
  );
};
