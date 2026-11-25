import React, { useState, useMemo } from 'react';
import { occupations271, Occupation271 } from '../../data/occupations271';
import { calculatedKeyFindings } from '../../data/researchData';
import { EvidenceBadge } from '../EvidenceBadge';
import { Chapter3ThreeLenses } from './Chapter3ThreeLenses';
import { useTheme } from '../../context/ThemeContext';
import { Search, ChevronDown } from 'lucide-react';

interface Chapter1Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

export const Chapter1FourFutures: React.FC<Chapter1Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [quadrantFilter, setQuadrantFilter] = useState<string>('all');
  const [hoveredOcc, setHoveredOcc] = useState<Occupation271 | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [measureOpen, setMeasureOpen] = useState(false);

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
    lime: isDark ? '#d7e63b' : '#5c6800'
  };

  // SVG viewport dimensions
  const svgWidth = 800;
  const svgHeight = 470;
  const padding = { top: 36, right: 36, bottom: 58, left: 66 };

  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  // Scales
  const minX = 0;
  const maxX = 0.9;
  const scaleX = (val: number) => padding.left + ((val - minX) / (maxX - minX)) * innerWidth;

  const minY = -18;
  const maxY = 35;
  const scaleY = (val: number) =>
    padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;

  const maxEmp = 3400000;
  const scaleRadius = (emp: number) => {
    const r = Math.sqrt(emp / maxEmp) * 14;
    return Math.max(3, Math.min(18, r));
  };

  const filteredOccupations = useMemo(() => {
    return occupations271.filter((occ) => {
      const matchesSearch =
        occ.occupation_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.job_category.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (quadrantFilter === 'all') return true;
      if (quadrantFilter === 'high_growing')
        return occ.ai_exposure_level === 'High' && occ.projected_growth_pct_2024_2034 > 0;
      if (quadrantFilter === 'high_declining')
        return occ.ai_exposure_level === 'High' && occ.projected_growth_pct_2024_2034 < 0;
      if (quadrantFilter === 'low_growing')
        return (
          (occ.ai_exposure_level === 'Low' || occ.ai_exposure_level === 'Medium') &&
          occ.projected_growth_pct_2024_2034 > 0
        );
      if (quadrantFilter === 'low_declining')
        return (
          (occ.ai_exposure_level === 'Low' || occ.ai_exposure_level === 'Medium') &&
          occ.projected_growth_pct_2024_2034 < 0
        );
      return true;
    });
  }, [quadrantFilter, searchQuery]);

  const medianX = scaleX(calculatedKeyFindings.dataset_median_exposure);
  const baselineY = scaleY(calculatedKeyFindings.bls_baseline_growth);
  const zeroY = scaleY(0);

  const getQuadrantColor = (occ: Occupation271) => {
    const isHigh = occ.ai_exposure_llm_human >= calculatedKeyFindings.dataset_median_exposure;
    const isGrow = occ.projected_growth_pct_2024_2034 >= 0;

    if (isHigh && isGrow) return palette.cyan;
    if (isHigh && !isGrow) return palette.coral;
    if (!isHigh && isGrow) return palette.emerald;
    return isDark ? '#94a3b8' : '#64748b';
  };

  const inspectedOcc = hoveredOcc || activeOccupation;

  return (
    <article
      id="ch02_exposure_growth"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Compact Header */}
        <header className="space-y-3 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span className="font-bold">02</span>
            <span aria-hidden="true">·</span>
            <span>Exposure vs. Job Growth (United States, 2024–2034)</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            Does More AI Exposure Mean Fewer Jobs?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Across all {calculatedKeyFindings.occupation_count} U.S. occupations, the correlation between AI exposure and projected 2024–2034 job growth is{' '}
            <strong className="font-mono tabular-nums" style={{ color: palette.cyan }}>
              r = {calculatedKeyFindings.correlation_exposure_vs_projected_growth.toFixed(3)}
            </strong>{' '}
            — a very weak relationship that does not show AI causes job growth or decline.
          </p>
        </header>

        {/* Quadrant Quick Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          {[
            {
              key: 'high_growing',
              label: 'High Exposure + Growth',
              stat: '72 jobs (80%)',
              sub: '47 beat +3.1% U.S. avg',
              color: palette.cyan
            },
            {
              key: 'high_declining',
              label: 'High Exposure + Decline',
              stat: '13 jobs (14%)',
              sub: 'Survey clerks, office support',
              color: palette.coral
            },
            {
              key: 'low_growing',
              label: 'Lower Exposure + Growth',
              stat: '105 jobs',
              sub: 'Healthcare, trades, care',
              color: palette.emerald
            },
            {
              key: 'low_declining',
              label: 'Lower Exposure + Decline',
              stat: '24 jobs',
              sub: 'Legacy & production roles',
              color: palette.textMuted
            }
          ].map((q) => {
            const active = quadrantFilter === q.key;
            return (
              <button
                key={q.key}
                type="button"
                aria-pressed={active}
                onClick={() => setQuadrantFilter(active ? 'all' : q.key)}
                className="p-3.5 rounded-xl border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: active ? palette.surfaceSubtle : palette.surfaceBg,
                  borderColor: active ? q.color : palette.border,
                  boxShadow: active ? `0 0 0 1px ${q.color}` : 'none'
                }}
              >
                <span className="text-[11px] font-sans block" style={{ color: palette.textMuted }}>
                  {q.label}
                </span>
                <div className="text-lg sm:text-xl font-bold tabular-nums mt-0.5" style={{ color: q.color }}>
                  {q.stat}
                </div>
                <span className="text-[11px] font-sans block mt-0.5" style={{ color: palette.textMuted }}>
                  {q.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dominant Scatterplot Panel */}
        <section
          aria-label="Scatterplot of AI Exposure versus Projected U.S. Job Growth 2024–2034 across 271 occupations"
          className="rounded-2xl border p-4 sm:p-6 space-y-4"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuadrantFilter('all')}
                className="px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap border"
                style={{
                  backgroundColor: quadrantFilter === 'all' ? palette.cyan : palette.surfaceSubtle,
                  borderColor: quadrantFilter === 'all' ? palette.cyan : palette.border,
                  color:
                    quadrantFilter === 'all'
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted,
                  fontWeight: quadrantFilter === 'all' ? 700 : 500
                }}
              >
                All {occupations271.length} Jobs
              </button>
              <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
                Bubble size = 2024 U.S. employment
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: palette.textMuted }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Highlight occupation..."
                aria-label="Filter occupations in scatterplot"
                className="w-full pl-8 pr-3 py-1.5 min-h-[36px] text-xs font-sans rounded-lg border focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: palette.surfaceSubtle,
                  borderColor: palette.border,
                  color: palette.textMain
                }}
              />
            </div>
          </div>

          {/* Scatterplot SVG */}
          <div
            className="overflow-x-auto rounded-xl border p-3"
            style={{
              backgroundColor: palette.surfaceSubtle,
              borderColor: palette.border
            }}
          >
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[600px] select-none"
              role="img"
              aria-label="Scatterplot of 271 U.S. occupations showing AI exposure on the X-axis and projected 2024 to 2034 job growth on the Y-axis, correlation r = -0.094."
            >
              {/* Horizontal Gridlines */}
              {[-10, 0, 10, 20, 30].map((yVal) => (
                <g key={yVal}>
                  <line
                    x1={padding.left}
                    y1={scaleY(yVal)}
                    x2={svgWidth - padding.right}
                    y2={scaleY(yVal)}
                    stroke={palette.border}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={scaleY(yVal) + 4}
                    textAnchor="end"
                    fill={palette.textMuted}
                    className="text-[10px] font-mono tabular-nums"
                  >
                    {yVal > 0 ? `+${yVal}%` : `${yVal}%`}
                  </text>
                </g>
              ))}

              {/* Zero Growth Line */}
              <line
                x1={padding.left}
                y1={zeroY}
                x2={svgWidth - padding.right}
                y2={zeroY}
                stroke={palette.textMuted}
                strokeWidth={1.25}
                opacity={0.6}
              />

              {/* BLS Baseline (+3.1%) */}
              <line
                x1={padding.left}
                y1={baselineY}
                x2={svgWidth - padding.right}
                y2={baselineY}
                stroke={palette.emerald}
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <text
                x={svgWidth - padding.right}
                y={baselineY - 6}
                textAnchor="end"
                fill={palette.emerald}
                className="text-[10px] font-mono font-semibold"
              >
                U.S. All-Jobs Avg (+3.1%)
              </text>

              {/* Dataset Median Exposure Line */}
              <line
                x1={medianX}
                y1={padding.top}
                x2={medianX}
                y2={svgHeight - padding.bottom}
                stroke={palette.cyan}
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <text
                x={medianX + 6}
                y={padding.top + 14}
                fill={palette.cyan}
                className="text-[10px] font-mono font-semibold"
              >
                Median Exposure (37%)
              </text>

              {/* X Axis Ticks */}
              {[0.1, 0.3, 0.5, 0.7].map((xVal) => (
                <g key={xVal}>
                  <line
                    x1={scaleX(xVal)}
                    y1={svgHeight - padding.bottom}
                    x2={scaleX(xVal)}
                    y2={padding.top}
                    stroke={palette.border}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={scaleX(xVal)}
                    y={svgHeight - padding.bottom + 18}
                    textAnchor="middle"
                    fill={palette.textMuted}
                    className="text-[10px] font-mono tabular-nums"
                  >
                    {(xVal * 100).toFixed(0)}%
                  </text>
                </g>
              ))}

              {/* Axis Labels */}
              <text
                x={svgWidth / 2}
                y={svgHeight - 14}
                textAnchor="middle"
                fill={palette.textMain}
                className="text-[11px] font-sans font-semibold"
              >
                AI Exposure (Task Overlap Index, 0–100%)
              </text>

              <text
                x={-(svgHeight / 2)}
                y={18}
                transform="rotate(-90)"
                textAnchor="middle"
                fill={palette.textMain}
                className="text-[11px] font-sans font-semibold"
              >
                Projected U.S. Job Growth (2024–2034 %)
              </text>

              {/* Occupation Bubbles */}
              {filteredOccupations.map((occ) => {
                const cx = scaleX(occ.ai_exposure_llm_human);
                const cy = scaleY(occ.projected_growth_pct_2024_2034);
                const r = scaleRadius(occ.employment_2024);
                const isSelected = activeOccupation.soc_code === occ.soc_code;
                const isHovered = hoveredOcc?.soc_code === occ.soc_code;
                const color = getQuadrantColor(occ);

                return (
                  <circle
                    key={occ.soc_code}
                    cx={cx}
                    cy={cy}
                    r={isSelected ? r + 3 : isHovered ? r + 2 : r}
                    fill={color}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.9 : 0.65}
                    stroke={
                      isSelected
                        ? palette.cyan
                        : isHovered
                        ? palette.textMain
                        : palette.surfaceSubtle
                    }
                    strokeWidth={isSelected ? 2.5 : 1}
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredOcc(occ)}
                    onMouseLeave={() => setHoveredOcc(null)}
                    onClick={() => onSelectOccupation(occ)}
                  />
                );
              })}

              {/* Highlight Ring */}
              <g pointerEvents="none">
                <circle
                  cx={scaleX(inspectedOcc.ai_exposure_llm_human)}
                  cy={scaleY(inspectedOcc.projected_growth_pct_2024_2034)}
                  r={scaleRadius(inspectedOcc.employment_2024) + 6}
                  fill="none"
                  stroke={palette.cyan}
                  strokeWidth={1.5}
                  strokeDasharray="2 2"
                />
              </g>
            </svg>
          </div>

          {/* Active / Hovered Occupation Inspection Strip */}
          <div
            className="p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4"
            style={{
              backgroundColor: palette.surfaceSubtle,
              borderColor: palette.border
            }}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-[11px] font-sans" style={{ color: palette.textMuted }}>
                <span>{inspectedOcc.job_category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono" style={{ color: palette.cyan }}>
                  SOC {inspectedOcc.soc_code}
                </span>
              </div>
              <div className="text-base sm:text-lg font-sans font-bold" style={{ color: palette.textMain }}>
                {inspectedOcc.occupation_title}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 font-mono text-xs">
              <div>
                <span className="block text-[10px] font-sans" style={{ color: palette.textMuted }}>
                  AI Exposure
                </span>
                <span className="font-bold tabular-nums" style={{ color: palette.cyan }}>
                  {(inspectedOcc.ai_exposure_llm_human * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-sans" style={{ color: palette.textMuted }}>
                  2024–34 Growth
                </span>
                <span
                  className="font-bold tabular-nums"
                  style={{
                    color:
                      inspectedOcc.projected_growth_pct_2024_2034 >= 3.1
                        ? palette.emerald
                        : inspectedOcc.projected_growth_pct_2024_2034 >= 0
                        ? palette.textMain
                        : palette.coral
                  }}
                >
                  {inspectedOcc.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                  {inspectedOcc.projected_growth_pct_2024_2034}%
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-sans" style={{ color: palette.textMuted }}>
                  Median Wage
                </span>
                <span className="font-bold tabular-nums" style={{ color: palette.textMain }}>
                  ${inspectedOcc.median_annual_wage_usd.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-sans" style={{ color: palette.textMuted }}>
                  2024 Employment
                </span>
                <span className="font-bold tabular-nums" style={{ color: palette.textMain }}>
                  {inspectedOcc.employment_2024.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Prominent Takeaway + Expandable 'How Is AI Exposure Measured?' Panel */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p
              className="text-xl sm:text-2xl font-display font-extrabold tracking-tight"
              style={{ color: palette.textMain, textWrap: 'balance' }}
            >
              Higher AI exposure doesn&apos;t automatically mean fewer jobs.
            </p>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <EvidenceBadge
                id="C001"
                onClick={onOpenEvidence}
                labelOverride="BLS & Eloundou et al."
              />
              <button
                type="button"
                onClick={() => setMeasureOpen((v) => !v)}
                aria-expanded={measureOpen}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap cursor-pointer hover:underline"
                style={{ color: palette.cyan }}
              >
                <span>How Is AI Exposure Measured?</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    measureOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {measureOpen && (
            <div
              className="pt-6 border-t space-y-4"
              style={{ borderColor: palette.border }}
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: palette.cyan }}>
                  Methodological Comparison
                </span>
                <p className="text-sm font-sans" style={{ color: palette.textMuted }}>
                  The same job can receive different scores depending on whether human evaluators, GPT-4, or standardized ability indices (Felten AIOE) are used.
                </p>
              </div>
              <Chapter3ThreeLenses
                embedded={true}
                activeOccupation={activeOccupation}
                onSelectOccupation={onSelectOccupation}
                onOpenEvidence={onOpenEvidence}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
