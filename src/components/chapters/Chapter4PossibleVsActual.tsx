import React, { useState, useEffect, useRef } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, ArrowDown, ChevronDown, ExternalLink } from 'lucide-react';
import { Chapter5RealWorkday } from './Chapter5RealWorkday';

interface Chapter4Props {
  onOpenEvidence: (id: string) => void;
}

type FilterFactorId =
  | 'accuracy'
  | 'privacy'
  | 'training'
  | 'access'
  | 'organisation';

type LensMode = 'capability' | 'observed';
type StudyTabId = 'anthropic' | 'microsoft' | 'ilo';

interface CapabilityNode {
  id: string;
  label: string;
  shortDesc: string;
}

interface FilterFactor {
  id: FilterFactorId;
  label: string;
  explanation: string;
  frictionTag: string;
}

interface ObservedActivity {
  id: string;
  label: string;
  sourceLabel: string;
}

const CAPABILITY_NODES: CapabilityNode[] = [
  { id: 'writing', label: 'Writing & drafting', shortDesc: 'Emails, summaries, memos' },
  { id: 'analysis', label: 'Information analysis', shortDesc: 'Synthesizing reports & notes' },
  { id: 'coding', label: 'Coding', shortDesc: 'Boilerplate, tests & debugging' },
  { id: 'documents', label: 'Document processing', shortDesc: 'Extraction & reformatting' }
];

const REALITY_FILTER_FACTORS: FilterFactor[] = [
  {
    id: 'accuracy',
    label: 'Accuracy & reliability',
    frictionTag: 'Verification burden',
    explanation:
      'Hallucinations and subtle errors require human checking, making adoption slow in high-stakes or regulated work.'
  },
  {
    id: 'privacy',
    label: 'Privacy & compliance',
    frictionTag: 'Data governance',
    explanation:
      'Client confidentiality, IP rules, and legal liability often block employees from pasting sensitive files into public models.'
  },
  {
    id: 'training',
    label: 'Training & confidence',
    frictionTag: 'Skill readiness',
    explanation:
      'Without practical guidance, many workers do not know where AI genuinely saves time or how to verify its outputs.'
  },
  {
    id: 'access',
    label: 'Access to AI tools',
    frictionTag: 'Tool availability',
    explanation:
      'Workplace software licenses, IT blocks, and uneven digital infrastructure limit who can actually use approved tools.'
  },
  {
    id: 'organisation',
    label: 'Organisational decisions',
    frictionTag: 'Workflow & policy',
    explanation:
      'Leadership priorities, team workflows, and unclear usage policies determine whether individual speedups turn into routine practice.'
  }
];

const OBSERVED_ACTIVITIES: ObservedActivity[] = [
  {
    id: 'obs-gather',
    label: 'Searching & summarizing info',
    sourceLabel: 'Microsoft Copilot telemetry'
  },
  {
    id: 'obs-draft',
    label: 'Co-writing & revising drafts',
    sourceLabel: 'Anthropic & Microsoft'
  },
  {
    id: 'obs-code',
    label: 'Iterative coding assistance',
    sourceLabel: 'Anthropic Economic Index'
  }
];

export const Chapter4PossibleVsActual: React.FC<Chapter4Props> = ({ onOpenEvidence }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedFactor, setSelectedFactor] = useState<FilterFactorId>('accuracy');
  const [lensMode, setLensMode] = useState<LensMode>('capability');
  const [activeStudy, setActiveStudy] = useState<StudyTabId>('anthropic');
  const [expandedMethod, setExpandedMethod] = useState<Record<StudyTabId, boolean>>({
    anthropic: false,
    microsoft: false,
    ilo: false
  });
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const filterSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = filterSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    lime: isDark ? '#d7e63b' : '#5c6800',
    amber: isDark ? '#f59e0b' : '#b45309',
    coral: isDark ? '#fb7185' : '#e11d48'
  };

  const activeFactorObj =
    REALITY_FILTER_FACTORS.find((f) => f.id === selectedFactor) || REALITY_FILTER_FACTORS[0];

  const toggleMethodDetails = (tab: StudyTabId) => {
    setExpandedMethod((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <article
      id="ch04_real_workplace"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* =================================================================== */}
        {/* 1. COMPACT OPENING HEADER                                           */}
        {/* =================================================================== */}
        <header className="space-y-3 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span className="font-bold">04</span>
            <span aria-hidden="true">·</span>
            <span>AI in the Real Workplace</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            What Can AI Do — and What Happens at Work?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Being able to perform a task in theory does not mean AI is already doing it in every workplace. Adoption moves through real-world constraints into everyday work.
          </p>
        </header>

        {/* =================================================================== */}
        {/* 2. MAIN VISUALIZATION: THE REALITY FILTER                           */}
        {/* =================================================================== */}
        <section
          ref={filterSectionRef}
          aria-labelledby="reality-filter-heading"
          className="space-y-6"
        >
          <div
            className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b"
            style={{ borderColor: palette.border }}
          >
            <h3
              id="reality-filter-heading"
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: palette.textMuted }}
            >
              The Reality Filter — AI capability ≠ actual AI adoption
            </h3>
            <span className="text-xs font-mono" style={{ color: palette.lime }}>
              Select any constraint in Stage 2
            </span>
          </div>

          {/* 3-Stage Interactive Schematic */}
          <div
            className="rounded-2xl border p-5 sm:p-8 space-y-6"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_64px_1.2fr_64px_1fr] items-stretch gap-4 lg:gap-0">
              {/* STAGE 1: AI CAPABILITY */}
              <div className="flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: palette.textMuted }}
                  >
                    Stage 1 · AI Capability
                  </span>
                  <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                    Tasks AI can assist with in principle
                  </p>
                </div>

                <div className="relative space-y-2.5 py-1">
                  {/* Subtle vertical spine connecting capability nodes */}
                  <div
                    className="hidden sm:block absolute left-3 top-4 bottom-4 w-px"
                    style={{ backgroundColor: palette.border }}
                    aria-hidden="true"
                  />
                  {CAPABILITY_NODES.map((node) => (
                    <div
                      key={node.id}
                      className="relative pl-0 sm:pl-7 flex items-center"
                    >
                      <span
                        className="hidden sm:block absolute left-[9px] w-2 h-2 rounded-full"
                        style={{ backgroundColor: palette.cyan }}
                        aria-hidden="true"
                      />
                      <div
                        className="w-full px-3.5 py-2.5 rounded-lg border border-dashed"
                        style={{
                          backgroundColor: palette.surfaceSubtle,
                          borderColor: palette.border
                        }}
                      >
                        <div className="text-xs font-sans font-semibold" style={{ color: palette.textMain }}>
                          {node.label}
                        </div>
                        <div className="text-[11px] font-mono" style={{ color: palette.textMuted }}>
                          {node.shortDesc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONNECTOR 1 → 2 */}
              <div className="flex items-center justify-center" aria-hidden="true">
                {/* Desktop SVG converging flow */}
                <svg
                  viewBox="0 0 64 220"
                  className="hidden lg:block w-16 h-56 overflow-visible"
                >
                  {[35, 85, 135, 185].map((yStart, i) => (
                    <g key={i}>
                      <path
                        d={`M 0 ${yStart} C 32 ${yStart}, 32 110, 60 110`}
                        fill="none"
                        stroke={palette.border}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      {inView && !reducedMotion && (
                        <circle r="2.8" fill={palette.cyan}>
                          <animateMotion
                            dur={`${2.2 + i * 0.25}s`}
                            repeatCount="indefinite"
                            path={`M 0 ${yStart} C 32 ${yStart}, 32 110, 60 110`}
                          />
                        </circle>
                      )}
                    </g>
                  ))}
                  <polygon points="64,110 56,105 56,115" fill={palette.cyan} />
                </svg>

                {/* Mobile arrow */}
                <ArrowDown className="w-5 h-5 lg:hidden" style={{ color: palette.cyan }} />
              </div>

              {/* STAGE 2: THE REALITY FILTER (Interactive 5-Factor Hub) */}
              <div
                className="rounded-xl border p-4 sm:p-5 flex flex-col justify-between space-y-4"
                style={{
                  backgroundColor: palette.surfaceSubtle,
                  borderColor: palette.amber
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span
                      className="text-[11px] font-mono font-bold uppercase tracking-wider block"
                      style={{ color: palette.amber }}
                    >
                      Stage 2 · The Reality Filter
                    </span>
                    <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                      Workplace conditions that filter capability
                    </p>
                  </div>
                </div>

                {/* 5 Clickable Filter Nodes */}
                <div className="space-y-2" role="group" aria-label="Reality filter factors">
                  {REALITY_FILTER_FACTORS.map((factor) => {
                    const isSelected = selectedFactor === factor.id;
                    return (
                      <button
                        key={factor.id}
                        type="button"
                        onClick={() => setSelectedFactor(factor.id)}
                        aria-pressed={isSelected}
                        className="w-full text-left px-3.5 py-2.5 min-h-[42px] rounded-lg border transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2"
                        style={{
                          backgroundColor: isSelected ? palette.surfaceBg : 'transparent',
                          borderColor: isSelected ? palette.amber : palette.border,
                          color: isSelected ? palette.textMain : palette.textMuted
                        }}
                      >
                        <span className="text-xs font-sans font-semibold">{factor.label}</span>
                        <span
                          className="text-[10px] font-mono whitespace-nowrap shrink-0"
                          style={{ color: isSelected ? palette.amber : palette.textMuted }}
                        >
                          {factor.frictionTag}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Factor Explanation */}
                <div
                  className="pt-3 border-t space-y-1"
                  style={{ borderColor: palette.border }}
                  aria-live="polite"
                >
                  <span
                    className="text-[11px] font-mono font-bold block"
                    style={{ color: palette.amber }}
                  >
                    {activeFactorObj.label}
                  </span>
                  <p className="text-xs font-sans leading-relaxed" style={{ color: palette.textMain }}>
                    {activeFactorObj.explanation}
                  </p>
                </div>
              </div>

              {/* CONNECTOR 2 → 3 */}
              <div className="flex items-center justify-center" aria-hidden="true">
                {/* Desktop SVG selective output paths */}
                <svg
                  viewBox="0 0 64 220"
                  className="hidden lg:block w-16 h-56 overflow-visible"
                >
                  {[48, 110, 172].map((yEnd, i) => (
                    <g key={i}>
                      <path
                        d={`M 0 110 C 32 110, 32 ${yEnd}, 60 ${yEnd}`}
                        fill="none"
                        stroke={palette.amber}
                        strokeWidth="1.5"
                      />
                      {inView && !reducedMotion && (
                        <circle r="2.6" fill={palette.lime}>
                          <animateMotion
                            dur={`${2.6 + i * 0.35}s`}
                            repeatCount="indefinite"
                            path={`M 0 110 C 32 110, 32 ${yEnd}, 60 ${yEnd}`}
                          />
                        </circle>
                      )}
                      <polygon
                        points={`64,${yEnd} 56,${yEnd - 4} 56,${yEnd + 4}`}
                        fill={palette.lime}
                      />
                    </g>
                  ))}
                </svg>

                {/* Mobile arrow */}
                <ArrowDown className="w-5 h-5 lg:hidden" style={{ color: palette.amber }} />
              </div>

              {/* STAGE 3: ACTUAL WORKPLACE USE */}
              <div className="flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: palette.lime }}
                  >
                    Stage 3 · Actual Workplace Use
                  </span>
                  <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                    Illustrative activities observed in studies
                  </p>
                </div>

                <div className="space-y-3 py-1 flex-1 flex flex-col justify-center">
                  {OBSERVED_ACTIVITIES.map((act) => (
                    <div
                      key={act.id}
                      className="px-3.5 py-3 rounded-lg border"
                      style={{
                        backgroundColor: palette.surfaceSubtle,
                        borderColor: palette.cyan
                      }}
                    >
                      <div className="text-xs font-sans font-semibold" style={{ color: palette.textMain }}>
                        {act.label}
                      </div>
                      <div className="text-[10px] font-mono mt-0.5" style={{ color: palette.cyan }}>
                        {act.sourceLabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conceptual Guardrail Strip */}
            <div
              className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              style={{ borderColor: palette.border, color: palette.textMuted }}
            >
              <span className="font-bold" style={{ color: palette.textMain }}>
                AI capability ≠ actual AI adoption
              </span>
              <span>
                Conceptual model — stages reflect different evidence types, not a numeric funnel
              </span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. SECONDARY VISUALIZATION: TWO-LENS EXPLORER                       */}
        {/* =================================================================== */}
        <section
          aria-labelledby="two-lens-heading"
          className="pt-8 border-t space-y-6"
          style={{ borderColor: palette.border }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span
                className="text-xs font-mono uppercase tracking-widest block"
                style={{ color: palette.cyan }}
              >
                Distinguishing Evidence Types
              </span>
              <h3
                id="two-lens-heading"
                className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                style={{ color: palette.textMain }}
              >
                Two-Lens Explorer
              </h3>
            </div>

            {/* Toggle: AI Capability | Observed AI Use */}
            <div
              role="group"
              aria-label="Evidence lens toggle"
              className="inline-flex p-1 rounded-lg border self-start sm:self-auto"
              style={{
                backgroundColor: palette.surfaceSubtle,
                borderColor: palette.border
              }}
            >
              <button
                type="button"
                onClick={() => setLensMode('capability')}
                aria-pressed={lensMode === 'capability'}
                className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: lensMode === 'capability' ? palette.amber : 'transparent',
                  color:
                    lensMode === 'capability'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                }}
              >
                AI Capability
              </button>
              <button
                type="button"
                onClick={() => setLensMode('observed')}
                aria-pressed={lensMode === 'observed'}
                className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: lensMode === 'observed' ? palette.cyan : 'transparent',
                  color:
                    lensMode === 'observed'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                }}
              >
                Observed AI Use
              </button>
            </div>
          </div>

          {/* Distinct Visual Treatment per Lens */}
          {lensMode === 'capability' ? (
            <div
              className="rounded-xl border border-dashed p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-200"
              style={{
                backgroundColor: palette.surfaceSubtle,
                borderColor: palette.amber
              }}
            >
              {/* Theoretical Blueprint Matrix SVG */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono" style={{ color: palette.amber }}>
                  <span>THEORETICAL TASK EXPOSURE MATRIX</span>
                  <span>Assumes zero friction</span>
                </div>
                <svg
                  viewBox="0 0 390 154"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Schematic blueprint showing theoretical task exposure: 80% of US workers with at least 10% tasks exposed in Eloundou et al., versus 25% global employment with some ILO exposure"
                >
                  {/* Blueprint Grid */}
                  <rect
                    x="4"
                    y="4"
                    width="382"
                    height="146"
                    rx="6"
                    fill="none"
                    stroke={palette.border}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  {/* US Task Benchmark (Eloundou et al.) */}
                  <text x="18" y="34" fill={palette.textMain} className="font-sans text-[11px] font-semibold">
                    US task exposure benchmark (Eloundou et al.)
                  </text>
                  <rect x="18" y="42" width="354" height="16" rx="3" fill={palette.surfaceBg} stroke={palette.border} />
                  <rect
                    x="18"
                    y="42"
                    width="283"
                    height="16"
                    rx="3"
                    fill="none"
                    stroke={palette.amber}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <rect x="18" y="42" width="67" height="16" rx="3" fill={palette.amber} opacity="0.45" />
                  <text x="18" y="74" fill={palette.amber} className="font-mono text-[10px]">
                    19% ≥50% tasks exposed · 80% ≥10% tasks exposed
                  </text>

                  {/* ILO Global Occupational Exposure */}
                  <text x="18" y="102" fill={palette.textMain} className="font-sans text-[11px] font-semibold">
                    Global occupational exposure (ILO 2025)
                  </text>
                  <rect x="18" y="110" width="354" height="16" rx="3" fill={palette.surfaceBg} stroke={palette.border} />
                  <rect
                    x="18"
                    y="110"
                    width="88.5"
                    height="16"
                    rx="3"
                    fill="none"
                    stroke={palette.amber}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <rect x="18" y="110" width="11.7" height="16" rx="2" fill={palette.coral} />
                  <text x="18" y="140" fill={palette.textMuted} className="font-mono text-[10px]">
                    25% some exposure · 3.3% highest exposure tier
                  </text>
                </svg>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase" style={{ color: palette.amber }}>
                  Theoretical Exposure Evidence
                </span>
                <h4 className="text-xl font-display font-extrabold tracking-tight" style={{ color: palette.textMain }}>
                  What tasks overlap with language-model capability
                </h4>
                <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                  Exposure studies map job task lists against what models can theoretically process. They measure <em>potential task overlap</em> under laboratory assumptions—not real-world software adoption or headcount changes.
                </p>
                <p className="text-xs font-mono pt-1" style={{ color: palette.textMuted }}>
                  Note: US (Eloundou et al.) and global (ILO) figures use different task taxonomies and populations.
                </p>
              </div>
            </div>
          ) : (
            <div
              className="rounded-xl border p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-200"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.cyan
              }}
            >
              {/* Solid Observed Activity Clusters */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono" style={{ color: palette.cyan }}>
                  <span>DOCUMENTED WORKPLACE TELEMETRY</span>
                  <span>Separate empirical samples</span>
                </div>
                <svg
                  viewBox="0 0 390 154"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Observed workplace AI usage telemetry across separate Anthropic and Microsoft studies"
                >
                  <rect
                    x="4"
                    y="4"
                    width="382"
                    height="146"
                    rx="6"
                    fill={palette.surfaceSubtle}
                    stroke={palette.border}
                    strokeWidth="1"
                  />
                  {/* Anthropic Economic Index */}
                  <text x="18" y="30" fill={palette.textMain} className="font-sans text-[11px] font-semibold">
                    Anthropic Claude work conversations (by SOC role)
                  </text>
                  <rect x="18" y="38" width="201.8" height="16" rx="3" fill={palette.cyan} />
                  <rect x="223" y="38" width="149" height="16" rx="3" fill={palette.textMuted} opacity="0.45" />
                  <text x="18" y="70" fill={palette.cyan} className="font-mono text-[10px]">
                    57% augmentation · 43% automation (36% of roles)
                  </text>

                  {/* Microsoft 200k Enterprise Copilot */}
                  <text x="18" y="98" fill={palette.textMain} className="font-sans text-[11px] font-semibold">
                    Microsoft 200k enterprise Copilot sessions
                  </text>
                  <rect x="18" y="106" width="148.7" height="16" rx="3" fill={palette.cyan} />
                  <rect x="170" y="106" width="120.4" height="16" rx="3" fill={palette.lime} />
                  <rect x="294" y="106" width="78" height="16" rx="3" fill={palette.textMuted} opacity="0.6" />
                  <text x="18" y="138" fill={palette.textMuted} className="font-mono text-[10px]">
                    42% gathering info · 34% writing · 24% advising
                  </text>
                </svg>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase" style={{ color: palette.cyan }}>
                  Observed Workplace Evidence
                </span>
                <h4 className="text-xl font-display font-extrabold tracking-tight" style={{ color: palette.textMain }}>
                  How workers actually invoke AI in live settings
                </h4>
                <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                  Session logs from Anthropic and Microsoft capture what consenting enterprise or platform users actually ask AI to do: mostly gathering information, drafting copy, and co-working alongside human judgement.
                </p>
                <p className="text-xs font-mono pt-1" style={{ color: palette.textMuted }}>
                  Note: Platform telemetry reflects active AI users in each system, not the entire labour market.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* =================================================================== */}
        {/* 4. RESEARCH EVIDENCE EXPLORER                                       */}
        {/* =================================================================== */}
        <section
          aria-labelledby="ch04-evidence-heading"
          className="pt-8 border-t space-y-6"
          style={{ borderColor: palette.border }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span
                className="text-xs font-mono uppercase tracking-widest block"
                style={{ color: palette.cyan }}
              >
                Empirical Studies &amp; Exposure Benchmarks
              </span>
              <h3
                id="ch04-evidence-heading"
                className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                style={{ color: palette.textMain }}
              >
                Research evidence explorer
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Section 04 research studies"
              onKeyDown={(e) => {
                const order: StudyTabId[] = ['anthropic', 'microsoft', 'ilo'];
                const idx = order.indexOf(activeStudy);
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const next = order[(idx + 1) % order.length];
                  setActiveStudy(next);
                  document.getElementById(`ch04-tab-${next}`)?.focus();
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prev = order[(idx - 1 + order.length) % order.length];
                  setActiveStudy(prev);
                  document.getElementById(`ch04-tab-${prev}`)?.focus();
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
                  { id: 'anthropic', label: 'Anthropic Economic Index' },
                  { id: 'microsoft', label: 'Microsoft Research' },
                  { id: 'ilo', label: 'ILO Exposure' }
                ] as { id: StudyTabId; label: string }[]
              ).map((tab) => {
                const selected = activeStudy === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`ch04-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`ch04-panel-${tab.id}`}
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
          {/* TAB 1: ANTHROPIC ECONOMIC INDEX                                 */}
          {/* --------------------------------------------------------------- */}
          {activeStudy === 'anthropic' && (
            <div
              role="tabpanel"
              id="ch04-panel-anthropic"
              aria-labelledby="ch04-tab-anthropic"
              className="rounded-xl border p-6 sm:p-8 space-y-6"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h4
                    className="text-xl font-display font-extrabold tracking-tight"
                    style={{ color: palette.textMain }}
                  >
                    Anthropic Economic Index: Augmentation vs. Automation
                  </h4>
                  <p className="text-sm font-sans mt-1" style={{ color: palette.textMuted }}>
                    In 36% of US SOC occupations, Claude is invoked for at least a quarter of tasks—mostly collaboratively.
                  </p>
                </div>
                <span className="text-xs font-mono" style={{ color: palette.cyan }}>
                  Observed platform usage
                </span>
              </div>

              {/* 100% Stacked Bar Visualization (57% vs 43%) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span style={{ color: palette.cyan }} className="font-bold">
                    57% Augmentation (Co-working)
                  </span>
                  <span style={{ color: palette.textMuted }} className="font-bold">
                    43% Automation (Directive)
                  </span>
                </div>

                <div
                  className="w-full h-10 rounded-lg overflow-hidden flex border"
                  style={{ borderColor: palette.border }}
                  role="img"
                  aria-label="100% stacked horizontal bar showing 57% augmentation versus 43% automation in Anthropic Economic Index workplace conversations"
                >
                  <div
                    className="h-full flex items-center px-4 text-xs font-mono font-bold tabular-nums"
                    style={{
                      width: '57%',
                      backgroundColor: palette.cyan,
                      color: isDark ? '#061329' : '#ffffff'
                    }}
                  >
                    57%
                  </div>
                  <div
                    className="h-full flex items-center justify-end px-4 text-xs font-mono font-bold tabular-nums"
                    style={{
                      width: '43%',
                      backgroundColor: palette.surfaceSubtle,
                      color: palette.textMain
                    }}
                  >
                    43%
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs font-sans" style={{ color: palette.textMuted }}>
                  <p>
                    <strong style={{ color: palette.textMain }}>Augmentation (57%):</strong> Worker iterates, validates, and steers outputs back and forth with the model.
                  </p>
                  <p>
                    <strong style={{ color: palette.textMain }}>Automation (43%):</strong> Model executes a standalone request (e.g., translating, formatting) with minimal back-and-forth.
                  </p>
                </div>
              </div>

              {/* Expandable Methodology & Source Details */}
              <div className="pt-3 border-t" style={{ borderColor: palette.border }}>
                <button
                  type="button"
                  onClick={() => toggleMethodDetails('anthropic')}
                  aria-expanded={expandedMethod.anthropic}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold cursor-pointer hover:underline"
                  style={{ color: palette.cyan }}
                >
                  <span>Methodology, population &amp; limitations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      expandedMethod.anthropic ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedMethod.anthropic && (
                  <div
                    className="mt-3 pt-3 border-t text-xs font-sans space-y-2"
                    style={{ borderColor: palette.border, color: palette.textMuted }}
                  >
                    <p>
                      <strong style={{ color: palette.textMain }}>Population &amp; method:</strong> Millions of anonymized Claude.ai workplace conversations mapped to US O*NET / SOC occupational tasks (Anthropic Economic Index, 2025).
                    </p>
                    <p>
                      <strong style={{ color: palette.textMain }}>Limitation:</strong> Measures task patterns among active Claude users; excludes non-adopters, physical industries, and enterprise API workflows.
                    </p>
                    <a
                      href="https://www.anthropic.com/news/the-anthropic-economic-index"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono font-semibold hover:underline"
                      style={{ color: palette.cyan }}
                    >
                      <span>View Anthropic Economic Index</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* TAB 2: MICROSOFT WORKPLACE AI RESEARCH                          */}
          {/* --------------------------------------------------------------- */}
          {activeStudy === 'microsoft' && (
            <div
              role="tabpanel"
              id="ch04-panel-microsoft"
              aria-labelledby="ch04-tab-microsoft"
              className="rounded-xl border p-6 sm:p-8 space-y-6"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h4
                    className="text-xl font-display font-extrabold tracking-tight"
                    style={{ color: palette.textMain }}
                  >
                    Microsoft Research: 200,000 Enterprise Copilot Sessions
                  </h4>
                  <p className="text-sm font-sans mt-1" style={{ color: palette.textMuted }}>
                    Most observed enterprise interactions cluster around finding information, drafting text, and advising.
                  </p>
                </div>
                <span className="text-xs font-mono" style={{ color: palette.cyan }}>
                  Ranked work activities
                </span>
              </div>

              {/* Ranked Horizontal Activity Chart */}
              <div className="space-y-4">
                {[
                  {
                    rank: '01',
                    activity: 'Information Gathering',
                    share: 42,
                    detail: 'Searching internal docs, summarizing meetings, extracting action items',
                    color: palette.cyan
                  },
                  {
                    rank: '02',
                    activity: 'Writing & Drafting',
                    share: 34,
                    detail: 'Drafting emails, memos, documentation outlines, and client phrasing',
                    color: palette.lime
                  },
                  {
                    rank: '03',
                    activity: 'Advising & Ideation',
                    share: 24,
                    detail: 'Brainstorming risks, spreadsheet formulas, structure, and code checks',
                    color: palette.amber
                  }
                ].map((item) => (
                  <div key={item.rank} className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono font-bold" style={{ color: item.color }}>
                          #{item.rank}
                        </span>
                        <span className="font-sans font-semibold text-sm" style={{ color: palette.textMain }}>
                          {item.activity}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm tabular-nums" style={{ color: item.color }}>
                        {item.share}%
                      </span>
                    </div>
                    <div
                      className="h-3.5 w-full rounded-md overflow-hidden"
                      style={{ backgroundColor: palette.surfaceSubtle }}
                    >
                      <div
                        className="h-full rounded-md"
                        style={{
                          width: `${(item.share / 50) * 100}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Expandable Methodology & Source Details */}
              <div className="pt-3 border-t" style={{ borderColor: palette.border }}>
                <button
                  type="button"
                  onClick={() => toggleMethodDetails('microsoft')}
                  aria-expanded={expandedMethod.microsoft}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold cursor-pointer hover:underline"
                  style={{ color: palette.cyan }}
                >
                  <span>Methodology, population &amp; limitations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      expandedMethod.microsoft ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedMethod.microsoft && (
                  <div
                    className="mt-3 pt-3 border-t text-xs font-sans space-y-2"
                    style={{ borderColor: palette.border, color: palette.textMuted }}
                  >
                    <p>
                      <strong style={{ color: palette.textMain }}>Population &amp; method:</strong> Empirical classification of 200,000 anonymized enterprise Microsoft Copilot interactions across knowledge-work tenants.
                    </p>
                    <p>
                      <strong style={{ color: palette.textMain }}>Limitation:</strong> Reflects enterprise information workers with Copilot licenses; percentages show share of observed AI activities, not total hours worked.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* TAB 3: ILO GLOBAL EXPOSURE                                      */}
          {/* --------------------------------------------------------------- */}
          {activeStudy === 'ilo' && (
            <div
              role="tabpanel"
              id="ch04-panel-ilo"
              aria-labelledby="ch04-tab-ilo"
              className="rounded-xl border p-6 sm:p-8 space-y-6"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4
                    className="text-xl font-display font-extrabold tracking-tight"
                    style={{ color: palette.textMain }}
                  >
                    ILO 2025: Global Occupational AI Exposure
                  </h4>
                  <p className="text-sm font-sans mt-1" style={{ color: palette.textMuted }}>
                    Exposure measures potential task overlap—not actual workplace adoption or inevitable job loss.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="C001 · 25% Exposed" />
                  <EvidenceBadge id="C002" onClick={onOpenEvidence} labelOverride="C002 · 3.3% Highest" />
                  <EvidenceBadge id="C003" onClick={onOpenEvidence} labelOverride="C003 · Income Gap" />
                </div>
              </div>

              {/* Segmented 100-Unit Population Grid + Income Divide */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono" style={{ color: palette.textMuted }}>
                    <span>Global employment exposure (100 cells = 100% of workforce)</span>
                  </div>

                  {/* 10x10 Segmented Population Grid */}
                  <div
                    className="grid grid-cols-10 gap-1.5 p-3 rounded-lg border"
                    style={{
                      backgroundColor: palette.surfaceSubtle,
                      borderColor: palette.border
                    }}
                    role="img"
                    aria-label="Segmented 100-unit diagram of global employment: 3.3% in highest GenAI exposure category, about 22% in moderate/lower exposure (25% total exposed), and 75% unexposed"
                  >
                    {Array.from({ length: 100 }).map((_, idx) => {
                      // First 3 cells (~3.3%) = Highest exposure; cells 3..24 (25% total) = Other GenAI exposure; cells 25..99 = Minimal/no GenAI exposure
                      const isHighest = idx < 3;
                      const isExposed = idx >= 3 && idx < 25;
                      return (
                        <div
                          key={idx}
                          className="h-3.5 sm:h-4 rounded-[2px]"
                          style={{
                            backgroundColor: isHighest
                              ? palette.coral
                              : isExposed
                              ? palette.cyan
                              : palette.border,
                            opacity: isHighest || isExposed ? 1 : 0.45
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5" style={{ color: palette.coral }}>
                      <span className="w-2.5 h-2.5 rounded-xs inline-block" style={{ backgroundColor: palette.coral }} />
                      3.3% highest exposure tier
                    </span>
                    <span className="inline-flex items-center gap-1.5" style={{ color: palette.cyan }}>
                      <span className="w-2.5 h-2.5 rounded-xs inline-block" style={{ backgroundColor: palette.cyan }} />
                      ~25% total with some GenAI exposure
                    </span>
                    <span className="inline-flex items-center gap-1.5" style={{ color: palette.textMuted }}>
                      <span className="w-2.5 h-2.5 rounded-xs inline-block" style={{ backgroundColor: palette.border }} />
                      ~75% minimal / no exposure
                    </span>
                  </div>
                </div>

                {/* High-Income vs Low-Income Contrast */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider" style={{ color: palette.amber }}>
                    Country-Income Exposure Gradient
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span style={{ color: palette.textMain }}>High-income economies</span>
                        <span className="font-bold tabular-nums" style={{ color: palette.cyan }}>
                          34%
                        </span>
                      </div>
                      <div className="h-3 rounded" style={{ backgroundColor: palette.surfaceSubtle }}>
                        <div className="h-full rounded" style={{ width: '68%', backgroundColor: palette.cyan }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span style={{ color: palette.textMain }}>Low-income economies</span>
                        <span className="font-bold tabular-nums" style={{ color: palette.amber }}>
                          11%
                        </span>
                      </div>
                      <div className="h-3 rounded" style={{ backgroundColor: palette.surfaceSubtle }}>
                        <div className="h-full rounded" style={{ width: '22%', backgroundColor: palette.amber }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                    Reflects job mix (clerical and knowledge services vs. agriculture and physical work)—and remember, <strong style={{ color: palette.textMain }}>exposure is not adoption</strong>.
                  </p>
                </div>
              </div>

              {/* Expandable Methodology & Source Details */}
              <div className="pt-3 border-t" style={{ borderColor: palette.border }}>
                <button
                  type="button"
                  onClick={() => toggleMethodDetails('ilo')}
                  aria-expanded={expandedMethod.ilo}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold cursor-pointer hover:underline"
                  style={{ color: palette.cyan }}
                >
                  <span>Methodology, population &amp; limitations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      expandedMethod.ilo ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedMethod.ilo && (
                  <div
                    className="mt-3 pt-3 border-t text-xs font-sans space-y-2"
                    style={{ borderColor: palette.border, color: palette.textMuted }}
                  >
                    <p>
                      <strong style={{ color: palette.textMain }}>Population &amp; method:</strong> ILO May 2025 refined task-level methodology across 29,753 tasks mapped to international employment classifications.
                    </p>
                    <p>
                      <strong style={{ color: palette.textMain }}>Limitation:</strong> Potential exposure assumes tools can be integrated into workflows; it does not measure real adoption, infrastructure access, or job displacement.
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenEvidence('S01')}
                      className="inline-flex items-center gap-1 font-mono font-semibold cursor-pointer hover:underline"
                      style={{ color: palette.cyan }}
                    >
                      <span>Open full ILO source record (S01)</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* =================================================================== */}
        {/* 5. ILLUSTRATIVE WORKDAY EXPLORER (EMBEDDED FROM CH05)               */}
        {/* =================================================================== */}
        <Chapter5RealWorkday embedded onOpenEvidence={onOpenEvidence} />

        {/* =================================================================== */}
        {/* 6. CONCISE CLOSING MESSAGE                                          */}
        {/* =================================================================== */}
        <footer
          className="pt-10 pb-2 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: palette.border }}
        >
          <p
            className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight leading-snug max-w-3xl"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            AI can assist with tasks. People still make important decisions.
          </p>

          <a
            href="#ch05_productivity"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 hover:underline self-start sm:self-center"
            style={{ color: palette.lime }}
          >
            <span>Next: Productivity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </footer>
      </div>
    </article>
  );
};
