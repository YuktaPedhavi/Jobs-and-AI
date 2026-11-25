import React, { useRef, useEffect, useState, useMemo } from 'react';
import { occupations271, Occupation271 } from '../data/occupations271';
import { Sparkles, Layers, BarChart2, Compass } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type ConstellationViewMode = 'constellation' | 'categories' | 'scatterplot' | 'skills';

interface OccupationConstellationProps {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  initialMode?: ConstellationViewMode;
  interactiveControls?: boolean;
  className?: string;
  height?: number;
}

interface ParticleNode {
  occ: Occupation271;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  alpha: number;
}

export const OccupationConstellation: React.FC<OccupationConstellationProps> = ({
  activeOccupation,
  onSelectOccupation,
  initialMode = 'constellation',
  interactiveControls = true,
  className = '',
  height = 420
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<ConstellationViewMode>(initialMode);
  const [hoveredNode, setHoveredNode] = useState<{ occ: Occupation271; x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: height });

  // Unique categories & cognitive families for centroids
  const categoriesList = useMemo(() => {
    const map = new Map<string, number>();
    occupations271.forEach((o) => map.set(o.job_category, (map.get(o.job_category) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const cognitiveFamilies = useMemo(() => {
    const set = new Set<string>();
    occupations271.forEach((o) => set.add(o.top_cognitive_family || 'Other'));
    return Array.from(set).sort();
  }, []);

  // Update canvas size on container resize
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const w = Math.max(320, Math.floor(entry.contentRect.width));
        setDimensions({ width: w, height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [height]);

  // Determine color by AI exposure & growth
  const getNodeColor = (occ: Occupation271, isSelected: boolean) => {
    if (isSelected) return '#22D3EE'; // Active cyan
    if (occ.ai_exposure_level === 'High') {
      return occ.projected_growth_pct_2024_2034 >= 0 ? '#06B6D4' : '#F43F5E';
    }
    if (occ.ai_exposure_level === 'Medium') {
      return '#F59E0B';
    }
    return '#10B981'; // Green for low exposure / resilient
  };

  // Pre-calculate deterministic positions for each view mode
  const nodesRef = useRef<ParticleNode[]>([]);

  useEffect(() => {
    const { width, height: h } = dimensions;
    const padding = { top: 40, right: 40, bottom: 50, left: 55 };
    const innerW = width - padding.left - padding.right;
    const innerH = h - padding.top - padding.bottom;

    // Centroids for Categories (radial layout of 12 main clusters)
    const categoryCentroids = new Map<string, { cx: number; cy: number }>();
    const totalCats = categoriesList.length;
    categoriesList.forEach(([cat], idx) => {
      const angle = (idx / totalCats) * Math.PI * 2 - Math.PI / 2;
      const rx = innerW * 0.38;
      const ry = innerH * 0.38;
      categoryCentroids.set(cat, {
        cx: width / 2 + Math.cos(angle) * rx,
        cy: h / 2 + Math.sin(angle) * ry
      });
    });

    // Centroids for Cognitive Families
    const skillCentroids = new Map<string, { cx: number; cy: number }>();
    const totalSkills = cognitiveFamilies.length;
    cognitiveFamilies.forEach((skill, idx) => {
      const angle = (idx / totalSkills) * Math.PI * 2 - Math.PI / 2;
      const rx = innerW * 0.34;
      const ry = innerH * 0.34;
      skillCentroids.set(skill, {
        cx: width / 2 + Math.cos(angle) * rx,
        cy: h / 2 + Math.sin(angle) * ry
      });
    });

    // Scatterplot scale
    const minExp = 0.05;
    const maxExp = 0.88;
    const minGrowth = -15;
    const maxGrowth = 35;

    // Initialize or update nodes targets
    if (nodesRef.current.length !== occupations271.length) {
      nodesRef.current = occupations271.map((occ, idx) => {
        // Initial random constellation
        const angle = (idx / occupations271.length) * Math.PI * 2 + (idx % 7) * 0.15;
        const dist = 30 + Math.sqrt(idx / occupations271.length) * Math.min(innerW, innerH) * 0.42;
        const initialX = width / 2 + Math.cos(angle) * dist;
        const initialY = h / 2 + Math.sin(angle) * dist * 0.75;
        const r = Math.max(2.5, Math.min(6.5, Math.sqrt(occ.employment_2024 / 2800000) * 5 + 2));

        return {
          occ,
          x: initialX,
          y: initialY,
          targetX: initialX,
          targetY: initialY,
          radius: r,
          color: getNodeColor(occ, occ.soc_code === activeOccupation.soc_code),
          alpha: 0.8
        };
      });
    }

    // Set targets according to viewMode
    nodesRef.current.forEach((node, idx) => {
      const occ = node.occ;
      const isSelected = occ.soc_code === activeOccupation.soc_code;
      node.color = getNodeColor(occ, isSelected);

      if (viewMode === 'constellation') {
        const phi = (idx / occupations271.length) * Math.PI * 2 * 3.4;
        const dist = 25 + Math.sqrt((idx + 1) / occupations271.length) * Math.min(innerW, innerH) * 0.44;
        node.targetX = width / 2 + Math.cos(phi) * dist;
        node.targetY = h / 2 + Math.sin(phi) * dist * 0.78;
      } else if (viewMode === 'categories') {
        const centroid = categoryCentroids.get(occ.job_category) || { cx: width / 2, cy: h / 2 };
        // Small scatter within category cluster
        const offsetAngle = (idx * 137.5 * Math.PI) / 180;
        const offsetDist = ((idx % 9) + 2) * 5;
        node.targetX = centroid.cx + Math.cos(offsetAngle) * offsetDist;
        node.targetY = centroid.cy + Math.sin(offsetAngle) * offsetDist;
      } else if (viewMode === 'scatterplot') {
        // X = AI exposure, Y = projected growth
        const expClamped = Math.max(minExp, Math.min(maxExp, occ.ai_exposure_llm_human));
        const growthClamped = Math.max(minGrowth, Math.min(maxGrowth, occ.projected_growth_pct_2024_2034));
        const normX = (expClamped - minExp) / (maxExp - minExp);
        const normY = (growthClamped - minGrowth) / (maxGrowth - minGrowth);
        node.targetX = padding.left + normX * innerW;
        node.targetY = padding.top + innerH - normY * innerH;
      } else if (viewMode === 'skills') {
        const centroid = skillCentroids.get(occ.top_cognitive_family || 'Other') || { cx: width / 2, cy: h / 2 };
        const offsetAngle = (idx * 79.2 * Math.PI) / 180;
        const offsetDist = ((idx % 11) + 2) * 6;
        node.targetX = centroid.cx + Math.cos(offsetAngle) * offsetDist;
        node.targetY = centroid.cy + Math.sin(offsetAngle) * offsetDist;
      }
    });
  }, [dimensions, viewMode, activeOccupation, categoriesList, cognitiveFamilies]);

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const easing = prefersReducedMotion ? 1 : 0.12;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Render subtle background grid for scatterplot
      if (viewMode === 'scatterplot') {
        const padding = { top: 40, right: 40, bottom: 50, left: 55 };
        const innerW = dimensions.width - padding.left - padding.right;
        const innerH = dimensions.height - padding.top - padding.bottom;

        // Zero line for growth
        const minGrowth = -15;
        const maxGrowth = 35;
        const zeroY = padding.top + innerH - ((0 - minGrowth) / (maxGrowth - minGrowth)) * innerH;

        ctx.strokeStyle = isDark ? '#163560' : '#cbd4df';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Horizontal guides (-10%, 0%, +10%, +20%, +30%)
        [-10, 0, 10, 20, 30].forEach((g) => {
          const y = padding.top + innerH - ((g - minGrowth) / (maxGrowth - minGrowth)) * innerH;
          ctx.beginPath();
          ctx.moveTo(padding.left, y);
          ctx.lineTo(dimensions.width - padding.right, y);
          ctx.stroke();

          ctx.fillStyle = isDark ? '#5f7d9f' : '#64748b';
          ctx.font = '10px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`${g > 0 ? '+' : ''}${g}%`, padding.left - 8, y + 3);
        });

        // Zero axis emphasis
        ctx.strokeStyle = isDark ? '#1e5bb4' : '#1e5bb4';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(padding.left, zeroY);
        ctx.lineTo(dimensions.width - padding.right, zeroY);
        ctx.stroke();

        // X Axis ticks
        [0.2, 0.4, 0.6, 0.8].forEach((exp) => {
          const x = padding.left + ((exp - 0.05) / (0.88 - 0.05)) * innerW;
          ctx.strokeStyle = isDark ? '#163560' : '#cbd4df';
          ctx.beginPath();
          ctx.moveTo(x, padding.top);
          ctx.lineTo(x, dimensions.height - padding.bottom);
          ctx.stroke();

          ctx.fillStyle = isDark ? '#5f7d9f' : '#64748b';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${(exp * 100).toFixed(0)}%`, x, dimensions.height - padding.bottom + 16);
        });

        // Axis labels
        ctx.fillStyle = isDark ? '#9bb2cf' : '#475e77';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('How much of this job’s work AI could affect (Task Exposure Index)', dimensions.width / 2, dimensions.height - 12);

        ctx.save();
        ctx.translate(14, dimensions.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Expected 10-Yr Job Growth (U.S. 2024–2034)', 0, 0);
        ctx.restore();
      }

      // Draw particle nodes
      nodesRef.current.forEach((node) => {
        // Interpolate position
        node.x += (node.targetX - node.x) * easing;
        node.y += (node.targetY - node.y) * easing;

        const isSelected = node.occ.soc_code === activeOccupation.soc_code;
        const isHovered = hoveredNode?.occ.soc_code === node.occ.soc_code;

        ctx.beginPath();
        const r = isSelected ? node.radius + 4 : isHovered ? node.radius + 3 : node.radius;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);

        if (isSelected) {
          ctx.fillStyle = isDark ? '#d7e63b' : '#1e5bb4';
          ctx.shadowColor = isDark ? '#d7e63b' : '#1e5bb4';
          ctx.shadowBlur = 10;
        } else if (isHovered) {
          ctx.fillStyle = isDark ? '#ffffff' : '#061329';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = node.color;
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Stroke ring
        if (isSelected || isHovered) {
          ctx.strokeStyle = isDark ? '#ffffff' : '#061329';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dimensions, viewMode, activeOccupation, hoveredNode, isDark]);

  // Handle canvas mouse move for interactive inspection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Find nearest node within hit radius
    let nearest: ParticleNode | null = null;
    let minDist = 18;

    nodesRef.current.forEach((node) => {
      const dx = node.x - mouseX;
      const dy = node.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearest = node;
      }
    });

    if (nearest) {
      setHoveredNode({
        occ: (nearest as ParticleNode).occ,
        x: mouseX,
        y: mouseY
      });
    } else {
      setHoveredNode(null);
    }
  };

  const handleClick = () => {
    if (hoveredNode) {
      onSelectOccupation(hoveredNode.occ);
    }
  };

  const palette = {
    canvasBg: isDark ? '#071731' : '#f1efe6',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    amber: isDark ? '#f59e0b' : '#b45309',
    emerald: isDark ? '#10b981' : '#059669'
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* View Mode Switcher */}
      {interactiveControls && (
        <div
          className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b"
          style={{ borderColor: palette.border }}
        >
          <span
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: palette.textMuted }}
          >
            271 U.S. Occupations · View Mode
          </span>

          <div
            role="tablist"
            aria-label="Living Atlas view modes"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            {[
              { id: 'constellation' as const, label: 'Constellation', icon: Compass },
              { id: 'categories' as const, label: '22 Categories', icon: Layers },
              { id: 'scatterplot' as const, label: 'AI Exposure × Growth', icon: BarChart2 },
              { id: 'skills' as const, label: 'Cognitive Families', icon: Sparkles }
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
                  className="px-3 py-1.5 min-h-[36px] text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: isSelected ? palette.cyan : 'transparent',
                    color: isSelected
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMuted,
                    fontWeight: isSelected ? 700 : 500
                  }}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: palette.canvasBg,
          borderColor: palette.border
        }}
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={handleClick}
          role="img"
          aria-label={`Interactive Living Atlas of 271 occupations in ${viewMode} view. Selected occupation: ${activeOccupation.occupation_title}.`}
          className="cursor-crosshair w-full block"
        />

        {/* Hover Tooltip */}
        {hoveredNode && (
          <div
            className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full mb-3 px-3.5 py-2.5 rounded-xl border shadow-2xl backdrop-blur-md text-xs space-y-1 w-64"
            style={{
              left: Math.max(130, Math.min(dimensions.width - 130, hoveredNode.x)),
              top: Math.max(80, hoveredNode.y - 12),
              backgroundColor: palette.surfaceBg,
              borderColor: palette.cyan,
              color: palette.textMain
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono" style={{ color: palette.textMuted }}>
              <span className="truncate pr-2">{hoveredNode.occ.job_category}</span>
              <span style={{ color: palette.cyan }}>SOC {hoveredNode.occ.soc_code}</span>
            </div>
            <div className="font-sans font-bold text-sm tracking-tight" style={{ color: palette.textMain }}>
              {hoveredNode.occ.occupation_title}
            </div>
            <div
              className="grid grid-cols-2 gap-2 pt-1 border-t font-mono text-[11px]"
              style={{ borderColor: palette.border }}
            >
              <div>
                <span className="block text-[9px]" style={{ color: palette.textMuted }}>
                  AI Task Overlap:
                </span>
                <span className="font-bold tabular-nums" style={{ color: palette.cyan }}>
                  {(hoveredNode.occ.ai_exposure_llm_human * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="block text-[9px]" style={{ color: palette.textMuted }}>
                  2024–34 Growth:
                </span>
                <span
                  className="font-bold tabular-nums"
                  style={{
                    color:
                      hoveredNode.occ.projected_growth_pct_2024_2034 >= 0
                        ? palette.emerald
                        : '#f43f5e'
                  }}
                >
                  {hoveredNode.occ.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                  {hoveredNode.occ.projected_growth_pct_2024_2034}%
                </span>
              </div>
            </div>
            <div className="text-[10px] pt-1" style={{ color: palette.textMuted }}>
              Click particle to track across the story
            </div>
          </div>
        )}

        {/* Legend / Key indicator at bottom */}
        <div
          className="px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.surfaceBg,
            color: palette.textMuted
          }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" aria-hidden="true" />
              High Exposure (72)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" aria-hidden="true" />
              Medium (94)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" aria-hidden="true" />
              Low Exposure (105)
            </span>
          </div>
          <span className="text-[11px]">
            Selected: <strong style={{ color: palette.textMain }}>{activeOccupation.occupation_title}</strong> ({(activeOccupation.ai_exposure_llm_human * 100).toFixed(0)}%)
          </span>
        </div>
      </div>
    </div>
  );
};
