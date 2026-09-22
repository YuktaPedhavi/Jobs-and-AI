import React, { useState, useMemo } from 'react';
import { occupations271, Occupation271 } from '../../data/occupations271';
import { calculatedKeyFindings } from '../../data/researchData';
import { EvidenceBadge } from '../EvidenceBadge';
import { Filter, Search, Info, Sparkles, Check, ArrowUpRight } from 'lucide-react';

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
  const [quadrantFilter, setQuadrantFilter] = useState<string>('all');
  const [hoveredOcc, setHoveredOcc] = useState<Occupation271 | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // SVG viewport dimensions
  const svgWidth = 800;
  const svgHeight = 480;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };

  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  // Scales
  const minX = 0;
  const maxX = 0.9;
  const scaleX = (val: number) => padding.left + ((val - minX) / (maxX - minX)) * innerWidth;

  const minY = -18;
  const maxY = 35;
  const scaleY = (val: number) => padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;

  // Employment radius (sqrt scale)
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
        return (occ.ai_exposure_level === 'Low' || occ.ai_exposure_level === 'Medium') && occ.projected_growth_pct_2024_2034 > 0;
      if (quadrantFilter === 'low_declining')
        return (occ.ai_exposure_level === 'Low' || occ.ai_exposure_level === 'Medium') && occ.projected_growth_pct_2024_2034 < 0;
      return true;
    });
  }, [quadrantFilter, searchQuery]);

  const medianX = scaleX(calculatedKeyFindings.dataset_median_exposure);
  const baselineY = scaleY(calculatedKeyFindings.bls_baseline_growth);
  const zeroY = scaleY(0);

  const getQuadrantColor = (occ: Occupation271) => {
    const isHigh = occ.ai_exposure_llm_human >= calculatedKeyFindings.dataset_median_exposure;
    const isGrow = occ.projected_growth_pct_2024_2034 >= 0;

    if (isHigh && isGrow) return '#22D3EE'; // cyan
    if (isHigh && !isGrow) return '#F43F5E'; // rose
    if (!isHigh && isGrow) return '#10B981'; // emerald
    return '#94A3B8'; // slate
  };

  return (
    <article
      id="ch01_four_futures"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">01</span>
            <span>271 JOBS. FOUR DIFFERENT FUTURES.</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EEF2F6] tracking-tight leading-tight">
            Exposure barely predicts whether a profession grows or declines.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            Plotting all 271 occupations reveals an empirical correlation of{' '}
            <strong className="text-[#22D3EE] font-mono bg-[#161C25] border border-[#222B38] px-1.5 py-0.5 rounded">
              r = -0.094
            </strong>
            . In statistics, that represents almost no simple relationship. An AI-exposed role can easily expand, while a low-exposure role can shrink.
          </p>
        </header>

        {/* Four Quadrant Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <button
            onClick={() => setQuadrantFilter('high_growing')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'high_growing'
                ? 'bg-[#161C25] border-[#22D3EE] ring-2 ring-[#22D3EE]/30 shadow-lg'
                : 'bg-[#161C25]/60 border-[#222B38] hover:border-[#22D3EE]'
            }`}
          >
            <span className="text-[10px] text-[#94A3B8] uppercase block font-sans">High Exposure + Growth</span>
            <div className="text-xl font-bold text-[#22D3EE] mt-0.5">72 jobs (80%)</div>
            <span className="text-[11px] text-[#94A3B8]">47 beat 3.1% BLS average</span>
          </button>

          <button
            onClick={() => setQuadrantFilter('high_declining')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'high_declining'
                ? 'bg-[#161C25] border-[#F43F5E] ring-2 ring-[#F43F5E]/30 shadow-lg'
                : 'bg-[#161C25]/60 border-[#222B38] hover:border-[#F43F5E]'
            }`}
          >
            <span className="text-[10px] text-[#94A3B8] uppercase block font-sans">High Exposure + Decline</span>
            <div className="text-xl font-bold text-[#F43F5E] mt-0.5">13 jobs (14%)</div>
            <span className="text-[11px] text-[#94A3B8]">e.g. Survey researchers, clerks</span>
          </button>

          <button
            onClick={() => setQuadrantFilter('low_growing')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'low_growing'
                ? 'bg-[#161C25] border-[#10B981] ring-2 ring-[#10B981]/30 shadow-lg'
                : 'bg-[#161C25]/60 border-[#222B38] hover:border-[#10B981]'
            }`}
          >
            <span className="text-[10px] text-[#94A3B8] uppercase block font-sans">Low Exposure + Growth</span>
            <div className="text-xl font-bold text-[#10B981] mt-0.5">105 jobs</div>
            <span className="text-[11px] text-[#94A3B8]">Physical care, health, trades</span>
          </button>

          <button
            onClick={() => setQuadrantFilter('low_declining')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'low_declining'
                ? 'bg-[#161C25] border-[#EEF2F6] ring-2 ring-[#EEF2F6]/30 shadow-lg'
                : 'bg-[#161C25]/60 border-[#222B38] hover:border-[#EEF2F6]'
            }`}
          >
            <span className="text-[10px] text-[#94A3B8] uppercase block font-sans">Low Exposure + Decline</span>
            <div className="text-xl font-bold text-[#EEF2F6] mt-0.5">24 jobs</div>
            <span className="text-[11px] text-[#94A3B8]">Mechanization, legacy roles</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161C25] p-3.5 rounded-xl border border-[#222B38]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#94A3B8]">Showing:</span>
            <button
              onClick={() => setQuadrantFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                quadrantFilter === 'all'
                  ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                  : 'bg-[#0C1016] text-[#94A3B8] hover:bg-[#161C25] hover:text-[#EEF2F6] border border-[#222B38]'
              }`}
            >
              All 271 ({occupations271.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search occupation..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#0C1016] text-[#EEF2F6] rounded-lg border border-[#222B38] focus:outline-none focus:border-[#22D3EE] placeholder-[#94A3B8]"
            />
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Interactive Scatterplot Canvas */}
        <div className="bg-[#161C25] p-4 sm:p-6 rounded-2xl border border-[#222B38] shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2 font-mono">
            <span>Y-AXIS: Projected 10-Year Growth Rate (% 2024–2034)</span>
            <span>Bubble size = 2024 Employment</span>
          </div>

          <div className="overflow-x-auto bg-[#0C1016] p-3 rounded-xl border border-[#222B38]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[640px] select-none"
            >
              {/* Gridlines */}
              {[-10, 0, 10, 20, 30].map((yVal) => (
                <g key={yVal}>
                  <line
                    x1={padding.left}
                    y1={scaleY(yVal)}
                    x2={svgWidth - padding.right}
                    y2={scaleY(yVal)}
                    stroke="#1E2633"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={scaleY(yVal) + 4}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-[#94A3B8]"
                  >
                    {yVal > 0 ? `+${yVal}%` : `${yVal}%`}
                  </text>
                </g>
              ))}

              {/* Zero line */}
              <line
                x1={padding.left}
                y1={zeroY}
                x2={svgWidth - padding.right}
                y2={zeroY}
                stroke="#222B38"
                strokeWidth={1.5}
              />

              {/* BLS baseline average growth line (+3.1%) */}
              <line
                x1={padding.left}
                y1={baselineY}
                x2={svgWidth - padding.right}
                y2={baselineY}
                stroke="#10B981"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <text
                x={svgWidth - padding.right}
                y={baselineY - 5}
                textAnchor="end"
                className="text-[10px] font-mono fill-[#10B981] font-semibold"
              >
                BLS Baseline (+3.1%)
              </text>

              {/* Dataset Median Exposure Reference Line */}
              <line
                x1={medianX}
                y1={padding.top}
                x2={medianX}
                y2={svgHeight - padding.bottom}
                stroke="#22D3EE"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <text
                x={medianX + 6}
                y={padding.top + 14}
                className="text-[10px] font-mono fill-[#22D3EE] font-medium"
              >
                Dataset Median (0.37)
              </text>

              {/* X Axis ticks */}
              {[0.1, 0.3, 0.5, 0.7].map((xVal) => (
                <g key={xVal}>
                  <line
                    x1={scaleX(xVal)}
                    y1={svgHeight - padding.bottom}
                    x2={scaleX(xVal)}
                    y2={padding.top}
                    stroke="#1E2633"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={scaleX(xVal)}
                    y={svgHeight - padding.bottom + 18}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-[#94A3B8]"
                  >
                    {(xVal * 100).toFixed(0)}%
                  </text>
                </g>
              ))}

              {/* X Axis Label */}
              <text
                x={svgWidth / 2}
                y={svgHeight - 15}
                textAnchor="middle"
                className="text-xs font-mono fill-[#94A3B8]"
              >
                X-AXIS: AI Task Exposure Index (0.00 to 1.00)
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
                    stroke={isSelected ? '#22D3EE' : isHovered ? '#FFFFFF' : '#0C1016'}
                    strokeWidth={isSelected ? 2.5 : 1}
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredOcc(occ)}
                    onMouseLeave={() => setHoveredOcc(null)}
                    onClick={() => onSelectOccupation(occ)}
                  />
                );
              })}

              {/* Selected / Hovered Callout Line */}
              {(hoveredOcc || activeOccupation) && (
                <g pointerEvents="none">
                  {(() => {
                    const target = hoveredOcc || activeOccupation;
                    const cx = scaleX(target.ai_exposure_llm_human);
                    const cy = scaleY(target.projected_growth_pct_2024_2034);
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={scaleRadius(target.employment_2024) + 6}
                        fill="none"
                        stroke="#22D3EE"
                        strokeWidth={1.5}
                        strokeDasharray="2 2"
                      />
                    );
                  })()}
                </g>
              )}
            </svg>
          </div>

          {/* Active / Hovered Occupation Inspection Strip */}
          <div className="mt-4 p-4 bg-[#0C1016] rounded-xl border border-[#222B38] flex flex-wrap items-center justify-between gap-4">
            {(() => {
              const occ = hoveredOcc || activeOccupation;
              return (
                <>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
                        {occ.job_category}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161C25] text-[#22D3EE] border border-[#222B38]">
                        SOC {occ.soc_code}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#EEF2F6]">
                      {occ.occupation_title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                    <div>
                      <span className="text-[#94A3B8] block text-[10px]">AI Exposure</span>
                      <span className="font-bold text-[#22D3EE]">
                        {(occ.ai_exposure_llm_human * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block text-[10px]">10-Yr Growth</span>
                      <span
                        className={`font-bold ${
                          occ.projected_growth_pct_2024_2034 >= 3.1
                            ? 'text-[#10B981]'
                            : occ.projected_growth_pct_2024_2034 >= 0
                            ? 'text-[#EEF2F6]'
                            : 'text-[#F43F5E]'
                        }`}
                      >
                        {occ.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                        {occ.projected_growth_pct_2024_2034}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block text-[10px]">Median Wage</span>
                      <span className="font-bold text-[#EEF2F6]">
                        ${occ.median_annual_wage_usd.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block text-[10px]">2024 Employment</span>
                      <span className="font-bold text-[#EEF2F6]">
                        {occ.employment_2024.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectOccupation(occ)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#22D3EE] text-[#0C1016] font-bold text-xs hover:bg-[#38BDF8] transition-colors cursor-pointer"
                    >
                      Track this job
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Footnote & Evidence Peel */}
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span>Primary dataset sources: BLS 2024–2034 projections + Eloundou et al. (OpenAI / UPenn).</span>
            <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="ILO · Task Exposure" />
          </div>
          <span className="font-mono text-[11px] text-[#94A3B8]">
            Click any dot to make it the active tracked profession
          </span>
        </footer>
      </div>
    </article>
  );
};
