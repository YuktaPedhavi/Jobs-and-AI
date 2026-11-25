import React, { useState, useMemo, useEffect, useRef } from 'react';
import { occupations271, Occupation271 } from '../data/occupations271';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  X,
  ArrowRight,
  ArrowDown,
  Compass,
  BarChart3
} from 'lucide-react';

export type AtlasViewMode = 'constellation' | 'distribution';

interface OccupationConstellationProps {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onExploreProfile?: (occ: Occupation271) => void;
  onNextSection?: () => void;
  onOpenMethodology?: () => void;
  initialMode?: AtlasViewMode;
  className?: string;
}

interface CognitiveGroupMeta {
  key: string;
  simpleLabel: string;
}

const COGNITIVE_GROUP_META: Record<string, CognitiveGroupMeta> = {
  Quantitative: { key: 'Quantitative', simpleLabel: 'Numbers & Data' },
  Reasoning: { key: 'Reasoning', simpleLabel: 'Logic & Problem-Solving' },
  Verbal: { key: 'Verbal', simpleLabel: 'Language & Communication' },
  Memory: { key: 'Memory', simpleLabel: 'Recall & Information' },
  Attention: { key: 'Attention', simpleLabel: 'Focus & Precision' },
  Perceptual: { key: 'Perceptual', simpleLabel: 'Observation & Sensing' },
  Spatial: { key: 'Spatial', simpleLabel: 'Spatial & Physical Orientation' }
};

function computeMedian(sortedValues: number[]): number {
  if (sortedValues.length === 0) return 0;
  const mid = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 0) {
    return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
  }
  return sortedValues[mid];
}

// Unified SVG Canvas Geometry (shared by Constellation & Exposure Distribution)
const SVG_W = 860;
const SVG_H = 440;

// Spiral Constellation Center & Proportions
const CX = 430;
const CY = 220;

// Distribution (Beeswarm) Geometry inside the same 860x440 SVG
const PAD_L = 44;
const PAD_R = 36;
const PLOT_W = SVG_W - PAD_L - PAD_R;
const BEESWARM_CENTER_Y = 208;
const BEESWARM_MIN_Y = 58;
const BEESWARM_MAX_Y = 360;
const BEESWARM_COLLISION = 11.2;

interface PointCoord {
  x: number;
  y: number;
}

// Clean, balanced concentric spiral galaxy layout matching the original Constellation look
function computeSpiralCoords(items: Occupation271[]): Map<string, PointCoord> {
  const coords = new Map<string, PointCoord>();
  const ordered = [...items].sort(
    (a, b) =>
      b.ai_exposure_llm_human - a.ai_exposure_llm_human ||
      a.occupation_title.localeCompare(b.occupation_title)
  );

  const total = ordered.length;
  ordered.forEach((occ, idx) => {
    const phi = (idx / total) * Math.PI * 2 * 3.4 - Math.PI / 2;
    const dist = 24 + Math.sqrt((idx + 1) / total) * 168;
    const x = CX + Math.cos(phi) * dist * 1.18;
    const y = CY + Math.sin(phi) * dist * 0.88;
    coords.set(occ.soc_code, { x, y });
  });

  return coords;
}

function computeDistributionCoords(items: Occupation271[]): Map<string, PointCoord> {
  const coords = new Map<string, PointCoord>();
  const sorted = [...items].sort((a, b) => {
    if (a.ai_exposure_llm_human !== b.ai_exposure_llm_human) {
      return a.ai_exposure_llm_human - b.ai_exposure_llm_human;
    }
    return a.occupation_title.localeCompare(b.occupation_title);
  });

  const placed: PointCoord[] = [];
  const step = 2.4;

  for (let i = 0; i < sorted.length; i++) {
    const occ = sorted[i];
    const x = PAD_L + Math.max(0, Math.min(1, occ.ai_exposure_llm_human)) * PLOT_W;
    const preferUp = i % 2 === 0;
    let bestY = BEESWARM_CENTER_Y;
    let found = false;

    for (let dist = 0; dist <= 165; dist += step) {
      const candidates =
        dist === 0
          ? [BEESWARM_CENTER_Y]
          : preferUp
          ? [BEESWARM_CENTER_Y - dist, BEESWARM_CENTER_Y + dist]
          : [BEESWARM_CENTER_Y + dist, BEESWARM_CENTER_Y - dist];

      for (const cy of candidates) {
        if (cy < BEESWARM_MIN_Y || cy > BEESWARM_MAX_Y) continue;
        let collides = false;
        for (let j = placed.length - 1; j >= 0; j--) {
          const p = placed[j];
          const dx = x - p.x;
          if (dx > BEESWARM_COLLISION) break;
          const dy = cy - p.y;
          if (dx * dx + dy * dy < BEESWARM_COLLISION * BEESWARM_COLLISION) {
            collides = true;
            break;
          }
        }
        if (!collides) {
          bestY = cy;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    const pt = { x, y: bestY };
    placed.push(pt);
    coords.set(occ.soc_code, pt);
  }

  return coords;
}

export const OccupationConstellation: React.FC<OccupationConstellationProps> = ({
  activeOccupation,
  onSelectOccupation,
  onExploreProfile,
  onNextSection,
  onOpenMethodology,
  initialMode = 'constellation',
  className = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [viewMode, setViewMode] = useState<AtlasViewMode>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [hoveredOcc, setHoveredOcc] = useState<Occupation271 | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    chartBg: isDark ? '#071731' : '#f1efe6',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceHover: isDark ? '#102a50' : '#f5f3ec',
    border: isDark ? '#163560' : '#d5dde7',
    gridLine: isDark ? '#142f54' : '#dce3ec',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#06b6d4' : '#0284c7',
    cyanBright: isDark ? '#22d3ee' : '#0284c7',
    amber: isDark ? '#f59e0b' : '#b45309',
    emerald: isDark ? '#10b981' : '#059669',
    selectedGlow: isDark ? '#d7e63b' : '#1e5bb4'
  };

  const getExposureColor = (level: string) => {
    if (level === 'High') return palette.cyan;
    if (level === 'Medium') return palette.amber;
    return palette.emerald;
  };

  // Dynamic dataset statistics & thresholds
  const datasetStats = useMemo(() => {
    let high = 0;
    let medium = 0;
    let low = 0;
    let lowMax = 0;
    let highMin = 1;
    const allExposures: number[] = [];

    occupations271.forEach((o) => {
      if (o.ai_exposure_level === 'High') {
        high++;
        highMin = Math.min(highMin, o.ai_exposure_llm_human);
      } else if (o.ai_exposure_level === 'Medium') {
        medium++;
      } else {
        low++;
        lowMax = Math.max(lowMax, o.ai_exposure_llm_human);
      }
      allExposures.push(o.ai_exposure_llm_human);
    });

    allExposures.sort((a, b) => a - b);
    const medianExposure = computeMedian(allExposures);

    return {
      total: occupations271.length,
      high,
      medium,
      low,
      lowBoundary: (lowMax + 0.27) / 2,
      highBoundary: highMin,
      medianExposure
    };
  }, []);

  // All categories from dataset for optional filter dropdown
  const categoriesList = useMemo(() => {
    const map = new Map<string, number>();
    occupations271.forEach((o) =>
      map.set(o.job_category, (map.get(o.job_category) || 0) + 1)
    );
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  // Search matches
  const searchQueryTrimmed = searchQuery.trim().toLowerCase();
  const searchSuggestions = useMemo(() => {
    if (!searchQueryTrimmed) return [];
    return occupations271
      .filter(
        (o) =>
          o.occupation_title.toLowerCase().includes(searchQueryTrimmed) ||
          o.job_category.toLowerCase().includes(searchQueryTrimmed) ||
          o.soc_code.includes(searchQueryTrimmed)
      )
      .slice(0, 8);
  }, [searchQueryTrimmed]);

  const matchingCodes = useMemo(() => {
    if (!searchQueryTrimmed && categoryFilter === 'all') return null;
    const set = new Set<string>();
    occupations271.forEach((o) => {
      const matchSearch =
        !searchQueryTrimmed ||
        o.occupation_title.toLowerCase().includes(searchQueryTrimmed) ||
        o.job_category.toLowerCase().includes(searchQueryTrimmed) ||
        o.soc_code.includes(searchQueryTrimmed);
      const matchCat = categoryFilter === 'all' || o.job_category === categoryFilter;
      if (matchSearch && matchCat) {
        set.add(o.soc_code);
      }
    });
    return set;
  }, [searchQueryTrimmed, categoryFilter]);

  // Precomputed coordinates for both views
  const constellationCoords = useMemo(
    () => computeSpiralCoords(occupations271),
    []
  );
  const distributionCoords = useMemo(
    () => computeDistributionCoords(occupations271),
    []
  );

  const handleSelectSearchMatch = (occ: Occupation271) => {
    onSelectOccupation(occ);
    setSearchQuery(occ.occupation_title);
    setSearchDropdownOpen(false);
  };

  const activeCogMeta =
    COGNITIVE_GROUP_META[activeOccupation.distinctive_cognitive_strength];
  const activeColor = getExposureColor(activeOccupation.ai_exposure_level);

  const hoveredPos = hoveredOcc
    ? viewMode === 'constellation'
      ? constellationCoords.get(hoveredOcc.soc_code)
      : distributionCoords.get(hoveredOcc.soc_code)
    : null;

  // Exposure zone boundary X coordinates for Distribution view
  const xLowEnd = PAD_L + datasetStats.lowBoundary * PLOT_W;
  const xHighStart = PAD_L + datasetStats.highBoundary * PLOT_W;
  const xMedian = PAD_L + datasetStats.medianExposure * PLOT_W;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ================================================================= */}
      {/* TOP AREA: Heading, Short Sentence, Search, 2 Tabs, Category Filter */}
      {/* ================================================================= */}
      <div className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <header className="space-y-2 max-w-2xl">
            <div
              className="flex items-center gap-2 text-xs font-mono tracking-wider"
              style={{ color: palette.cyanBright }}
            >
              <span className="font-bold">01</span>
              <span aria-hidden="true">·</span>
              <span>Living Atlas</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
              style={{ color: palette.textMain, textWrap: 'balance' }}
            >
              Explore 271 Jobs
            </h2>

            <p
              className="text-base sm:text-xl font-sans leading-relaxed"
              style={{ color: palette.textMuted }}
            >
              See how AI exposure differs across occupations.
            </p>
          </header>

          {/* Search Field */}
          <div ref={searchContainerRef} className="relative w-full lg:w-80 shrink-0">
            <label htmlFor="atlas-job-search" className="sr-only">
              Search 271 occupations
            </label>
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: palette.textMuted }}
              aria-hidden="true"
            />
            <input
              id="atlas-job-search"
              type="text"
              value={searchQuery}
              onFocus={() => setSearchDropdownOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchDropdownOpen(true);
              }}
              placeholder="Search a job (e.g. Nurse, Designer)..."
              className="w-full pl-10 pr-9 py-2.5 min-h-[42px] text-sm font-sans rounded-xl border focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: searchQueryTrimmed ? palette.cyanBright : palette.border,
                color: palette.textMain
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchDropdownOpen(false);
                }}
                aria-label="Clear job search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md cursor-pointer hover:opacity-80"
                style={{ color: palette.textMuted }}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {searchDropdownOpen && searchSuggestions.length > 0 && (
              <ul
                role="listbox"
                aria-label="Matching occupations"
                className="absolute left-0 right-0 mt-1.5 rounded-xl border shadow-2xl z-40 overflow-hidden max-h-72 overflow-y-auto"
                style={{
                  backgroundColor: palette.surfaceBg,
                  borderColor: palette.border
                }}
              >
                {searchSuggestions.map((occ) => {
                  const expColor = getExposureColor(occ.ai_exposure_level);
                  return (
                    <li
                      key={occ.soc_code}
                      role="option"
                      aria-selected={occ.soc_code === activeOccupation.soc_code}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectSearchMatch(occ)}
                        className="w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer border-b last:border-b-0"
                        style={{
                          borderColor: palette.border,
                          color: palette.textMain,
                          backgroundColor:
                            occ.soc_code === activeOccupation.soc_code
                              ? palette.surfaceHover
                              : 'transparent'
                        }}
                      >
                        <div className="min-w-0">
                          <span className="font-sans font-semibold block truncate">
                            {occ.occupation_title}
                          </span>
                          <span
                            className="font-sans text-[11px] block truncate"
                            style={{ color: palette.textMuted }}
                          >
                            {occ.job_category}
                          </span>
                        </div>
                        <span
                          className="font-mono font-bold tabular-nums shrink-0"
                          style={{ color: expColor }}
                        >
                          {(occ.ai_exposure_llm_human * 100).toFixed(0)}%
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Simplified Controls Row: 2 Toggle Buttons + Optional Category Filter */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b"
          style={{ borderColor: palette.border }}
        >
          <div
            role="tablist"
            aria-label="Living Atlas view modes"
            className="inline-flex items-center gap-1.5 p-1 rounded-xl border"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            {[
              { id: 'constellation' as const, label: 'Constellation', icon: Compass },
              {
                id: 'distribution' as const,
                label: 'Exposure Distribution',
                icon: BarChart3
              }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = viewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setViewMode(tab.id)}
                  className="px-4 py-2 min-h-[38px] text-xs font-sans font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: isSelected ? palette.cyanBright : 'transparent',
                    color: isSelected
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted
                  }}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {matchingCodes && (
              <span className="text-xs font-mono" style={{ color: palette.cyanBright }}>
                {matchingCodes.size} {matchingCodes.size === 1 ? 'job' : 'jobs'} highlighted
              </span>
            )}

            <label htmlFor="atlas-category-filter" className="sr-only">
              Filter by job category
            </label>
            <select
              id="atlas-category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 min-h-[38px] rounded-xl border text-xs font-sans cursor-pointer focus:outline-none focus-visible:ring-2 max-w-[240px]"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: categoryFilter !== 'all' ? palette.cyanBright : palette.border,
                color: palette.textMain
              }}
            >
              <option value="all">All Job Categories ({categoriesList.length})</option>
              {categoriesList.map(([cat, count]) => (
                <option key={cat} value={cat}>
                  {cat} ({count})
                </option>
              ))}
            </select>

            {categoryFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className="text-xs font-mono hover:underline cursor-pointer"
                style={{ color: palette.cyanBright }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TWO-COLUMN MAIN LAYOUT: Visualization (left) + Details (right)    */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT COLUMN: Unified Animated Visualization Canvas (8 cols) */}
        <div
          className="lg:col-span-8 rounded-2xl border relative overflow-hidden flex flex-col justify-between"
          style={{
            backgroundColor: palette.chartBg,
            borderColor: palette.border
          }}
        >
          {/* Unified Interactive SVG Stage */}
          <div className="relative p-2 sm:p-4 flex-1 flex items-center">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full h-auto overflow-visible select-none"
              role="img"
              aria-label={`Interactive Living Atlas of 271 occupations in ${
                viewMode === 'constellation' ? 'Constellation' : 'Exposure Distribution'
              } view. Currently selected: ${activeOccupation.occupation_title} (${(
                activeOccupation.ai_exposure_llm_human * 100
              ).toFixed(0)}% AI exposure).`}
            >
              <defs>
                {/* Ambient galaxy core glow for Constellation */}
                <radialGradient id="atlas-spiral-glow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor={palette.cyanBright}
                    stopOpacity={isDark ? 0.14 : 0.08}
                  />
                  <stop
                    offset="55%"
                    stopColor={palette.amber}
                    stopOpacity={isDark ? 0.05 : 0.03}
                  />
                  <stop
                    offset="100%"
                    stopColor={palette.emerald}
                    stopOpacity={0}
                  />
                </radialGradient>

                {/* Soft luminous star glow for dots */}
                <filter id="atlas-dot-glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Brighter halo glow for the selected occupation */}
                <filter id="atlas-selected-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ========================================================= */}
              {/* LAYER A: MINIMAL SPIRAL CONSTELLATION BACKDROP            */}
              {/* ========================================================= */}
              <g
                style={{
                  opacity: viewMode === 'constellation' ? 1 : 0,
                  pointerEvents: 'none',
                  transition: reducedMotion ? 'none' : 'opacity 380ms ease'
                }}
              >
                {/* Soft radial galaxy backdrop */}
                <ellipse
                  cx={CX}
                  cy={CY}
                  rx={265}
                  ry={196}
                  fill="url(#atlas-spiral-glow)"
                />

                {/* Minimal faint orbital guide arcs (uncluttered) */}
                <ellipse
                  cx={CX}
                  cy={CY}
                  rx={112}
                  ry={84}
                  fill="none"
                  stroke={palette.gridLine}
                  strokeOpacity={isDark ? 0.55 : 0.65}
                  strokeWidth={0.9}
                />
                <ellipse
                  cx={CX}
                  cy={CY}
                  rx={185}
                  ry={138}
                  fill="none"
                  stroke={palette.gridLine}
                  strokeOpacity={isDark ? 0.45 : 0.55}
                  strokeWidth={0.9}
                />
                <ellipse
                  cx={CX}
                  cy={CY}
                  rx={248}
                  ry={184}
                  fill="none"
                  stroke={palette.gridLine}
                  strokeOpacity={isDark ? 0.35 : 0.45}
                  strokeWidth={0.9}
                />
              </g>

              {/* ========================================================= */}
              {/* LAYER B: EXPOSURE DISTRIBUTION BANDS, GRID & MEDIAN LINE  */}
              {/* ========================================================= */}
              <g
                style={{
                  opacity: viewMode === 'distribution' ? 1 : 0,
                  pointerEvents: 'none',
                  transition: reducedMotion ? 'none' : 'opacity 360ms ease'
                }}
              >
                {/* Subtle vertical exposure zone bands */}
                <rect
                  x={PAD_L}
                  y={36}
                  width={xLowEnd - PAD_L}
                  height={338}
                  fill={palette.emerald}
                  fillOpacity={isDark ? 0.045 : 0.05}
                />
                <rect
                  x={xLowEnd}
                  y={36}
                  width={xHighStart - xLowEnd}
                  height={338}
                  fill={palette.amber}
                  fillOpacity={isDark ? 0.045 : 0.05}
                />
                <rect
                  x={xHighStart}
                  y={36}
                  width={PAD_L + PLOT_W - xHighStart}
                  height={338}
                  fill={palette.cyanBright}
                  fillOpacity={isDark ? 0.05 : 0.055}
                />

                {/* Top zone labels */}
                <text
                  x={(PAD_L + xLowEnd) / 2}
                  y={26}
                  textAnchor="middle"
                  fill={palette.emerald}
                  className="font-mono text-[10px] font-bold uppercase tracking-wider"
                >
                  Low
                </text>
                <text
                  x={(xLowEnd + xHighStart) / 2}
                  y={26}
                  textAnchor="middle"
                  fill={palette.amber}
                  className="font-mono text-[10px] font-bold uppercase tracking-wider"
                >
                  Medium
                </text>
                <text
                  x={(xHighStart + PAD_L + PLOT_W) / 2}
                  y={26}
                  textAnchor="middle"
                  fill={palette.cyanBright}
                  className="font-mono text-[10px] font-bold uppercase tracking-wider"
                >
                  High
                </text>

                {/* Vertical percentage gridlines (0%, 20%, 40%, 60%, 80%, 100%) */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((tick) => {
                  const tx = PAD_L + tick * PLOT_W;
                  return (
                    <g key={tick}>
                      <line
                        x1={tx}
                        y1={36}
                        x2={tx}
                        y2={374}
                        stroke={palette.gridLine}
                        strokeWidth={1}
                        strokeDasharray={tick === 0 || tick === 1 ? undefined : '3 4'}
                      />
                      <text
                        x={tx}
                        y={394}
                        textAnchor="middle"
                        fill={palette.textMuted}
                        className="font-mono text-[11px] tabular-nums"
                      >
                        {(tick * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}

                {/* Horizontal baseline */}
                <line
                  x1={PAD_L}
                  y1={374}
                  x2={PAD_L + PLOT_W}
                  y2={374}
                  stroke={palette.border}
                  strokeWidth={1.3}
                />

                {/* Dataset Median line */}
                <line
                  x1={xMedian}
                  y1={36}
                  x2={xMedian}
                  y2={374}
                  stroke={palette.textMain}
                  strokeOpacity={0.55}
                  strokeWidth={1.4}
                  strokeDasharray="4 3"
                />
                <rect
                  x={xMedian - 42}
                  y={40}
                  width={84}
                  height={18}
                  rx={4}
                  fill={palette.surfaceBg}
                  stroke={palette.border}
                  strokeWidth={1}
                />
                <text
                  x={xMedian}
                  y={52}
                  textAnchor="middle"
                  fill={palette.textMain}
                  className="font-mono text-[10px] font-semibold tabular-nums"
                >
                  Median {(datasetStats.medianExposure * 100).toFixed(1)}%
                </text>

                {/* Bottom axis title & directional labels */}
                <text
                  x={PAD_L}
                  y={420}
                  textAnchor="start"
                  fill={palette.emerald}
                  className="font-sans text-[11px] font-semibold"
                >
                  ← Lower Exposure
                </text>
                <text
                  x={PAD_L + PLOT_W / 2}
                  y={420}
                  textAnchor="middle"
                  fill={palette.textMuted}
                  className="font-sans text-[11px]"
                >
                  AI Task Exposure (0–100%)
                </text>
                <text
                  x={PAD_L + PLOT_W}
                  y={420}
                  textAnchor="end"
                  fill={palette.cyanBright}
                  className="font-sans text-[11px] font-semibold"
                >
                  Higher Exposure →
                </text>
              </g>

              {/* ========================================================= */}
              {/* LAYER C: ALL 271 ANIMATED OCCUPATION NODES                */}
              {/* ========================================================= */}
              {occupations271.map((occ) => {
                const isSelected = occ.soc_code === activeOccupation.soc_code;
                const isHovered = hoveredOcc?.soc_code === occ.soc_code;
                if (isSelected || isHovered) return null;

                const pt =
                  viewMode === 'constellation'
                    ? constellationCoords.get(occ.soc_code)!
                    : distributionCoords.get(occ.soc_code)!;

                const matches = matchingCodes ? matchingCodes.has(occ.soc_code) : true;
                const dotColor = getExposureColor(occ.ai_exposure_level);
                // Subtle compact size variation in Constellation (like original), uniform in Distribution
                const constellationR = Math.max(
                  2.7,
                  Math.min(5.6, Math.sqrt(occ.employment_2024 / 2800000) * 4.2 + 2.4)
                );
                const r =
                  matchingCodes && matches
                    ? 5.2
                    : viewMode === 'constellation'
                    ? constellationR
                    : 4.7;

                return (
                  <g
                    key={occ.soc_code}
                    style={{
                      transform: `translate(${pt.x}px, ${pt.y}px)`,
                      transition: reducedMotion
                        ? 'none'
                        : 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  >
                    <circle
                      cx={0}
                      cy={0}
                      r={r}
                      fill={dotColor}
                      fillOpacity={matchingCodes ? (matches ? 0.96 : 0.16) : 0.88}
                      filter={
                        isDark && viewMode === 'constellation' && (!matchingCodes || matches)
                          ? 'url(#atlas-dot-glow)'
                          : undefined
                      }
                      tabIndex={0}
                      role="button"
                      aria-label={`${occ.occupation_title}: ${(
                        occ.ai_exposure_llm_human * 100
                      ).toFixed(0)}% AI exposure, ${occ.ai_exposure_level}`}
                      className="cursor-pointer focus:outline-none"
                      onMouseEnter={() => setHoveredOcc(occ)}
                      onMouseLeave={() => setHoveredOcc(null)}
                      onFocus={() => setHoveredOcc(occ)}
                      onBlur={() => setHoveredOcc(null)}
                      onClick={() => onSelectOccupation(occ)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectOccupation(occ);
                        }
                      }}
                    />
                  </g>
                );
              })}

              {/* Render Hovered and Selected nodes last so they glow brightly on top */}
              {occupations271
                .filter(
                  (occ) =>
                    occ.soc_code === activeOccupation.soc_code ||
                    hoveredOcc?.soc_code === occ.soc_code
                )
                .map((occ) => {
                  const isSelected = occ.soc_code === activeOccupation.soc_code;
                  const pt =
                    viewMode === 'constellation'
                      ? constellationCoords.get(occ.soc_code)!
                      : distributionCoords.get(occ.soc_code)!;
                  const dotColor = isSelected
                    ? palette.selectedGlow
                    : getExposureColor(occ.ai_exposure_level);

                  return (
                    <g
                      key={`highlight-${occ.soc_code}`}
                      style={{
                        transform: `translate(${pt.x}px, ${pt.y}px)`,
                        transition: reducedMotion
                          ? 'none'
                          : 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      {isSelected && (
                        <>
                          <circle
                            cx={0}
                            cy={0}
                            r={16}
                            fill={palette.selectedGlow}
                            fillOpacity={isDark ? 0.22 : 0.15}
                            pointerEvents="none"
                          />
                          <circle
                            cx={0}
                            cy={0}
                            r={11}
                            fill="none"
                            stroke={palette.selectedGlow}
                            strokeWidth={1.5}
                            strokeOpacity={0.75}
                            pointerEvents="none"
                          />
                        </>
                      )}

                      <circle
                        cx={0}
                        cy={0}
                        r={isSelected ? 7.2 : 6.2}
                        fill={dotColor}
                        stroke={isDark ? '#ffffff' : '#061329'}
                        strokeWidth={2}
                        filter="url(#atlas-selected-glow)"
                        tabIndex={0}
                        role="button"
                        aria-label={`Selected: ${occ.occupation_title}: ${(
                          occ.ai_exposure_llm_human * 100
                        ).toFixed(0)}% AI exposure`}
                        className="cursor-pointer focus:outline-none"
                        onMouseEnter={() => setHoveredOcc(occ)}
                        onMouseLeave={() => setHoveredOcc(null)}
                        onFocus={() => setHoveredOcc(occ)}
                        onBlur={() => setHoveredOcc(null)}
                        onClick={() => onSelectOccupation(occ)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectOccupation(occ);
                          }
                        }}
                      />
                    </g>
                  );
                })}
            </svg>

            {/* Compact Hover / Focus Tooltip */}
            {hoveredOcc && hoveredPos && (
              <div
                role="status"
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full px-3.5 py-2.5 rounded-xl border shadow-2xl text-xs w-60"
                style={{
                  left: `${Math.max(16, Math.min(84, (hoveredPos.x / SVG_W) * 100))}%`,
                  top: `${Math.max(14, (hoveredPos.y / SVG_H) * 100 - 3)}%`,
                  backgroundColor: palette.surfaceBg,
                  borderColor: getExposureColor(hoveredOcc.ai_exposure_level),
                  color: palette.textMain
                }}
              >
                <div className="font-sans font-semibold leading-snug">
                  {hoveredOcc.occupation_title}
                </div>
                <div className="flex items-center justify-between gap-2 mt-1 font-mono text-[11px]">
                  <span style={{ color: palette.textMuted }}>
                    {hoveredOcc.ai_exposure_level} exposure
                  </span>
                  <span
                    className="font-bold tabular-nums"
                    style={{ color: getExposureColor(hoveredOcc.ai_exposure_level) }}
                  >
                    {(hoveredOcc.ai_exposure_llm_human * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Subtle Bottom Bar inside Chart Frame */}
          <div
            className="px-4 sm:px-5 py-2.5 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border,
              color: palette.textMuted
            }}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5" style={{ color: palette.textMain }}>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: palette.cyan }}
                  aria-hidden="true"
                />
                <span>High ({datasetStats.high})</span>
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ color: palette.textMain }}>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: palette.amber }}
                  aria-hidden="true"
                />
                <span>Medium ({datasetStats.medium})</span>
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ color: palette.textMain }}>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: palette.emerald }}
                  aria-hidden="true"
                />
                <span>Low ({datasetStats.low})</span>
              </span>
            </div>

            <span>
              {viewMode === 'constellation'
                ? 'Colour shows AI exposure level · inner spiral = higher overlap'
                : `0–100% scale · Median ${(datasetStats.medianExposure * 100).toFixed(1)}%`}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Occupation Details Panel (4 cols) */}
        <aside
          aria-label="Selected occupation details"
          className="lg:col-span-4 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-5"
          style={{
            backgroundColor: palette.surfaceBg,
            borderColor: palette.border
          }}
        >
          <div className="space-y-5">
            {/* Occupation Name, SOC, Category */}
            <div className="space-y-1.5 pb-4 border-b" style={{ borderColor: palette.border }}>
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                <span style={{ color: palette.textMuted }}>Selected Occupation</span>
                <span style={{ color: palette.textMuted }}>SOC {activeOccupation.soc_code}</span>
              </div>

              <h3
                className="text-xl font-sans font-bold leading-snug"
                style={{ color: palette.textMain }}
              >
                {activeOccupation.occupation_title}
              </h3>

              <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
                {activeOccupation.job_category}
              </p>
            </div>

            {/* AI Exposure Score + Exposure Label + Gauge */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-sans font-medium" style={{ color: palette.textMuted }}>
                  AI Exposure
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-mono font-bold tabular-nums"
                    style={{ color: activeColor }}
                  >
                    {(activeOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                  </span>
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: activeColor }}
                  >
                    {activeOccupation.ai_exposure_level}
                  </span>
                </div>
              </div>

              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ backgroundColor: palette.chartBg }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, activeOccupation.ai_exposure_llm_human * 100)}%`,
                    backgroundColor: activeColor
                  }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono" style={{ color: palette.textMuted }}>
                <span>0%</span>
                <span>Median {(datasetStats.medianExposure * 100).toFixed(1)}%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Structured Metrics Grid */}
            <dl
              className="grid grid-cols-2 gap-x-3 gap-y-4 pt-4 border-t text-xs"
              style={{ borderColor: palette.border }}
            >
              <div>
                <dt className="font-sans text-[11px]" style={{ color: palette.textMuted }}>
                  Distinctive Thinking Style
                </dt>
                <dd className="font-sans font-semibold mt-0.5" style={{ color: palette.textMain }}>
                  {activeCogMeta
                    ? activeCogMeta.simpleLabel
                    : activeOccupation.distinctive_cognitive_strength}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[11px]" style={{ color: palette.textMuted }}>
                  Top O*NET Ability
                </dt>
                <dd className="font-sans font-semibold mt-0.5" style={{ color: palette.textMain }}>
                  {activeOccupation.top_cognitive_ability}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[11px]" style={{ color: palette.textMuted }}>
                  U.S. Employment
                </dt>
                <dd
                  className="font-mono font-semibold tabular-nums mt-0.5"
                  style={{ color: palette.textMain }}
                >
                  {activeOccupation.employment_2024.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[11px]" style={{ color: palette.textMuted }}>
                  Median Annual Wage
                </dt>
                <dd
                  className="font-mono font-semibold tabular-nums mt-0.5"
                  style={{ color: palette.textMain }}
                >
                  ${activeOccupation.median_annual_wage_usd.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Primary CTA: Explore Full Profession Profile */}
          {onExploreProfile && (
            <button
              type="button"
              onClick={() => onExploreProfile(activeOccupation)}
              className="w-full py-2.5 px-4 min-h-[42px] rounded-xl font-sans font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: palette.cyanBright,
                color: isDark ? '#061329' : '#ffffff'
              }}
            >
              <span>Explore Full Profession Profile</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </aside>
      </div>

      {/* ================================================================= */}
      {/* BOTTOM NOTE & NEXT CHAPTER BRIDGE                                 */}
      {/* ================================================================= */}
      <div
        className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3"
      >
        <p className="text-xs font-sans" style={{ color: palette.textMuted }}>
          AI exposure measures how much of a job&apos;s work overlaps with AI capabilities. It does not measure the chance of losing that job.
          {onOpenMethodology && (
            <>
              {' '}
              <button
                type="button"
                onClick={onOpenMethodology}
                className="underline font-mono cursor-pointer ml-1"
                style={{ color: palette.cyanBright }}
              >
                Data &amp; methods
              </button>
            </>
          )}
        </p>

        {onNextSection && (
          <button
            type="button"
            onClick={onNextSection}
            className="font-mono text-xs font-semibold hover:underline inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 self-start md:self-center"
            style={{ color: palette.cyanBright }}
          >
            <span>Next: Does More AI Exposure Mean Fewer Jobs?</span>
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
