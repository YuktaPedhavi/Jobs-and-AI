import React, { useState, useMemo, useEffect } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { useTheme } from '../../context/ThemeContext';
import { Search, Info, ChevronDown, BookOpen } from 'lucide-react';

interface Chapter3Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
  embedded?: boolean;
}

const SUGGESTED_CODES = [
  '27-1024', // Graphic designers (41% vs 50%, ~9 pp)
  '31-9094', // Medical transcriptionists (23% vs 88%, 64.3 pp)
  '43-3031', // Bookkeeping, accounting, and auditing clerks (31% vs 80%, 48.8 pp)
  '27-3092', // Court reporters and simultaneous captioners (52% vs 96%, 43.7 pp)
  '17-2061', // Computer hardware engineers (32% vs 73%, 40.9 pp)
  '19-3022', // Survey researchers (84% vs 63%, 21.9 pp)
  '27-3041'  // Editors (65% vs 65%, 0.0 pp)
];

// Verified dataset bounds for Felten AIOE across all 271 occupations: -2.123 to +1.528
const AIOE_AXIS_MIN = -2.2;
const AIOE_AXIS_MAX = 2.2;
const AIOE_DATA_MIN = -2.123;
const AIOE_DATA_MAX = 1.528;

export const Chapter3ThreeLenses: React.FC<Chapter3Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence,
  embedded = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedCode, setSelectedCode] = useState<string>(activeOccupation.soc_code);
  const [searchQuery, setSearchQuery] = useState('');
  const [aioeTooltipOpen, setAioeTooltipOpen] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);

  useEffect(() => {
    setSelectedCode(activeOccupation.soc_code);
  }, [activeOccupation.soc_code]);

  const occ =
    occupations271.find((o) => o.soc_code === selectedCode) || activeOccupation;

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return occupations271
      .filter(
        (o) =>
          o.occupation_title.toLowerCase().includes(q) ||
          o.soc_code.includes(q) ||
          o.job_category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [searchQuery]);

  const humanPct = occ.ai_exposure_llm_human * 100;
  const gpt4Pct = occ.ai_exposure_llm_gpt4 * 100;
  const gapPct = Math.abs(humanPct - gpt4Pct);
  const aioeScore = occ.ai_exposure_aioe;

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

  // Scale helper for Part A (0% to 100% -> x = 150 to 490, width = 340)
  const pctToX = (pct: number) => 150 + (Math.max(0, Math.min(100, pct)) / 100) * 340;
  const minBarEnd = pctToX(Math.min(humanPct, gpt4Pct));
  const maxBarEnd = pctToX(Math.max(humanPct, gpt4Pct));

  // Scale helper for Part B (AIOE -2.2 to +2.2 -> x = 80 to 480, width = 400)
  const aioeToX = (val: number) =>
    80 +
    ((Math.max(AIOE_AXIS_MIN, Math.min(AIOE_AXIS_MAX, val)) - AIOE_AXIS_MIN) /
      (AIOE_AXIS_MAX - AIOE_AXIS_MIN)) *
      400;

  // Accurate takeaway based strictly on calculated gap
  const getGapTakeaway = () => {
    if (gapPct < 5) {
      return `Human experts (${humanPct.toFixed(0)}%) and GPT-4 (${gpt4Pct.toFixed(
        0
      )}%) largely agree on task exposure for ${occ.occupation_title} (${gapPct.toFixed(
        1
      )} percentage points apart).`;
    }
    if (gapPct < 15) {
      return `Human experts (${humanPct.toFixed(0)}%) and GPT-4 (${gpt4Pct.toFixed(
        0
      )}%) show a moderate ${gapPct.toFixed(
        1
      )} percentage-point difference for ${occ.occupation_title}.`;
    }
    const higherMethod = humanPct > gpt4Pct ? 'Human experts' : 'GPT-4';
    return `${higherMethod} rate task exposure substantially higher for ${occ.occupation_title}, producing a ${gapPct.toFixed(
      1
    )} percentage-point gap between the two methods.`;
  };

  const handleSelect = (item: Occupation271) => {
    setSelectedCode(item.soc_code);
    onSelectOccupation(item);
    setSearchQuery('');
  };

  const innerContent = (
    <div className={embedded ? 'space-y-6' : 'max-w-5xl mx-auto px-4 sm:px-6 space-y-10'}>
      {!embedded && (
        <header className="space-y-3 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span className="font-bold">03</span>
            <span aria-hidden="true">·</span>
            <span>One Job, Three AI Lenses</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            One job. Different AI estimates.
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            The same occupation can receive different exposure scores depending on how it is measured.
          </p>
        </header>
      )}

      {/* Simplified Occupation Selector */}
      <section aria-label="Occupation selector" className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: palette.textMuted }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any of 271 occupations (e.g. Graphic designers, Nurses, Editors)..."
                aria-label="Search occupations to compare AI measurement lenses"
                className="w-full pl-10 pr-4 py-2.5 min-h-[42px] text-sm font-sans rounded-lg border focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: palette.surfaceBg,
                  borderColor: palette.border,
                  color: palette.textMain
                }}
              />
            </div>

            <select
              value={occ.soc_code}
              onChange={(e) => {
                const found = occupations271.find((o) => o.soc_code === e.target.value);
                if (found) handleSelect(found);
              }}
              aria-label="Choose occupation from full list"
              className="px-3 py-2.5 min-h-[42px] text-sm font-sans rounded-lg border cursor-pointer focus:outline-none focus-visible:ring-2 sm:max-w-[280px]"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border,
                color: palette.textMain
              }}
            >
              {occupations271.map((o) => (
                <option key={o.soc_code} value={o.soc_code}>
                  {o.occupation_title}
                </option>
              ))}
            </select>
          </div>

          {/* Search Matches */}
          {searchMatches.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-sans mr-1" style={{ color: palette.textMuted }}>
                Matches:
              </span>
              {searchMatches.map((item) => (
                <button
                  key={item.soc_code}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="px-3 py-1.5 rounded-md border text-xs font-sans cursor-pointer transition-colors"
                  style={{
                    backgroundColor: palette.surfaceBg,
                    borderColor: palette.cyan,
                    color: palette.textMain
                  }}
                >
                  {item.occupation_title}
                </button>
              ))}
            </div>
          )}

          {/* Suggested Occupations (verified disagreement & consensus examples) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-sans mr-1" style={{ color: palette.textMuted }}>
              Suggested examples:
            </span>
            {SUGGESTED_CODES.map((code) => {
              const item = occupations271.find((o) => o.soc_code === code);
              if (!item) return null;
              const isSelected = occ.soc_code === code;
              const itemGap = Math.abs(item.ai_exposure_llm_human - item.ai_exposure_llm_gpt4) * 100;

              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(item)}
                  aria-pressed={isSelected}
                  className="px-3 py-1.5 min-h-[36px] rounded-md border text-xs font-sans transition-colors cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: isSelected ? palette.cyan : palette.surfaceSubtle,
                    borderColor: isSelected ? palette.cyan : palette.border,
                    color: isSelected
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMain,
                    fontWeight: isSelected ? 600 : 400
                  }}
                >
                  {item.occupation_title}
                  {itemGap >= 15 ? ' (large gap)' : ''}
                </button>
              );
            })}
          </div>
        </section>

        {/* Dominant Visualization: Unified Measurement Comparison */}
        <section
          aria-labelledby="selected-occ-title"
          className="rounded-2xl border p-5 sm:p-8 space-y-8"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          {/* Selected Occupation Identity */}
          <div
            className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b"
            style={{ borderColor: palette.border }}
          >
            <div className="space-y-1">
              <div
                className="flex flex-wrap items-center gap-2 text-xs font-sans"
                style={{ color: palette.textMuted }}
              >
                <span>{occ.job_category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">SOC {occ.soc_code}</span>
              </div>
              <h3
                id="selected-occ-title"
                className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                style={{ color: palette.textMain }}
              >
                {occ.occupation_title}
              </h3>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-[11px] uppercase block" style={{ color: palette.textMuted }}>
                Human vs. GPT-4 gap
              </span>
              <span
                className="text-lg font-bold tabular-nums"
                style={{
                  color:
                    gapPct >= 15
                      ? palette.amber
                      : gapPct >= 5
                      ? palette.cyan
                      : palette.lime
                }}
              >
                {gapPct.toFixed(1)} percentage points
              </span>
            </div>
          </div>

          {/* PART A — Human vs GPT-4 (Shared 0–100% Scale) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-sans font-semibold" style={{ color: palette.textMain }}>
                Part A — Task-Exposure Percentage Estimates (0–100% scale)
              </span>
              <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
                Share of job tasks accelerated by ≥50% (not job-loss probability)
              </span>
            </div>

            <svg
              viewBox="0 0 556 132"
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label={`Human expert estimate ${humanPct.toFixed(0)}% versus GPT-4 estimate ${gpt4Pct.toFixed(0)}% for ${occ.occupation_title}, a ${gapPct.toFixed(1)} percentage point difference`}
            >
              {/* Gridlines 0%, 25%, 50%, 75%, 100% */}
              {[0, 25, 50, 75, 100].map((tick) => {
                const x = pctToX(tick);
                return (
                  <g key={tick}>
                    <line
                      x1={x}
                      y1="14"
                      x2={x}
                      y2="104"
                      stroke={palette.border}
                      strokeWidth={tick === 0 ? 1.5 : 1}
                      strokeDasharray={tick === 0 ? undefined : '3 4'}
                    />
                    <text
                      x={x}
                      y="122"
                      textAnchor="middle"
                      fill={palette.textMuted}
                      className="font-mono text-[10px] tabular-nums"
                    >
                      {tick}%
                    </text>
                  </g>
                );
              })}

              {/* Highlighted Gap Band between Human and GPT-4 endpoints */}
              {gapPct >= 1 && (
                <g>
                  <rect
                    x={minBarEnd}
                    y="22"
                    width={maxBarEnd - minBarEnd}
                    height="74"
                    fill={palette.amber}
                    opacity={isDark ? 0.14 : 0.15}
                  />
                  <line
                    x1={minBarEnd}
                    y1="18"
                    x2={maxBarEnd}
                    y2="18"
                    stroke={palette.amber}
                    strokeWidth="2"
                  />
                  <text
                    x={(minBarEnd + maxBarEnd) / 2}
                    y="12"
                    textAnchor="middle"
                    fill={palette.amber}
                    className="font-mono text-[10px] font-bold tabular-nums"
                  >
                    Δ {gapPct.toFixed(1)} pp
                  </text>
                </g>
              )}

              {/* Row 1: Human Expert Estimate */}
              <text
                x="0"
                y="43"
                fill={palette.textMain}
                className="font-sans text-[12px] font-semibold"
              >
                Human expert estimate
              </text>
              <rect
                x="150"
                y="27"
                width="340"
                height="24"
                rx="4"
                fill={palette.surfaceSubtle}
              />
              <rect
                x="150"
                y="27"
                width={pctToX(humanPct) - 150}
                height="24"
                rx="4"
                fill={palette.cyan}
              />
              <text
                x={pctToX(humanPct) + 8}
                y="43"
                fill={palette.cyan}
                className="font-mono text-[13px] font-bold tabular-nums"
              >
                {humanPct.toFixed(0)}%
              </text>

              {/* Row 2: GPT-4 Estimate */}
              <text
                x="0"
                y="84"
                fill={palette.textMain}
                className="font-sans text-[12px] font-semibold"
              >
                GPT-4 estimate
              </text>
              <rect
                x="150"
                y="68"
                width="340"
                height="24"
                rx="4"
                fill={palette.surfaceSubtle}
              />
              <rect
                x="150"
                y="68"
                width={pctToX(gpt4Pct) - 150}
                height="24"
                rx="4"
                fill={palette.lime}
              />
              <text
                x={pctToX(gpt4Pct) + 8}
                y="84"
                fill={palette.lime}
                className="font-mono text-[13px] font-bold tabular-nums"
              >
                {gpt4Pct.toFixed(0)}%
              </text>
            </svg>
          </div>

          {/* PART B — Felten AIOE Academic Exposure Index (Separate Standardized Axis) */}
          <div className="pt-6 border-t space-y-3" style={{ borderColor: palette.border }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 relative">
                <span className="text-sm font-sans font-semibold" style={{ color: palette.textMain }}>
                  Part B — Academic Exposure Index (Felten AIOE)
                </span>
                <button
                  type="button"
                  onClick={() => setAioeTooltipOpen((v) => !v)}
                  onMouseEnter={() => setAioeTooltipOpen(true)}
                  onMouseLeave={() => setAioeTooltipOpen(false)}
                  onFocus={() => setAioeTooltipOpen(true)}
                  onBlur={() => setAioeTooltipOpen(false)}
                  aria-expanded={aioeTooltipOpen}
                  aria-label="Explain Felten AIOE standardized score"
                  className="p-1 rounded hover:opacity-80 cursor-pointer focus:outline-none focus-visible:ring-2"
                  style={{ color: palette.amber }}
                >
                  <Info className="w-4 h-4" />
                </button>
                {aioeTooltipOpen && (
                  <div
                    role="tooltip"
                    className="absolute left-0 top-7 z-20 w-[min(20rem,calc(100vw-4rem))] p-3 rounded-lg border shadow-xl text-xs font-sans leading-relaxed"
                    style={{
                      backgroundColor: palette.surfaceSubtle,
                      borderColor: palette.amber,
                      color: palette.textMain
                    }}
                  >
                    Felten AIOE is a standardized Z-score (mean 0.0) linking 52 human cognitive abilities to 10 AI applications. It is a relative index—not a percentage of tasks or job loss probability.
                  </div>
                )}
              </div>

              <span className="font-mono text-sm font-bold tabular-nums" style={{ color: palette.amber }}>
                Score: {aioeScore > 0 ? `+${aioeScore.toFixed(2)}` : aioeScore.toFixed(2)} SD
              </span>
            </div>

            <svg
              viewBox="0 0 556 86"
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label={`Felten AIOE standardized exposure index for ${occ.occupation_title}: ${aioeScore.toFixed(2)} on a standardized scale from -2.2 to +2.2`}
            >
              {/* Empirical 271-occupation span (-2.123 to +1.528) */}
              <rect
                x={aioeToX(AIOE_DATA_MIN)}
                y="24"
                width={aioeToX(AIOE_DATA_MAX) - aioeToX(AIOE_DATA_MIN)}
                height="16"
                rx="8"
                fill={palette.surfaceSubtle}
                stroke={palette.border}
                strokeWidth="1"
              />

              {/* Axis ticks: -2.0, -1.0, 0.0, +1.0, +2.0 */}
              {[-2, -1, 0, 1, 2].map((tick) => {
                const x = aioeToX(tick);
                const isZero = tick === 0;
                return (
                  <g key={tick}>
                    <line
                      x1={x}
                      y1="14"
                      x2={x}
                      y2="52"
                      stroke={isZero ? palette.textMain : palette.border}
                      strokeWidth={isZero ? 1.75 : 1}
                      strokeDasharray={isZero ? undefined : '2 3'}
                    />
                    <text
                      x={x}
                      y="68"
                      textAnchor="middle"
                      fill={isZero ? palette.textMain : palette.textMuted}
                      className="font-mono text-[10px] tabular-nums"
                    >
                      {tick > 0 ? `+${tick.toFixed(1)}` : tick.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              <text x="80" y="82" fill={palette.textMuted} className="font-sans text-[10px]">
                Lower relative exposure
              </text>
              <text x="280" y="82" textAnchor="middle" fill={palette.textMuted} className="font-mono text-[10px]">
                0.0 = workforce avg
              </text>
              <text x="480" y="82" textAnchor="end" fill={palette.textMuted} className="font-sans text-[10px]">
                Higher relative exposure
              </text>

              {/* Connecting bar from 0.0 reference to occupation's Z-score */}
              <line
                x1={aioeToX(0)}
                y1="32"
                x2={aioeToX(aioeScore)}
                y2="32"
                stroke={palette.amber}
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Score diamond marker */}
              <polygon
                points={`${aioeToX(aioeScore)},22 ${aioeToX(aioeScore) + 8},32 ${aioeToX(aioeScore)},42 ${aioeToX(aioeScore) - 8},32`}
                fill={palette.amber}
              />
              <text
                x={aioeToX(aioeScore)}
                y="13"
                textAnchor="middle"
                fill={palette.amber}
                className="font-mono text-[11px] font-bold tabular-nums"
              >
                {aioeScore > 0 ? `+${aioeScore.toFixed(2)}` : aioeScore.toFixed(2)}
              </text>
            </svg>
          </div>

          {/* Main Takeaway + Expandable Methodology Panel */}
          <div className="pt-4 border-t space-y-3" style={{ borderColor: palette.border }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMain }}>
                {getGapTakeaway()}
              </p>

              <button
                type="button"
                onClick={() => setMethodOpen((v) => !v)}
                aria-expanded={methodOpen}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 cursor-pointer hover:underline self-start sm:self-center"
                style={{ color: palette.cyan }}
              >
                <span>Methodology &amp; definitions</span>
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
                  <strong style={{ color: palette.textMain }}>Human vs. GPT-4 (Eloundou et al.):</strong>{' '}
                  Both metrics estimate the share of an occupation&apos;s O*NET tasks where an LLM could reduce completion time by at least 50%. Across all 271 roles, they correlate strongly (
                  <span className="font-mono tabular-nums" style={{ color: palette.textMain }}>
                    r = +0.835
                  </span>
                  ), yet diverge sharply where human evaluators recognize physical, regulatory, or organizational friction that models overlook.
                </p>
                <p>
                  <strong style={{ color: palette.textMain }}>Felten AIOE:</strong>{' '}
                  Standardized ability-weighted index (empirical dataset span{' '}
                  <span className="font-mono tabular-nums">
                    {AIOE_DATA_MIN.toFixed(2)} to +{AIOE_DATA_MAX.toFixed(2)}
                  </span>
                  ). None of these scores measure probabilities of job loss.
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
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <article
      id="ch03_three_lenses"
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
