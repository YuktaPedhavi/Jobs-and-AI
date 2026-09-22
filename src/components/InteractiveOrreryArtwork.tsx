import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight, Activity, Crosshair, Play, Pause, RotateCw } from 'lucide-react';
import { Occupation271, occupations271 } from '../data/occupations271';

interface InteractiveOrreryArtworkProps {
  mousePos: { x: number; y: number };
  onSelectOccupation?: (occ: Occupation271) => void;
  className?: string;
}

interface KineticNode {
  id: string;
  socCode: string;
  title: string;
  category: string;
  exposure: number;
  growth: number;
  wage: number;
  coordX: number; // 0..1000 coordinate space
  coordY: number;
  type: 'pivot' | 'satellite' | 'tandem' | 'terminal';
  annotation: string;
}

// 5 Key benchmark research nodes anchored in the mechanism
const BLUEPRINT_NODES: KineticNode[] = [
  {
    id: 'node-software',
    socCode: '15-1252',
    title: 'Software Developer',
    category: 'Computer & Logic',
    exposure: 0.706,
    growth: 17.0,
    wage: 132270,
    coordX: 120,
    coordY: 290,
    type: 'terminal',
    annotation: 'AXIS α · 71% exposure vs +17% growth'
  },
  {
    id: 'node-designer',
    socCode: '27-1024',
    title: 'Graphic Designer',
    category: 'Arts & Media',
    exposure: 0.411,
    growth: 2.0,
    wage: 61300,
    coordX: 370,
    coordY: 400,
    type: 'pivot',
    annotation: 'LINK 02 · 41% exposure · Creative taste'
  },
  {
    id: 'node-advisor',
    socCode: '13-2052',
    title: 'Financial Advisor',
    category: 'Financial Strategy',
    exposure: 0.71,
    growth: 10.0,
    wage: 102140,
    coordX: 625,
    coordY: 515,
    type: 'pivot',
    annotation: 'CORE FULCRUM · High trust & liability'
  },
  {
    id: 'node-teacher',
    socCode: '25-2021',
    title: 'Elementary Teacher',
    category: 'Education & Care',
    exposure: 0.182,
    growth: 1.0,
    wage: 63680,
    coordX: 690,
    coordY: 390,
    type: 'satellite',
    annotation: 'SATELLITE · Low exposure (18%) · Empathy core'
  },
  {
    id: 'node-radiologist',
    socCode: '29-1224',
    title: 'Radiologist',
    category: 'Healthcare & Diagnosis',
    exposure: 0.758,
    growth: 3.2,
    wage: 353880,
    coordX: 810,
    coordY: 595,
    type: 'tandem',
    annotation: 'TANDEM CRANK · 76% exposure · Fiduciary sign-off'
  }
];

export const InteractiveOrreryArtwork: React.FC<InteractiveOrreryArtworkProps> = ({
  mousePos,
  onSelectOccupation,
  className = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Kinematic animation state
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<KineticNode | null>(null);
  const [activePulse, setActivePulse] = useState<{ x: number; y: number; id: number } | null>(null);

  // SVG ref for measuring local coordinates
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Center coordinates of the master protractor dial
  const CX = 520;
  const CY = 470;

  // Animation loop: subtle perpetual rotation of dials and gear trains
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPlaying) {
        setRotationAngle((prev) => (prev + dt * 10) % 360);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Click pulse trigger
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;

    setActivePulse({ x, y, id: Date.now() });
    setTimeout(() => {
      setActivePulse(null);
    }, 1200);
  };

  const handleNodeClick = (node: KineticNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePulse({ x: node.coordX, y: node.coordY, id: Date.now() });
    if (!onSelectOccupation) return;
    const occ = occupations271.find((o) => o.soc_code === node.socCode);
    if (occ) {
      onSelectOccupation(occ);
    }
  };

  // Color variables according to theme
  const colors = useMemo(() => {
    if (isDark) {
      return {
        linePrimary: '#22d3ee', // Technical cyan
        lineSecondary: '#1e5bb4', // Blueprint deep cobalt
        lineFaint: 'rgba(34, 211, 238, 0.22)',
        lineUltraFaint: 'rgba(30, 91, 180, 0.35)',
        dotSolid: '#22d3ee',
        dotFaint: 'rgba(34, 211, 238, 0.45)',
        accentLime: '#d7e63b',
        accentAmber: '#f59e0b',
        dialFill: 'rgba(6, 19, 41, 0.4)',
        glowFilter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))',
        hudBg: 'bg-[#091629]/95',
        hudBorder: 'border-[#163560]',
        hudText: 'text-[#f7faeb]',
        hudSub: 'text-[#94a3b8]'
      };
    } else {
      return {
        linePrimary: '#0f3b7d', // Rich technical navy
        lineSecondary: '#1e5bb4', // Blueprint cobalt
        lineFaint: 'rgba(15, 59, 125, 0.35)',
        lineUltraFaint: 'rgba(30, 91, 180, 0.18)',
        dotSolid: '#0f3b7d',
        dotFaint: 'rgba(30, 91, 180, 0.5)',
        accentLime: '#1e5bb4',
        accentAmber: '#d97706',
        dialFill: 'rgba(255, 255, 255, 0.25)',
        glowFilter: 'drop-shadow(0 0 2px rgba(30, 91, 180, 0.35))',
        hudBg: 'bg-[#ffffff]/98',
        hudBorder: 'border-[#cbd5e1]',
        hudText: 'text-[#061329]',
        hudSub: 'text-[#475569]'
      };
    }
  }, [isDark]);

  // Generate 120 Vernier Protractor Dial ticks
  const dialTicks = useMemo(() => {
    const ticks = [];
    const count = 120;
    const rOuter = 152;
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const isMajor = i % 10 === 0;
      const isSemi = i % 5 === 0;
      const tickLen = isMajor ? 14 : isSemi ? 9 : 5;
      const rInner = rOuter - tickLen;

      const x1 = CX + rOuter * Math.cos(rad);
      const y1 = CY + rOuter * Math.sin(rad);
      const x2 = CX + rInner * Math.cos(rad);
      const y2 = CY + rInner * Math.sin(rad);

      ticks.push({ x1, y1, x2, y2, isMajor, isSemi, angle });
    }
    return ticks;
  }, [CX, CY]);

  // Sweeping curved arc of dots (Upper-Left Constellation, matching reference)
  const dotArc = useMemo(() => {
    const dots = [];
    const count = 11;
    const rArc = 245;
    const startAngle = 138;
    const endAngle = 196;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = startAngle + t * (endAngle - startAngle);
      const rad = (angle * Math.PI) / 180;
      const x = CX + rArc * Math.cos(rad);
      const y = CY + rArc * Math.sin(rad);
      // Graduated dot size from 3.5px to 7px exactly as in reference image
      const radius = 3.2 + t * 3.6;
      dots.push({ x, y, radius, index: i });
    }
    return dots;
  }, [CX, CY]);

  // Subtle mouse interactive offset for parallax and linkage deflection
  const parallaxX = mousePos.x * 0.22;
  const parallaxY = mousePos.y * 0.22;
  const linkageFlex = (mousePos.x * 0.15) - (mousePos.y * 0.1);

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
      aria-label="Interactive Kinematic Blueprint Observatory"
    >
      {/* ========================================================================= */}
      {/* 1. MASKED FEATHERED CONTAINER (Merged perfectly with background)           */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700"
        style={{
          // Seamless radial mask: completely transparent on left edge (text area) and feathered borders
          maskImage:
            'radial-gradient(ellipse 75% 75% at 54% 48%, black 15%, rgba(0,0,0,0.85) 48%, rgba(0,0,0,0.25) 72%, transparent 88%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 54% 48%, black 15%, rgba(0,0,0,0.85) 48%, rgba(0,0,0,0.25) 72%, transparent 88%)',
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          className="w-full h-full max-w-[1050px] max-h-[1050px] pointer-events-auto cursor-crosshair overflow-visible"
          onClick={handleCanvasClick}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Fine Blueprint grid pattern */}
            <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={colors.lineUltraFaint}
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            </pattern>

            {/* Glowing filter for dark mode nodes */}
            <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subdued blueprint coordinate grid background */}
          <rect
            x="50"
            y="50"
            width="900"
            height="900"
            fill="url(#blueprint-grid)"
            opacity={isDark ? 0.35 : 0.45}
          />

          {/* ========================================================================= */}
          {/* 2. DYNAMIC KINETIC LINKAGE & PROTRACTOR SCHEMATIC (Reference Image Match)  */}
          {/* ========================================================================= */}

          {/* A. UPPER-RIGHT TECHNICAL ANNOTATION BLOCK ("future engineering" equivalent) */}
          <g opacity={isDark ? 0.85 : 0.75} className="font-mono text-xs select-none">
            {/* Digital Graduation Comb Bar */}
            <g stroke={colors.lineSecondary} strokeWidth="1.2">
              <line x1="770" y1="80" x2="850" y2="80" />
              {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80].map((dx, i) => (
                <line
                  key={i}
                  x1={770 + dx}
                  y1={80}
                  x2={770 + dx}
                  y2={80 - (i % 4 === 0 ? 9 : 4)}
                />
              ))}
            </g>

            {/* Target Reticle in Corner */}
            <circle cx="900" cy="80" r="18" stroke={colors.lineSecondary} strokeWidth="1" />
            <circle cx="900" cy="80" r="8" stroke={colors.linePrimary} strokeWidth="0.75" />
            <line x1="875" y1="80" x2="925" y2="80" stroke={colors.lineSecondary} strokeWidth="0.75" />
            <line x1="900" y1="55" x2="900" y2="105" stroke={colors.lineSecondary} strokeWidth="0.75" />
            <line x1="887" y1="67" x2="913" y2="93" stroke={colors.lineSecondary} strokeWidth="0.5" strokeDasharray="2 2" />

            {/* Technical Title */}
            <text
              x="770"
              y="115"
              fill={colors.linePrimary}
              className="text-base font-display font-extrabold tracking-tight"
            >
              FUTURE
            </text>
            <text
              x="770"
              y="138"
              fill={colors.lineSecondary}
              className="text-lg font-display font-extrabold tracking-tight uppercase"
            >
              ENGINEERING
            </text>
            <text x="770" y="156" fill={colors.lineFaint} className="text-[10px] tracking-wider">
              SYSTEM α · KINEMATICS ATLAS
            </text>
          </g>

          {/* B. UPPER CALIBRATION STRUTS & T-STOPS (Direct reference elements) */}
          <g id="calibration-struts">
            {/* Strut 1 (Upper Right, ~72° angle) with horizontal comb marks & T-bar */}
            <g>
              <line
                x1={CX + 45}
                y1={CY - 130}
                x2="635"
                y2="75"
                stroke={colors.lineSecondary}
                strokeWidth="1.2"
              />
              {/* Horizontal Comb / Calibration Marks */}
              {[0, 6, 12, 18].map((offset, i) => (
                <line
                  key={i}
                  x1={600}
                  y1={135 + offset}
                  x2={635}
                  y2={135 + offset}
                  stroke={colors.lineSecondary}
                  strokeWidth="1"
                />
              ))}
              {/* Perpendicular T-Bar End Stop */}
              <line x1="615" y1="75" x2="655" y2="75" stroke={colors.linePrimary} strokeWidth="1.5" />
              <circle cx="635" cy="75" r="4" fill={colors.dotSolid} />
              <circle cx="635" cy="35" r="3.5" fill={colors.dotSolid} />
              <line x1="635" y1="75" x2="635" y2="35" stroke={colors.lineSecondary} strokeWidth="1" />
            </g>

            {/* Strut 2 (Upper Left, ~125° angle) with T-crosshead and offset dot */}
            <g>
              <line
                x1={CX - 80}
                y1={CY - 110}
                x2="345"
                y2="135"
                stroke={colors.lineSecondary}
                strokeWidth="1.2"
              />
              <line x1="330" y1="145" x2="360" y2="125" stroke={colors.linePrimary} strokeWidth="1.5" />
              <circle cx="345" cy="135" r="4" fill={colors.dotSolid} />
              <circle cx="375" cy="105" r="3.5" fill={colors.dotSolid} />
              <line x1="345" y1="135" x2="375" y2="105" stroke={colors.lineFaint} strokeWidth="0.75" strokeDasharray="3 3" />
            </g>
          </g>

          {/* C. CURVED ARC OF DOTS (Upper Left sweeping radial constellation) */}
          <g id="dot-arc">
            {/* Faint guide trajectory arc */}
            <path
              d={`M ${dotArc[0].x} ${dotArc[0].y} A 245 245 0 0 1 ${dotArc[dotArc.length - 1].x} ${dotArc[dotArc.length - 1].y}`}
              fill="none"
              stroke={colors.lineFaint}
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />
            {/* The 11 graduated solid dots */}
            {dotArc.map((dot) => (
              <circle
                key={dot.index}
                cx={dot.x}
                cy={dot.y}
                r={dot.radius}
                fill={colors.dotSolid}
                className="transition-transform hover:scale-150 duration-150"
              />
            ))}
            {/* Lower extension lead line with terminal bead */}
            <line
              x1={dotArc[dotArc.length - 1].x}
              y1={dotArc[dotArc.length - 1].y}
              x2="260"
              y2="680"
              stroke={colors.lineSecondary}
              strokeWidth="1"
            />
            <circle cx="260" cy="680" r="4.5" fill={colors.dotSolid} />
            <circle cx="260" cy="680" r="9" stroke={colors.lineSecondary} strokeWidth="0.75" />
            {/* Small vertical tick comb */}
            <line x1="355" y1="585" x2="385" y2="630" stroke={colors.lineFaint} strokeWidth="1" />
            {[0, 5, 10, 15].map((o) => (
              <line
                key={o}
                x1={345 + o * 1.5}
                y1={605 - o * 3}
                x2={365 + o * 1.5}
                y2={595 - o * 3}
                stroke={colors.lineSecondary}
                strokeWidth="0.75"
              />
            ))}
          </g>

          {/* D. MASTER PROTRACTOR DIAL (Center Mechanism with live rotation) */}
          <g id="master-protractor-dial">
            {/* Outer dashed pitch circle */}
            <circle
              cx={CX}
              cy={CY}
              r="176"
              stroke={colors.lineFaint}
              strokeWidth="1"
              strokeDasharray="3 6"
            />

            {/* Rotating dial group */}
            <g
              transform={`rotate(${rotationAngle}, ${CX}, ${CY})`}
              className="transition-transform duration-75 ease-linear"
            >
              {/* Outer dial framing circles */}
              <circle
                cx={CX}
                cy={CY}
                r="152"
                stroke={colors.linePrimary}
                strokeWidth="1.2"
                fill={colors.dialFill}
              />
              <circle
                cx={CX}
                cy={CY}
                r="134"
                stroke={colors.lineSecondary}
                strokeWidth="1"
              />

              {/* Vernier Protractor Radial Tick Marks */}
              {dialTicks.map((t, idx) => (
                <line
                  key={idx}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.isMajor ? colors.linePrimary : colors.lineSecondary}
                  strokeWidth={t.isMajor ? 1.4 : t.isSemi ? 1.0 : 0.65}
                />
              ))}

              {/* Inner concentric ring with fine cross-axis */}
              <circle
                cx={CX}
                cy={CY}
                r="112"
                stroke={colors.lineSecondary}
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <line
                x1={CX - 112}
                y1={CY}
                x2={CX + 112}
                y2={CY}
                stroke={colors.lineFaint}
                strokeWidth="0.75"
              />
              <line
                x1={CX}
                y1={CY - 112}
                x2={CX}
                y2={CY + 112}
                stroke={colors.lineFaint}
                strokeWidth="0.75"
              />
            </g>

            {/* Stationary Inner Eccentric Gear Rings (Center offset hub) */}
            <g id="inner-eccentric-hub">
              {/* Offset gear circle */}
              <circle
                cx={CX + 12}
                cy={CY + 16}
                r="38"
                stroke={colors.linePrimary}
                strokeWidth="1.8"
                fill={colors.dialFill}
              />
              <circle
                cx={CX + 12}
                cy={CY + 16}
                r="22"
                stroke={colors.lineSecondary}
                strokeWidth="1.2"
              />
              <circle cx={CX + 12} cy={CY + 16} r="6" fill={colors.dotSolid} />

              {/* Pivot axis crosshairs */}
              <line
                x1={CX - 40}
                y1={CY + 16}
                x2={CX + 60}
                y2={CY + 16}
                stroke={colors.lineFaint}
                strokeWidth="0.75"
              />
              <line
                x1={CX + 12}
                y1={CY - 30}
                x2={CX + 12}
                y2={CY + 70}
                stroke={colors.lineFaint}
                strokeWidth="0.75"
              />

              {/* Small center satellite dot */}
              <circle cx={CX - 8} cy={CY - 16} r="4" fill={colors.dotSolid} />
              <line
                x1={CX - 8}
                y1={CY - 16}
                x2={CX + 12}
                y2={CY + 16}
                stroke={colors.lineSecondary}
                strokeWidth="1.2"
              />
            </g>
          </g>

          {/* E. MAIN DIAGONAL LINKAGE SHAFT (Kinematic Backbone) */}
          <g id="main-diagonal-linkage">
            {/* The main angled spine line spanning from top-left to bottom-right */}
            <line
              x1="120"
              y1={290 + linkageFlex}
              x2="880"
              y2={630 - linkageFlex * 0.8}
              stroke={colors.linePrimary}
              strokeWidth="2.2"
              filter={isDark ? 'url(#neon-glow)' : undefined}
            />

            {/* Parallel precision construction offset line */}
            <line
              x1="90"
              y1={275 + linkageFlex}
              x2="905"
              y2={645 - linkageFlex * 0.8}
              stroke={colors.lineUltraFaint}
              strokeWidth="0.75"
              strokeDasharray="4 8"
            />

            {/* Barbell / Linkage Plate connecting nodes 810 and 880 */}
            <line
              x1="810"
              y1={595 - linkageFlex * 0.7}
              x2="880"
              y2={630 - linkageFlex * 0.8}
              stroke={colors.lineSecondary}
              strokeWidth="5"
              strokeLinecap="round"
              opacity={0.4}
            />

            {/* Far Left Node Assembly (120, 290) */}
            <g transform={`translate(120, ${290 + linkageFlex})`}>
              <circle cx="0" cy="0" r="22" stroke={colors.lineSecondary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="12" stroke={colors.linePrimary} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4.5" fill={colors.dotSolid} />
              {/* Tangent leader ray extending to top-left */}
              <line x1="-22" y1="-8" x2="-65" y2="-45" stroke={colors.lineSecondary} strokeWidth="1" />
              <circle cx="-65" cy="-45" r="3.5" fill={colors.dotSolid} />
              <line x1="-65" y1="-45" x2="-95" y2="-45" stroke={colors.lineFaint} strokeWidth="0.75" />
            </g>

            {/* Mid-Left Pivot Crosshair Node (245, 345) */}
            <g transform={`translate(245, ${345 + linkageFlex * 0.7})`}>
              <circle cx="0" cy="0" r="14" stroke={colors.lineSecondary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="4.5" fill={colors.dotSolid} />
              <line x1="-18" y1="0" x2="18" y2="0" stroke={colors.lineSecondary} strokeWidth="0.75" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke={colors.lineSecondary} strokeWidth="0.75" />
            </g>

            {/* Pre-Dial Junction (370, 400) */}
            <g transform={`translate(370, ${400 + linkageFlex * 0.4})`}>
              <circle cx="0" cy="0" r="14" stroke={colors.linePrimary} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill={colors.dotSolid} />
              <line x1="0" y1="0" x2="-45" y2="-75" stroke={colors.lineSecondary} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="-45" cy="-75" r="3" fill={colors.dotSolid} />
            </g>

            {/* Post-Dial Joint (625, 515) */}
            <g transform={`translate(625, ${515 - linkageFlex * 0.3})`}>
              <circle cx="0" cy="0" r="16" stroke={colors.linePrimary} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill={colors.dotSolid} />
              {/* Connecting arm to bottom right wheel */}
              <line x1="0" y1="0" x2="-10" y2="135" stroke={colors.lineSecondary} strokeWidth="1.2" />
            </g>

            {/* Tandem Nodes at Lower Right (810, 595) & (880, 630) */}
            <g transform={`translate(810, ${595 - linkageFlex * 0.7})`}>
              <circle cx="0" cy="0" r="16" stroke={colors.lineSecondary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="5" fill={colors.dotSolid} />
            </g>
            <g transform={`translate(880, ${630 - linkageFlex * 0.8})`}>
              <circle cx="0" cy="0" r="20" stroke={colors.linePrimary} strokeWidth="1.8" />
              <circle cx="0" cy="0" r="10" stroke={colors.lineSecondary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="4.5" fill={colors.dotSolid} />
              <line x1="-15" y1="0" x2="15" y2="0" stroke={colors.lineSecondary} strokeWidth="0.75" />
              <line x1="0" y1="-15" x2="0" y2="15" stroke={colors.lineSecondary} strokeWidth="0.75" />
              {/* Extension lever arm */}
              <line x1="15" y1="8" x2="65" y2="35" stroke={colors.lineSecondary} strokeWidth="1" />
              <circle cx="65" cy="35" r="4" fill={colors.dotSolid} />
            </g>
          </g>

          {/* F. RIGHT-SIDE SATELLITE GEARS & CRANK WHEELS */}
          <g id="satellite-mechanisms">
            {/* 1. Upper Satellite Spoke Wheel (690, 390) */}
            <g transform={`translate(690, 390) rotate(${-rotationAngle * 1.5})`}>
              <circle cx="0" cy="0" r="38" stroke={colors.lineSecondary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="8" stroke={colors.linePrimary} strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill={colors.dotSolid} />
              {/* 4 Radial Spokes with perimeter satellite beads */}
              {[0, 90, 180, 270].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const bx = 38 * Math.cos(rad);
                const by = 38 * Math.sin(rad);
                return (
                  <g key={deg}>
                    <line x1="0" y1="0" x2={bx} y2={by} stroke={colors.lineSecondary} strokeWidth="1" />
                    <circle cx={bx} cy={by} r="3.5" fill={colors.dotSolid} />
                  </g>
                );
              })}
            </g>

            {/* 2. Lower-Right Major Dial Wheel (615, 650) */}
            <g transform={`translate(615, 650) rotate(${rotationAngle * 0.8})`}>
              <circle cx="0" cy="0" r="84" stroke={colors.lineSecondary} strokeWidth="1.4" />
              <circle cx="0" cy="0" r="60" stroke={colors.lineSecondary} strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="0" cy="0" r="14" stroke={colors.linePrimary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="4.5" fill={colors.dotSolid} />
              {/* 3-point star spoke axis */}
              {[0, 120, 240].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1="0"
                    y1="0"
                    x2={84 * Math.cos(rad)}
                    y2={84 * Math.sin(rad)}
                    stroke={colors.lineSecondary}
                    strokeWidth="1"
                  />
                );
              })}
            </g>
            {/* Tangent arm from wheel 615,650 to lower left */}
            <line x1="535" y1="680" x2="485" y2="735" stroke={colors.lineSecondary} strokeWidth="1" />
            <circle cx="485" cy="735" r="3.5" fill={colors.dotSolid} />

            {/* 3. Compound Crank Wheel (745, 560) */}
            <g transform="translate(745, 560)">
              <circle cx="0" cy="0" r="56" stroke={colors.lineSecondary} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="36" stroke={colors.linePrimary} strokeWidth="1" />
              <circle cx="0" cy="0" r="16" stroke={colors.lineSecondary} strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4" fill={colors.dotSolid} />
              {/* Crosshair */}
              <line x1="-56" y1="0" x2="56" y2="0" stroke={colors.lineFaint} strokeWidth="0.75" />
              <line x1="0" y1="-56" x2="0" y2="56" stroke={colors.lineFaint} strokeWidth="0.75" />
            </g>
          </g>

          {/* G. PRECISION DATUM CROSSHAIRS & MEASUREMENT ARCS */}
          <g id="datum-crosshairs" opacity={0.65}>
            {/* Crosshair at (430, 870) */}
            <g transform="translate(430, 870)">
              <line x1="-12" y1="0" x2="12" y2="0" stroke={colors.lineSecondary} strokeWidth="1" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke={colors.lineSecondary} strokeWidth="1" />
              <line x1="-8" y1="-8" x2="8" y2="8" stroke={colors.lineFaint} strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill={colors.dotSolid} />
            </g>

            {/* Crosshair at (835, 475) */}
            <g transform="translate(835, 475)">
              <line x1="-10" y1="0" x2="10" y2="0" stroke={colors.lineSecondary} strokeWidth="1" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke={colors.lineSecondary} strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill={colors.dotSolid} />
            </g>

            {/* Crosshair at (670, 820) */}
            <g transform="translate(670, 820)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke={colors.lineSecondary} strokeWidth="1" />
              <line x1="0" y1="-8" x2="0" y2="8" stroke={colors.lineSecondary} strokeWidth="1" />
              <circle cx="12" cy="18" r="3.5" fill={colors.dotSolid} />
            </g>

            {/* Angular Arc dimension indicator (α = 26.4°) */}
            <path
              d="M 580 470 A 60 60 0 0 1 572 496"
              fill="none"
              stroke={colors.linePrimary}
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text x="592" y="492" fill={colors.linePrimary} className="text-[10px] font-mono font-bold">
              ∠α 26.4°
            </text>
          </g>

          {/* H. HARMONIC PULSE WAVE ON CLICK */}
          {activePulse && (
            <g pointerEvents="none">
              <circle
                cx={activePulse.x}
                cy={activePulse.y}
                r="10"
                fill="none"
                stroke={isDark ? colors.accentLime : colors.linePrimary}
                strokeWidth="2.5"
                className="animate-ping opacity-80"
              />
              <circle
                cx={activePulse.x}
                cy={activePulse.y}
                r="70"
                fill="none"
                stroke={colors.linePrimary}
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="animate-pulse opacity-50"
              />
            </g>
          )}

          {/* ========================================================================= */}
          {/* 3. INTERACTIVE RESEARCH DATA NODES (Hoverable & Clickable)                 */}
          {/* ========================================================================= */}
          <g id="interactive-nodes">
            {BLUEPRINT_NODES.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              const yAdjusted =
                node.coordY + (node.coordX < 500 ? linkageFlex : -linkageFlex * 0.6);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.coordX}, ${yAdjusted})`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={(e) => handleNodeClick(node, e)}
                  data-cursor-interactive="true"
                >
                  {/* Invisible generous hit target */}
                  <circle cx="0" cy="0" r="32" fill="transparent" />

                  {/* Pulsing Target Radar when Hovered */}
                  {isHovered && (
                    <g pointerEvents="none">
                      <circle
                        cx="0"
                        cy="0"
                        r="28"
                        stroke={isDark ? colors.accentLime : colors.linePrimary}
                        strokeWidth="1.5"
                        strokeDasharray="3 4"
                        className="animate-spin"
                        style={{ animationDuration: '4s' }}
                      />
                      <line x1="-34" y1="0" x2="34" y2="0" stroke={isDark ? colors.accentLime : colors.linePrimary} strokeWidth="0.75" />
                      <line x1="0" y1="-34" x2="0" y2="34" stroke={isDark ? colors.accentLime : colors.linePrimary} strokeWidth="0.75" />
                    </g>
                  )}

                  {/* Outer Node Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isHovered ? 16 : 10}
                    stroke={
                      isHovered
                        ? isDark
                          ? colors.accentLime
                          : colors.accentAmber
                        : colors.linePrimary
                    }
                    strokeWidth={isHovered ? 2.2 : 1.4}
                    fill={isHovered ? (isDark ? 'rgba(215, 230, 59, 0.15)' : 'rgba(30, 91, 180, 0.12)') : 'transparent'}
                    className="transition-all duration-200"
                  />

                  {/* Center Dot */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isHovered ? 5 : 3.5}
                    fill={
                      isHovered
                        ? isDark
                          ? colors.accentLime
                          : colors.accentAmber
                        : colors.dotSolid
                    }
                    className="transition-all duration-200"
                  />

                  {/* Node Label Annotation (Subtle technical tag) */}
                  <text
                    x="16"
                    y="-12"
                    fill={isHovered ? (isDark ? colors.accentLime : colors.linePrimary) : colors.lineSecondary}
                    className="text-[11px] font-mono font-bold tracking-tight transition-colors duration-150 select-none pointer-events-none"
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 4. HOVER TELEMETRY HUD CARD (Data-grounded research card)                  */}
      {/* ========================================================================= */}
      {hoveredNode && (
        <div
          className="absolute z-40 pointer-events-auto transition-all duration-200"
          style={{
            left: `${Math.min(Math.max((hoveredNode.coordX / 1000) * 100, 15), 75)}%`,
            top: `${Math.min(Math.max((hoveredNode.coordY / 1000) * 100, 20), 75)}%`,
            transform: 'translate(-50%, -115%)'
          }}
        >
          <div
            className={`w-72 p-4 rounded-xl border shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 ${colors.hudBg} ${colors.hudBorder} ${colors.hudText}`}
            style={{
              boxShadow: isDark
                ? '0 12px 32px -4px rgba(6, 19, 41, 0.8), 0 0 16px rgba(34, 211, 238, 0.15)'
                : '0 12px 32px -4px rgba(6, 19, 41, 0.12)'
            }}
          >
            {/* Header with SOC code and category */}
            <div className="flex items-center justify-between text-[10px] font-mono border-b pb-2 mb-2 border-inherit">
              <span
                className="font-bold uppercase tracking-wider"
                style={{ color: isDark ? colors.accentLime : colors.linePrimary }}
              >
                {hoveredNode.category}
              </span>
              <span className={colors.hudSub}>SOC {hoveredNode.socCode}</span>
            </div>

            {/* Profession Title */}
            <h4 className="text-base font-display font-extrabold tracking-tight leading-tight">
              {hoveredNode.title}
            </h4>

            {/* Technical Annotation */}
            <p className={`text-[11px] font-mono mt-1 ${colors.hudSub}`}>
              {hoveredNode.annotation}
            </p>

            {/* Empirical Metrics Grid */}
            <div className="pt-2 mt-2 border-t border-inherit grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                <span className={`text-[9px] uppercase block ${colors.hudSub}`}>AI Exposure</span>
                <span
                  className="text-base font-bold"
                  style={{ color: isDark ? colors.linePrimary : colors.lineSecondary }}
                >
                  {(hoveredNode.exposure * 100).toFixed(0)}%
                </span>
                <span className={`text-[9px] block ${colors.hudSub}`}>of core tasks</span>
              </div>
              <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                <span className={`text-[9px] uppercase block ${colors.hudSub}`}>10-Yr US Growth</span>
                <span
                  className={`text-base font-bold ${
                    hoveredNode.growth >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                  }`}
                >
                  {hoveredNode.growth > 0 ? '+' : ''}{hoveredNode.growth}%
                </span>
                <span className={`text-[9px] block ${colors.hudSub}`}>projected BLS</span>
              </div>
            </div>

            {/* Call to action button */}
            <button
              type="button"
              onClick={(e) => handleNodeClick(hoveredNode, e)}
              className={`w-full mt-2.5 py-1.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#22d3ee] hover:bg-[#38bdf8] text-[#061329]'
                  : 'bg-[#1e5bb4] hover:bg-[#0f3b7d] text-white'
              }`}
            >
              <span>Explore full profile in Atlas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MINIMAL FLOATING KINEMATICS CONTROL BADGE (Bottom Right)                */}
      {/* ========================================================================= */}
      <div className="absolute bottom-4 right-4 z-30 pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          title={isPlaying ? 'Pause Kinematic Mechanism' : 'Resume Kinematic Mechanism'}
          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-[#091629]/80 border-[#163560] text-[#94a3b8] hover:text-[#22d3ee] hover:border-[#22d3ee]/40'
              : 'bg-[#ffffff]/85 border-[#cbd5e1] text-[#475569] hover:text-[#0f3b7d] hover:border-[#0f3b7d]/40'
          }`}
          data-cursor-interactive="true"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3" />
              <span>Kinematics: Active</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              <span>Kinematics: Paused</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setRotationAngle((a) => (a + 45) % 360)}
          title="Step Linkage Dial 45°"
          className={`p-1.5 rounded-lg border text-[11px] font-mono flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-[#091629]/80 border-[#163560] text-[#94a3b8] hover:text-[#22d3ee]'
              : 'bg-[#ffffff]/85 border-[#cbd5e1] text-[#475569] hover:text-[#0f3b7d]'
          }`}
          data-cursor-interactive="true"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Atmospheric edge fades for total background dissolution */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none transition-colors duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(to right, #061329 20%, transparent)'
            : 'linear-gradient(to right, #f8f7f2 20%, transparent)'
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none transition-colors duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(to top, #061329, transparent)'
            : 'linear-gradient(to top, #f8f7f2, transparent)'
        }}
      />
    </div>
  );
};
