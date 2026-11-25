import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { useTheme } from '../../context/ThemeContext';

interface Chapter9Props {
  onOpenEvidence: (id: string) => void;
}

type ExposureGroupId = 'all' | 'complementary' | 'displacement' | 'other';
type PressureNodeId = 'support' | 'data' | 'testing';
type CapabilityNodeId = 'integration' | 'domain' | 'problem_solving' | 'system_design';

interface ExposureGroupMeta {
  id: ExposureGroupId;
  pctLabel: string;
  title: string;
  shortLabel: string;
  summary: string;
  caveat: string;
}

const EXPOSURE_GROUPS: Record<ExposureGroupId, ExposureGroupMeta> = {
  all: {
    id: 'all',
    pctLabel: '100',
    title: 'All Indian workers (IMF exposure breakdown)',
    shortLabel: 'All 100',
    summary:
      'IMF estimates place 26% of Indian employment in high-AI-exposure occupations—split between 14% with higher complementarity and 12% facing higher displacement risk—while 74% sit outside the high-exposure group.',
    caveat: 'Occupational exposure estimates based on task structure, not observed job losses.'
  },
  complementary: {
    id: 'complementary',
    pctLabel: '14%',
    title: 'High AI exposure, higher complementarity',
    shortLabel: '14% Higher complementarity',
    summary:
      'Occupations with substantial AI task overlap where tools are more likely to assist human expertise, judgement, and complex coordination.',
    caveat: 'Complementarity depends on skills, training, and access to workplace tools.'
  },
  displacement: {
    id: 'displacement',
    pctLabel: '12%',
    title: 'High AI exposure, higher displacement risk',
    shortLabel: '12% Higher displacement risk',
    summary:
      'Occupations with high task overlap and lower complementarity—such as routine support, basic data processing, or clerical roles—facing greater pressure to adapt.',
    caveat: 'Represents estimated exposure risk, not a forecast that these workers will definitely lose jobs.'
  },
  other: {
    id: 'other',
    pctLabel: '74%',
    title: 'Workers outside the high-exposure group',
    shortLabel: '74% Outside high-exposure group',
    summary:
      'Occupations in agriculture, physical trades, personal care, and local services with lower direct exposure to generative AI task automation.',
    caveat:
      'Lower direct exposure does not mean workers are permanently unaffected by broader economic or wage shifts.'
  }
};

interface PressureNode {
  id: PressureNodeId;
  label: string;
  relatedCapabilities: CapabilityNodeId[];
  explanation: string;
}

interface CapabilityNode {
  id: CapabilityNodeId;
  label: string;
  relatedPressures: PressureNodeId[];
  explanation: string;
}

const PRESSURE_NODES: PressureNode[] = [
  {
    id: 'support',
    label: 'Repetitive support tasks',
    relatedCapabilities: ['integration', 'domain', 'problem_solving'],
    explanation:
      'Routine first-tier ticket answers are increasingly assisted by software, placing greater value on handling complex exceptions and understanding customer workflows.'
  },
  {
    id: 'data',
    label: 'Basic data processing',
    relatedCapabilities: ['integration', 'domain', 'system_design'],
    explanation:
      'Manual formatting and entry tasks face automation pressure, while connecting reliable data pipelines and checking outputs in domain context grow in importance.'
  },
  {
    id: 'testing',
    label: 'Routine testing',
    relatedCapabilities: ['problem_solving', 'system_design'],
    explanation:
      'Scripted, repetitive checks are easier to automate, raising demand for designing evaluation criteria and diagnosing subtle system failures.'
  }
];

const CAPABILITY_NODES: CapabilityNode[] = [
  {
    id: 'integration',
    label: 'AI system integration',
    relatedPressures: ['support', 'data'],
    explanation:
      'Connecting models securely into existing enterprise software, data permissions, and human review workflows.'
  },
  {
    id: 'domain',
    label: 'Domain-specific expertise',
    relatedPressures: ['support', 'data'],
    explanation:
      'Applying industry regulations, local context, and business rules that generic tools do not understand on their own.'
  },
  {
    id: 'problem_solving',
    label: 'Complex problem-solving',
    relatedPressures: ['support', 'testing'],
    explanation:
      'Resolving ambiguous, multi-part issues across teams where standard scripts break down.'
  },
  {
    id: 'system_design',
    label: 'System design and evaluation',
    relatedPressures: ['data', 'testing'],
    explanation:
      'Architecting dependable systems, measuring output quality, and catching model errors before they reach customers.'
  }
];

// Thin-stroke geometric worker pictogram for the 100-unit grid
const WorkerUnitIcon: React.FC<{ color: string; dimmed: boolean }> = ({
  color,
  dimmed
}) => (
  <svg
    viewBox="0 0 18 22"
    className="w-full h-auto max-w-[20px] mx-auto transition-opacity duration-150"
    style={{ opacity: dimmed ? 0.2 : 1 }}
    fill={color}
    aria-hidden="true"
  >
    <circle cx="9" cy="5.5" r="3.1" />
    <path d="M3 19.5c0-3.6 2.7-6.2 6-6.2s6 2.6 6 6.2v1H3v-1z" />
  </svg>
);

export const Chapter9IndiaLens: React.FC<Chapter9Props> = ({ onOpenEvidence }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeGroup, setActiveGroup] = useState<ExposureGroupId>('all');
  const [selectedSkillNode, setSelectedSkillNode] = useState<{
    side: 'pressure' | 'capability';
    id: PressureNodeId | CapabilityNodeId;
  }>({ side: 'pressure', id: 'support' });

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    emerald: isDark ? '#10b981' : '#059669',
    coral: isDark ? '#fb7185' : '#e11d48',
    slateUnit: isDark ? '#4a6489' : '#64748b',
    lime: isDark ? '#d7e63b' : '#5c6800'
  };

  const getGroupColor = (group: ExposureGroupId) => {
    if (group === 'complementary') return palette.emerald;
    if (group === 'displacement') return palette.coral;
    if (group === 'other') return palette.slateUnit;
    return palette.cyan;
  };

  const currentMeta = EXPOSURE_GROUPS[activeGroup];

  // Resolve highlighted connections for the conceptual Changing Work & Skills diagram
  const activePressure =
    selectedSkillNode.side === 'pressure'
      ? PRESSURE_NODES.find((p) => p.id === selectedSkillNode.id)
      : null;
  const activeCapability =
    selectedSkillNode.side === 'capability'
      ? CAPABILITY_NODES.find((c) => c.id === selectedSkillNode.id)
      : null;

  const isPathHighlighted = (pId: PressureNodeId, cId: CapabilityNodeId) => {
    if (selectedSkillNode.side === 'pressure') {
      return (
        selectedSkillNode.id === pId &&
        PRESSURE_NODES.find((p) => p.id === pId)?.relatedCapabilities.includes(cId)
      );
    }
    return (
      selectedSkillNode.id === cId &&
      CAPABILITY_NODES.find((c) => c.id === cId)?.relatedPressures.includes(pId)
    );
  };

  const isPressureHighlighted = (pId: PressureNodeId) =>
    selectedSkillNode.side === 'pressure'
      ? selectedSkillNode.id === pId
      : Boolean(activeCapability?.relatedPressures.includes(pId));

  const isCapabilityHighlighted = (cId: CapabilityNodeId) =>
    selectedSkillNode.side === 'capability'
      ? selectedSkillNode.id === cId
      : Boolean(activePressure?.relatedCapabilities.includes(cId));

  // Coordinate anchors inside the 220x236 SVG bridge between columns
  const pressureY: Record<PressureNodeId, number> = {
    support: 38,
    data: 118,
    testing: 198
  };
  const capabilityY: Record<CapabilityNodeId, number> = {
    integration: 28,
    domain: 88,
    problem_solving: 148,
    system_design: 208
  };

  return (
    <article
      id="ch09_india_lens"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Compact Opening Header + Geographic Scope Note */}
        <header className="space-y-4 max-w-3xl">
          <div
            className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span>India &amp; Global Labour</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: palette.textMuted }}>
              IMF &amp; Deloitte–NASSCOM research
            </span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            How could AI reshape work in India?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Some occupations may benefit from AI assistance. Others may face greater pressure to adapt.
          </p>

          <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
            Because the 271-occupation dataset is 83.6% U.S.-based, this section uses IMF and Deloitte–NASSCOM research for India.
          </p>
        </header>

        {/* ================================================================= */}
        {/* 1. MAIN VISUALIZATION: INDIA'S 100-WORKER EXPOSURE MAP            */}
        {/* ================================================================= */}
        <section
          aria-labelledby="india-100-worker-heading"
          className="rounded-2xl border p-5 sm:p-8 space-y-6"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          <div
            className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b"
            style={{ borderColor: palette.border }}
          >
            <div>
              <h3
                id="india-100-worker-heading"
                className="text-base sm:text-lg font-sans font-semibold"
                style={{ color: palette.textMain }}
              >
                India&apos;s 100-Worker Exposure Map
              </h3>
              <p className="text-xs font-sans mt-0.5" style={{ color: palette.textMuted }}>
                Occupational exposure estimates (IMF, 2025) — not observed job losses · Select a category or worker unit
              </p>
            </div>
            <EvidenceBadge
              id="C015"
              onClick={onOpenEvidence}
              labelOverride="IMF 2025 · India Assessment"
            />
          </div>

          {/* Selectable Category Controls */}
          <div
            role="group"
            aria-label="Filter India 100-worker exposure categories"
            className="flex flex-wrap gap-2"
          >
            {(['all', 'complementary', 'displacement', 'other'] as ExposureGroupId[]).map(
              (groupId) => {
                const meta = EXPOSURE_GROUPS[groupId];
                const isSelected = activeGroup === groupId;
                const color = getGroupColor(groupId);

                return (
                  <button
                    key={groupId}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveGroup(groupId)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-sans transition-colors cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: isSelected ? color : palette.surfaceSubtle,
                      borderColor: isSelected ? color : palette.border,
                      color: isSelected
                        ? isDark && groupId !== 'displacement' && groupId !== 'other'
                          ? '#061329'
                          : '#ffffff'
                        : palette.textMain,
                      fontWeight: isSelected ? 600 : 500
                    }}
                  >
                    {groupId !== 'all' && !isSelected && (
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                    )}
                    <span>{meta.shortLabel}</span>
                  </button>
                );
              }
            )}
          </div>

          {/* Exactly 100 Worker Symbols in a Clean Grid (10x10 mobile, 20x5 desktop) */}
          <div
            className="p-4 sm:p-6 rounded-xl border"
            style={{
              backgroundColor: palette.surfaceSubtle,
              borderColor: palette.border
            }}
          >
            <div
              className="grid grid-cols-10 sm:grid-cols-20 gap-2 sm:gap-2.5"
              role="img"
              aria-label="100 worker symbols representing IMF occupational AI exposure estimates for India: 14 high exposure with higher complementarity, 12 high exposure with higher displacement risk, and 74 outside the high-exposure group."
            >
              {Array.from({ length: 100 }).map((_, idx) => {
                const unitGroup: Exclude<ExposureGroupId, 'all'> =
                  idx < 14
                    ? 'complementary'
                    : idx < 26
                    ? 'displacement'
                    : 'other';

                const isHighlighted =
                  activeGroup === 'all' || activeGroup === unitGroup;
                const unitColor = getGroupColor(unitGroup);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setActiveGroup(
                        activeGroup === unitGroup ? 'all' : unitGroup
                      )
                    }
                    title={`Worker ${idx + 1} of 100: ${EXPOSURE_GROUPS[unitGroup].title}`}
                    aria-label={`Worker ${idx + 1} of 100: ${EXPOSURE_GROUPS[unitGroup].title}`}
                    className="p-0.5 rounded transition-transform duration-150 hover:scale-110 cursor-pointer focus:outline-none focus-visible:ring-2"
                  >
                    <WorkerUnitIcon color={unitColor} dimmed={!isHighlighted} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Category Explanation + Compact Legend & Source */}
          <div
            className="pt-2 flex flex-col md:flex-row md:items-start justify-between gap-4"
            aria-live="polite"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-baseline gap-2.5">
                <span
                  className="text-xl font-mono font-bold tabular-nums"
                  style={{ color: getGroupColor(activeGroup) }}
                >
                  {currentMeta.pctLabel}
                </span>
                <span className="text-sm font-sans font-semibold" style={{ color: palette.textMain }}>
                  {currentMeta.title}
                </span>
              </div>
              <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                {currentMeta.summary}
              </p>
              <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                Caveat: {currentMeta.caveat}
              </p>
            </div>

            <div className="text-xs font-sans space-y-1 shrink-0 md:text-right" style={{ color: palette.textMuted }}>
              <div className="font-mono font-semibold" style={{ color: palette.textMain }}>
                Source: IMF Article IV Consultation (2025)
              </div>
              <div>Estimated exposure split across India&apos;s labour force</div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. SECONDARY VISUALIZATION: CHANGING WORK AND SKILLS              */}
        {/* ================================================================= */}
        <section
          aria-labelledby="changing-work-skills-heading"
          className="rounded-2xl border p-5 sm:p-8 space-y-6"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          <div
            className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b"
            style={{ borderColor: palette.border }}
          >
            <div>
              <span
                className="text-xs font-mono font-semibold block mb-1"
                style={{ color: palette.lime }}
              >
                Conceptual illustration · Explorations for service &amp; technology work
              </span>
              <h3
                id="changing-work-skills-heading"
                className="text-base sm:text-lg font-sans font-semibold"
                style={{ color: palette.textMain }}
              >
                Changing Work and Skills
              </h3>
            </div>
            <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
              Select any task or capability to trace possible skill links
            </span>
          </div>

          {/* Connected Diagram: Two Columns + Thin SVG Paths on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_1fr] gap-4 md:gap-0 items-center">
            {/* Column 1: Routine Work Under Pressure */}
            <div className="space-y-3">
              <div
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: palette.coral }}
              >
                Routine Work Under Pressure
              </div>
              <div className="space-y-3">
                {PRESSURE_NODES.map((node) => {
                  const isActive =
                    selectedSkillNode.side === 'pressure' &&
                    selectedSkillNode.id === node.id;
                  const isLinked = isPressureHighlighted(node.id);

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() =>
                        setSelectedSkillNode({ side: 'pressure', id: node.id })
                      }
                      aria-pressed={isActive}
                      className="w-full min-h-[52px] px-4 py-3 rounded-xl border text-left text-sm font-sans transition-all cursor-pointer flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2"
                      style={{
                        backgroundColor: isActive
                          ? palette.surfaceSubtle
                          : palette.surfaceBg,
                        borderColor: isLinked ? palette.coral : palette.border,
                        color: palette.textMain,
                        opacity: isLinked ? 1 : 0.55,
                        fontWeight: isActive ? 600 : 500
                      }}
                    >
                      <span>{node.label}</span>
                      <span
                        className="text-xs font-mono shrink-0"
                        style={{ color: isLinked ? palette.coral : palette.textMuted }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thin SVG Curved Connection Bridge (Desktop) */}
            <div className="hidden md:block" aria-hidden="true">
              <svg viewBox="0 0 180 236" className="w-full h-[236px]">
                <defs>
                  <marker
                    id="india-arrow-active"
                    viewBox="0 0 8 8"
                    refX="6"
                    refY="4"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 Z" fill={palette.cyan} />
                  </marker>
                  <marker
                    id="india-arrow-muted"
                    viewBox="0 0 8 8"
                    refX="6"
                    refY="4"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 Z" fill={palette.border} />
                  </marker>
                </defs>

                {PRESSURE_NODES.flatMap((p) =>
                  p.relatedCapabilities.map((cId) => {
                    const y1 = pressureY[p.id];
                    const y2 = capabilityY[cId];
                    const active = isPathHighlighted(p.id, cId);

                    return (
                      <path
                        key={`${p.id}-${cId}`}
                        d={`M 4 ${y1} C 86 ${y1}, 94 ${y2}, 172 ${y2}`}
                        fill="none"
                        stroke={active ? palette.cyan : palette.border}
                        strokeWidth={active ? 2 : 1}
                        strokeDasharray={active ? undefined : '3 4'}
                        opacity={active ? 1 : 0.45}
                        markerEnd={
                          active
                            ? 'url(#india-arrow-active)'
                            : 'url(#india-arrow-muted)'
                        }
                      />
                    );
                  })
                )}
              </svg>
            </div>

            {/* Column 2: Capabilities to Develop */}
            <div className="space-y-3">
              <div
                className="text-xs font-mono font-bold uppercase tracking-wider md:text-right"
                style={{ color: palette.cyan }}
              >
                Capabilities to Develop
              </div>
              <div className="space-y-2.5">
                {CAPABILITY_NODES.map((node) => {
                  const isActive =
                    selectedSkillNode.side === 'capability' &&
                    selectedSkillNode.id === node.id;
                  const isLinked = isCapabilityHighlighted(node.id);

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() =>
                        setSelectedSkillNode({ side: 'capability', id: node.id })
                      }
                      aria-pressed={isActive}
                      className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-left text-sm font-sans transition-all cursor-pointer flex items-center gap-2.5 focus:outline-none focus-visible:ring-2"
                      style={{
                        backgroundColor: isActive
                          ? palette.surfaceSubtle
                          : palette.surfaceBg,
                        borderColor: isLinked ? palette.cyan : palette.border,
                        color: palette.textMain,
                        opacity: isLinked ? 1 : 0.55,
                        fontWeight: isActive ? 600 : 500
                      }}
                    >
                      <span>{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Explanation Panel for Selected Node */}
          <div
            className="pt-4 border-t space-y-2"
            style={{ borderColor: palette.border }}
            aria-live="polite"
          >
            {activePressure && (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span style={{ color: palette.coral }} className="font-bold">
                    {activePressure.label}
                  </span>
                  <span style={{ color: palette.textMuted }}>→</span>
                  <span style={{ color: palette.cyan }}>
                    Associated capabilities:{' '}
                    {activePressure.relatedCapabilities
                      .map(
                        (cId) =>
                          CAPABILITY_NODES.find((c) => c.id === cId)?.label
                      )
                      .join(', ')}
                  </span>
                </div>
                <p className="text-sm font-sans" style={{ color: palette.textMuted }}>
                  {activePressure.explanation}
                </p>
              </>
            )}

            {activeCapability && (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span style={{ color: palette.cyan }} className="font-bold">
                    {activeCapability.label}
                  </span>
                  <span style={{ color: palette.textMuted }}>←</span>
                  <span style={{ color: palette.coral }}>
                    Related pressured tasks:{' '}
                    {activeCapability.relatedPressures
                      .map(
                        (pId) =>
                          PRESSURE_NODES.find((p) => p.id === pId)?.label
                      )
                      .join(', ')}
                  </span>
                </div>
                <p className="text-sm font-sans" style={{ color: palette.textMuted }}>
                  {activeCapability.explanation}
                </p>
              </>
            )}

            <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
              Note: This conceptual illustration maps plausible skill adjacencies rather than guaranteed job transitions or measured worker flows.
            </p>
          </div>
        </section>

        {/* Optional Verified Evidence Annotation (Deloitte–NASSCOM) */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y"
          style={{ borderColor: palette.border }}
        >
          <div className="space-y-1 max-w-2xl">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span
                className="text-lg font-mono font-bold tabular-nums"
                style={{ color: palette.cyan }}
              >
                1.25M+ by 2027
              </span>
              <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
                Industry projection · Deloitte–NASSCOM (2024)
              </span>
            </div>
            <p className="text-xs sm:text-sm font-sans" style={{ color: palette.textMuted }}>
              Indian AI talent demand is projected to exceed 1.25 million by 2027 across the broader technology workforce, contingent on training and adoption.
            </p>
          </div>

          <div className="shrink-0">
            <EvidenceBadge
              id="C016"
              onClick={onOpenEvidence}
              labelOverride="Deloitte–NASSCOM Projection"
            />
          </div>
        </div>

        {/* Simple Closing Sentence */}
        <p
          className="text-base sm:text-lg font-sans font-medium"
          style={{ color: palette.textMain }}
        >
          India&apos;s AI transition will depend on skills, adoption and the kinds of work people do.
        </p>
      </div>
    </article>
  );
};
