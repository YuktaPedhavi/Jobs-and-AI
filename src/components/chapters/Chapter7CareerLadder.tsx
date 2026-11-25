import React, { useState, useEffect } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight } from 'lucide-react';
import { Chapter8NewAdvantage } from './Chapter8NewAdvantage';

interface Chapter7Props {
  onOpenEvidence: (id: string) => void;
}

type AssistanceMode = 'traditional' | 'ai_assisted';
type LoopMode = 'traditional' | 'ai_assisted';

interface TaskNode {
  id: string;
  traditionalLabel: string;
  aiLabel: string;
  traditionalSkills: string[];
  aiSkills: string[];
  traditionalExplanation: string;
  aiExplanation: string;
}

interface SkillNode {
  id: string;
  label: string;
}

const BEGINNER_TASKS: TaskNode[] = [
  {
    id: 'research',
    traditionalLabel: 'Basic research',
    aiLabel: 'Checking AI-generated research & sources',
    traditionalSkills: ['critical_thinking', 'attention'],
    aiSkills: ['critical_thinking', 'attention', 'judgement'],
    traditionalExplanation:
      'Research helps people practise finding information, evaluating sources and drawing conclusions.',
    aiExplanation:
      'Verifying AI summaries trains beginners to question claims, trace primary sources and spot plausible errors.'
  },
  {
    id: 'drafting',
    traditionalLabel: 'Writing initial drafts',
    aiLabel: 'Reviewing & improving AI drafts',
    traditionalSkills: ['communication', 'critical_thinking'],
    aiSkills: ['communication', 'critical_thinking', 'judgement'],
    traditionalExplanation:
      'Writing from a blank page teaches how to structure an argument clearly for a real audience.',
    aiExplanation:
      'Critiquing and reshaping machine drafts helps beginners recognise weak logic, missing context and tone issues.'
  },
  {
    id: 'data',
    traditionalLabel: 'Cleaning & organising data',
    aiLabel: 'Validating AI-assisted data processing',
    traditionalSkills: ['attention', 'problem_solving'],
    aiSkills: ['attention', 'problem_solving'],
    traditionalExplanation:
      'Tidying messy spreadsheets builds patience and an instinct for spotting outliers and formatting errors.',
    aiExplanation:
      'Auditing AI-cleaned tables teaches how to test edge cases, catch silent assumptions and verify data integrity.'
  },
  {
    id: 'reviewing',
    traditionalLabel: 'Reviewing & correcting work',
    aiLabel: 'Auditing AI outputs for edge cases',
    traditionalSkills: ['attention', 'judgement'],
    aiSkills: ['attention', 'judgement'],
    traditionalExplanation:
      'Proofreading and checking calculations sharpens precision and accountability before work leaves the desk.',
    aiExplanation:
      'Checking AI output before sign-off shifts beginners earlier into a quality-control and risk-spotting mindset.'
  },
  {
    id: 'presentations',
    traditionalLabel: 'Preparing simple presentations',
    aiLabel: 'Evaluating AI-generated structure & slides',
    traditionalSkills: ['communication', 'problem_solving'],
    aiSkills: ['communication', 'problem_solving', 'judgement'],
    traditionalExplanation:
      'Turning raw notes into slides practises distilling complex ideas into a clear visual narrative.',
    aiExplanation:
      'Refining AI-drafted decks trains juniors to cut clutter, sharpen the core message and adapt to stakeholders.'
  }
];

const SKILLS_DEVELOPED: SkillNode[] = [
  { id: 'critical_thinking', label: 'Critical thinking' },
  { id: 'communication', label: 'Communication' },
  { id: 'attention', label: 'Attention to detail' },
  { id: 'problem_solving', label: 'Problem-solving' },
  { id: 'judgement', label: 'Professional judgement' }
];

const LOOP_PATHWAYS: Record<
  LoopMode,
  {
    title: string;
    subtitle: string;
    steps: { num: string; label: string; caption: string }[];
  }
> = {
  traditional: {
    title: 'Traditional Pathway',
    subtitle: 'Learning built through repeated manual execution and mentor redlines',
    steps: [
      { num: '01', label: 'Perform Task', caption: 'Execute routine work firsthand' },
      { num: '02', label: 'Receive Feedback', caption: 'Mentors mark errors & gaps' },
      { num: '03', label: 'Improve', caption: 'Internalize standards & nuance' },
      { num: '04', label: 'Repeat', caption: 'Build tacit pattern memory' }
    ]
  },
  ai_assisted: {
    title: 'AI-Assisted Pathway',
    subtitle: 'Learning shifts toward steering tools, verifying outputs and deliberate practice',
    steps: [
      { num: '01', label: 'Use AI', caption: 'Frame prompt & task constraints' },
      { num: '02', label: 'Evaluate Output', caption: 'Test accuracy & edge cases' },
      { num: '03', label: 'Apply Feedback', caption: 'Refine judgement with mentors' },
      { num: '04', label: 'Practise', caption: 'Reinforce fundamentals directly' }
    ]
  }
};

export const Chapter7CareerLadder: React.FC<Chapter7Props> = ({ onOpenEvidence }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [assistanceMode, setAssistanceMode] = useState<AssistanceMode>('traditional');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('research');
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [loopMode, setLoopMode] = useState<LoopMode>('traditional');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
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

  const activeTaskId = hoveredTaskId ?? selectedTaskId;
  const activeTask = BEGINNER_TASKS.find((t) => t.id === activeTaskId) || BEGINNER_TASKS[0];
  const activeSkillsForTask =
    assistanceMode === 'traditional' ? activeTask.traditionalSkills : activeTask.aiSkills;

  // Row center coordinates in SVG viewBox 0..200 x 0..340 (5 equal rows: 34, 102, 170, 238, 306)
  const getRowY = (index: number) => 34 + index * 68;

  const activeAccent = assistanceMode === 'traditional' ? palette.cyan : palette.lime;
  const activeLoop = LOOP_PATHWAYS[loopMode];

  return (
    <article
      id="ch06_careers_skills"
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
            <span className="font-bold">06</span>
            <span aria-hidden="true">·</span>
            <span>Careers &amp; Human Skills</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            What Skills Will Matter Next?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Changing entry-level tasks reshape how beginners build experience—and shift which human capabilities become harder to replace.
          </p>
        </header>

        {/* =================================================================== */}
        {/* 2. INTERACTIVE TASK-TO-SKILL MAP + AI ASSISTANCE TOGGLE             */}
        {/* =================================================================== */}
        <section aria-labelledby="task-skill-map-heading" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span
                className="text-xs font-mono uppercase tracking-widest block"
                style={{ color: palette.cyan }}
              >
                Conceptual Learning Map
              </span>
              <h3
                id="task-skill-map-heading"
                className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                style={{ color: palette.textMain }}
              >
                How beginner tasks build professional skills
              </h3>
            </div>

            {/* AI Assistance Toggle */}
            <div
              role="group"
              aria-label="Practice mode toggle"
              className="inline-flex p-1 rounded-lg border self-start md:self-auto"
              style={{
                backgroundColor: palette.surfaceSubtle,
                borderColor: palette.border
              }}
            >
              <button
                type="button"
                onClick={() => setAssistanceMode('traditional')}
                aria-pressed={assistanceMode === 'traditional'}
                className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor:
                    assistanceMode === 'traditional' ? palette.cyan : 'transparent',
                  color:
                    assistanceMode === 'traditional'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                }}
              >
                Traditional Practice
              </button>
              <button
                type="button"
                onClick={() => setAssistanceMode('ai_assisted')}
                aria-pressed={assistanceMode === 'ai_assisted'}
                className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor:
                    assistanceMode === 'ai_assisted' ? palette.lime : 'transparent',
                  color:
                    assistanceMode === 'ai_assisted'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                }}
              >
                With AI Assistance
              </button>
            </div>
          </div>

          {/* Interactive Network Container */}
          <div
            className="rounded-2xl border p-4 sm:p-8 space-y-6"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            {/* Column Headers */}
            <div className="grid grid-cols-[1fr_56px_1fr] sm:grid-cols-[1fr_140px_1fr] md:grid-cols-[260px_1fr_240px] items-center text-[11px] font-mono uppercase tracking-wider">
              <span style={{ color: activeAccent }} className="font-bold">
                {assistanceMode === 'traditional'
                  ? 'Beginner Tasks'
                  : 'AI-Assisted Beginner Tasks'}
              </span>
              <span className="text-center" style={{ color: palette.textMuted }}>
                <span className="hidden sm:inline">Connections</span>
              </span>
              <span className="text-right font-bold" style={{ color: palette.textMain }}>
                Skills Developed
              </span>
            </div>

            {/* Dual Node Columns + Central Curved SVG Web */}
            <div className="grid grid-cols-[1fr_56px_1fr] sm:grid-cols-[1fr_140px_1fr] md:grid-cols-[260px_1fr_240px] items-stretch">
              {/* Left Column: 5 Beginner Tasks */}
              <div className="flex flex-col justify-between gap-2.5">
                {BEGINNER_TASKS.map((task) => {
                  const isActive = activeTaskId === task.id;
                  const isDimmed = activeTaskId !== null && !isActive;

                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => setSelectedTaskId(task.id)}
                      onMouseEnter={() => setHoveredTaskId(task.id)}
                      onMouseLeave={() => setHoveredTaskId(null)}
                      onFocus={() => setSelectedTaskId(task.id)}
                      aria-pressed={selectedTaskId === task.id}
                      className="h-[68px] sm:h-[60px] px-3 sm:px-4 rounded-lg border text-left transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2"
                      style={{
                        backgroundColor: isActive
                          ? palette.surfaceSubtle
                          : 'transparent',
                        borderColor: isActive ? activeAccent : palette.border,
                        opacity: isDimmed ? 0.42 : 1
                      }}
                    >
                      <span
                        className="text-xs sm:text-sm font-sans font-semibold leading-tight"
                        style={{ color: palette.textMain }}
                      >
                        {assistanceMode === 'traditional'
                          ? task.traditionalLabel
                          : task.aiLabel}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: isActive ? activeAccent : palette.border
                        }}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Center SVG Curved Connectors */}
              <div className="relative" aria-hidden="true">
                <svg
                  viewBox="0 0 200 340"
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible"
                >
                  {BEGINNER_TASKS.map((task, tIdx) => {
                    const skills =
                      assistanceMode === 'traditional'
                        ? task.traditionalSkills
                        : task.aiSkills;
                    const y1 = getRowY(tIdx);
                    const isTaskHighlighted = activeTaskId === task.id;

                    return skills.map((skillId) => {
                      const sIdx = SKILLS_DEVELOPED.findIndex((s) => s.id === skillId);
                      if (sIdx === -1) return null;
                      const y2 = getRowY(sIdx);
                      const pathD = `M 0 ${y1} C 95 ${y1}, 105 ${y2}, 200 ${y2}`;

                      return (
                        <path
                          key={`${task.id}-${skillId}`}
                          d={pathD}
                          fill="none"
                          stroke={isTaskHighlighted ? activeAccent : palette.border}
                          strokeWidth={isTaskHighlighted ? 2.5 : 1.15}
                          opacity={isTaskHighlighted ? 1 : 0.22}
                          className={
                            reducedMotion ? '' : 'transition-all duration-200'
                          }
                        />
                      );
                    });
                  })}
                </svg>
              </div>

              {/* Right Column: 5 Skills Developed */}
              <div className="flex flex-col justify-between gap-2.5">
                {SKILLS_DEVELOPED.map((skill) => {
                  const isConnected = activeSkillsForTask.includes(skill.id);

                  return (
                    <div
                      key={skill.id}
                      className="h-[68px] sm:h-[60px] px-3 sm:px-4 rounded-lg border flex items-center gap-2 transition-all duration-150"
                      style={{
                        backgroundColor: isConnected
                          ? palette.surfaceSubtle
                          : 'transparent',
                        borderColor: isConnected ? activeAccent : palette.border,
                        opacity: isConnected ? 1 : 0.3
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: isConnected ? activeAccent : palette.border
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs sm:text-sm font-sans font-semibold leading-tight"
                        style={{ color: palette.textMain }}
                      >
                        {skill.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Task Explanation Bar */}
            <div
              className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{ borderColor: palette.border }}
              aria-live="polite"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold" style={{ color: activeAccent }}>
                  <span>
                    {assistanceMode === 'traditional'
                      ? activeTask.traditionalLabel
                      : activeTask.aiLabel}
                  </span>
                  <span aria-hidden="true">→</span>
                  <span>
                    {activeSkillsForTask
                      .map((id) => SKILLS_DEVELOPED.find((s) => s.id === id)?.label)
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </div>
                <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMain }}>
                  {assistanceMode === 'traditional'
                    ? activeTask.traditionalExplanation
                    : activeTask.aiExplanation}
                </p>
              </div>

              <span className="text-[11px] font-mono shrink-0" style={{ color: palette.textMuted }}>
                {assistanceMode === 'traditional'
                  ? 'Select any task on the left'
                  : 'Learning shifts from execution to evaluation'}
              </span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. INTERACTIVE LEARNING LOOP                                        */}
        {/* =================================================================== */}
        <section
          aria-labelledby="learning-loop-heading"
          className="pt-8 border-t space-y-6"
          style={{ borderColor: palette.border }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span
                className="text-xs font-mono uppercase tracking-widest block"
                style={{ color: palette.cyan }}
              >
                How Competence Compounds
              </span>
              <h3
                id="learning-loop-heading"
                className="text-2xl font-display font-extrabold tracking-tight"
                style={{ color: palette.textMain }}
              >
                The Learning Loop
              </h3>
            </div>

            {/* Pathway Switch */}
            <div
              role="group"
              aria-label="Learning loop pathway toggle"
              className="inline-flex p-1 rounded-lg border self-start sm:self-auto"
              style={{
                backgroundColor: palette.surfaceSubtle,
                borderColor: palette.border
              }}
            >
              <button
                type="button"
                onClick={() => setLoopMode('traditional')}
                aria-pressed={loopMode === 'traditional'}
                className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor:
                    loopMode === 'traditional' ? palette.cyan : 'transparent',
                  color:
                    loopMode === 'traditional'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                }}
              >
                Traditional Pathway
              </button>
              <button
                type="button"
                onClick={() => setLoopMode('ai_assisted')}
                aria-pressed={loopMode === 'ai_assisted'}
                className="px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor:
                    loopMode === 'ai_assisted' ? palette.lime : 'transparent',
                  color:
                    loopMode === 'ai_assisted'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                }}
              >
                AI-Assisted Pathway
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl border p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            {/* Circular SVG Loop Diagram */}
            <div className="lg:col-span-6 flex justify-center">
              <svg
                viewBox="0 0 360 280"
                className="w-full max-w-[360px] h-auto overflow-visible"
                role="img"
                aria-label={`${activeLoop.title}: ${activeLoop.steps.map((s) => s.label).join(' to ')}`}
              >
                {/* Circular Ring */}
                <circle
                  cx="180"
                  cy="140"
                  r="88"
                  fill="none"
                  stroke={palette.border}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* 4 Directional Curved Quadrant Arcs (Top -> Right -> Bottom -> Left -> Top) */}
                {[
                  { d: 'M 218 60 A 88 88 0 0 1 260 104', ax: 262, ay: 108, rot: 145 },
                  { d: 'M 260 176 A 88 88 0 0 1 218 220', ax: 214, ay: 222, rot: 235 },
                  { d: 'M 142 220 A 88 88 0 0 1 100 176', ax: 98, ay: 172, rot: 325 },
                  { d: 'M 100 104 A 88 88 0 0 1 142 60', ax: 146, ay: 58, rot: 55 }
                ].map((arc, i) => (
                  <g key={i}>
                    <path
                      d={arc.d}
                      fill="none"
                      stroke={loopMode === 'traditional' ? palette.cyan : palette.lime}
                      strokeWidth="2"
                    />
                    <polygon
                      points="0,-5 8,0 0,5"
                      fill={loopMode === 'traditional' ? palette.cyan : palette.lime}
                      transform={`translate(${arc.ax}, ${arc.ay}) rotate(${arc.rot - 90})`}
                    />
                  </g>
                ))}

                {/* Center Label */}
                <text
                  x="180"
                  y="136"
                  textAnchor="middle"
                  fill={palette.textMain}
                  className="font-display text-[12px] font-extrabold"
                >
                  {loopMode === 'traditional' ? 'SKILL' : 'ADAPTIVE'}
                </text>
                <text
                  x="180"
                  y="152"
                  textAnchor="middle"
                  fill={loopMode === 'traditional' ? palette.cyan : palette.lime}
                  className="font-mono text-[10px] font-semibold"
                >
                  {loopMode === 'traditional' ? 'CYCLE' : 'PRACTICE'}
                </text>

                {/* 4 Nodes positioned at Top, Right, Bottom, Left */}
                {[
                  { cx: 180, cy: 36, step: activeLoop.steps[0] },
                  { cx: 288, cy: 140, step: activeLoop.steps[1] },
                  { cx: 180, cy: 244, step: activeLoop.steps[2] },
                  { cx: 72, cy: 140, step: activeLoop.steps[3] }
                ].map(({ cx, cy, step }) => (
                  <g key={step.num}>
                    <rect
                      x={cx - 60}
                      y={cy - 20}
                      width="120"
                      height="40"
                      rx="8"
                      fill={palette.surfaceSubtle}
                      stroke={loopMode === 'traditional' ? palette.cyan : palette.lime}
                      strokeWidth="1.4"
                    />
                    <text
                      x={cx}
                      y={cy - 3}
                      textAnchor="middle"
                      fill={loopMode === 'traditional' ? palette.cyan : palette.lime}
                      className="font-mono text-[9px] font-bold"
                    >
                      {step.num}
                    </text>
                    <text
                      x={cx}
                      y={cy + 11}
                      textAnchor="middle"
                      fill={palette.textMain}
                      className="font-sans text-[11px] font-bold"
                    >
                      {step.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* 4-Step Sequence Summary */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h4
                  className="text-lg font-display font-extrabold tracking-tight"
                  style={{ color: palette.textMain }}
                >
                  {activeLoop.title}
                </h4>
                <p className="text-sm font-sans mt-1" style={{ color: palette.textMuted }}>
                  {activeLoop.subtitle}
                </p>
              </div>

              <ol className="space-y-2.5 pt-2">
                {activeLoop.steps.map((s) => (
                  <li
                    key={s.num}
                    className="flex items-baseline gap-3 text-sm border-b pb-2 last:border-b-0"
                    style={{ borderColor: palette.border }}
                  >
                    <span
                      className="font-mono text-xs font-bold shrink-0"
                      style={{
                        color: loopMode === 'traditional' ? palette.cyan : palette.lime
                      }}
                    >
                      {s.num}
                    </span>
                    <span className="font-sans font-semibold" style={{ color: palette.textMain }}>
                      {s.label}
                    </span>
                    <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
                      — {s.caption}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. TWO CONCISE VISUAL EVIDENCE MODULES                              */}
        {/* =================================================================== */}
        <section
          aria-labelledby="ch06-evidence-heading"
          className="pt-8 border-t space-y-6"
          style={{ borderColor: palette.border }}
        >
          <div className="space-y-1">
            <span
              className="text-xs font-mono uppercase tracking-widest block"
              style={{ color: palette.cyan }}
            >
              Observed Market &amp; Payroll Signals
            </span>
            <h3
              id="ch06-evidence-heading"
              className="text-2xl font-display font-extrabold tracking-tight"
              style={{ color: palette.textMain }}
            >
              What early labour data shows
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module 1: Changing Skill Expectations (PwC C009) */}
            <div
              className="rounded-xl border p-6 flex flex-col justify-between space-y-5"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: palette.cyan }}
                  >
                    Changing Skill Expectations
                  </span>
                  <EvidenceBadge
                    id="C009"
                    onClick={onOpenEvidence}
                    labelOverride="C009 · PwC 2026"
                  />
                </div>

                {/* 1x vs 7x Dot Multiplier Visual */}
                <div
                  className="p-4 rounded-lg border space-y-3"
                  style={{
                    backgroundColor: palette.surfaceSubtle,
                    borderColor: palette.border
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl sm:text-4xl font-mono font-extrabold tabular-nums"
                      style={{ color: palette.cyan }}
                    >
                      7×
                    </span>
                    <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
                      more likely to ask for senior skills in entry-level ads
                    </span>
                  </div>

                  {/* Proportional 1 vs 7 Dot Comparison */}
                  <div className="space-y-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span style={{ color: palette.textMuted }}>Less-exposed entry ads</span>
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{ backgroundColor: palette.textMuted }}
                        />
                        <span className="ml-1" style={{ color: palette.textMuted }}>
                          1×
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: palette.textMain }}>Highly AI-exposed entry ads</span>
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: palette.cyan }}
                          />
                        ))}
                        <span className="ml-1 font-bold" style={{ color: palette.cyan }}>
                          7×
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                  Across 2.4 million US entry-level job listings (PwC 2026), highly AI-exposed openings were 7× more likely to request judgement and leadership on day one.
                </p>
              </div>
            </div>

            {/* Module 2: Early-Career Employment (Stanford/ADP C010 + OECD Caveat C011) */}
            <div
              className="rounded-xl border p-6 flex flex-col justify-between space-y-5"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border
              }}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: palette.coral }}
                  >
                    Early-Career Employment
                  </span>
                  <div className="flex items-center gap-1.5">
                    <EvidenceBadge
                      id="C010"
                      onClick={onOpenEvidence}
                      labelOverride="C010 · Stanford ADP"
                    />
                    <EvidenceBadge
                      id="C011"
                      onClick={onOpenEvidence}
                      labelOverride="C011 · OECD Caveat"
                    />
                  </div>
                </div>

                {/* Diverging Trajectory Visual (-19% Relative Gap) */}
                <div
                  className="p-4 rounded-lg border space-y-3"
                  style={{
                    backgroundColor: palette.surfaceSubtle,
                    borderColor: palette.border
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl sm:text-4xl font-mono font-extrabold tabular-nums"
                      style={{ color: palette.coral }}
                    >
                      -19%
                    </span>
                    <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
                      relative employment gap for ages 22–25 in exposed roles
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 320 68"
                    className="w-full h-16 overflow-visible"
                    role="img"
                    aria-label="Illustration of a 19% relative employment gap between US workers aged 22 to 25 in high AI-exposure jobs and less-exposed peers through June 2026"
                  >
                    <line x1="8" y1="18" x2="220" y2="18" stroke={palette.textMuted} strokeWidth="2" strokeDasharray="4 3" />
                    <circle cx="220" cy="18" r="3.5" fill={palette.textMuted} />
                    <text x="230" y="21" fill={palette.textMuted} className="font-mono text-[10px]">
                      Less-exposed peers
                    </text>

                    <path d="M 8 18 C 85 18, 130 48, 220 48" fill="none" stroke={palette.coral} strokeWidth="2.5" />
                    <circle cx="220" cy="48" r="3.5" fill={palette.coral} />
                    <text x="230" y="51" fill={palette.coral} className="font-mono text-[10px] font-bold">
                      High exposure (-19%)
                    </text>
                  </svg>
                </div>

                <p className="text-xs font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                  ADP US payroll data through June 2026 shows a 19% relative employment gap for ages 22–25 in exposed occupations. <strong style={{ color: palette.amber }}>Observational correlation only:</strong> OECD analysis notes youth hiring slowdowns predated LLMs and have broader macroeconomic roots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. WORK VALUE SHIFT EXPLORER (EMBEDDED FROM CH08)                   */}
        {/* =================================================================== */}
        <Chapter8NewAdvantage embedded onOpenEvidence={onOpenEvidence} />

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
            If AI changes beginner tasks, learning pathways and human judgement become even more important.
          </p>

          <a
            href="#ch07_your_profession"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 hover:underline self-start sm:self-center"
            style={{ color: palette.lime }}
          >
            <span>Next: Explore Your Profession</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </footer>
      </div>
    </article>
  );
};
