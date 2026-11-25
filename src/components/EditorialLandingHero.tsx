import React, { useState, useEffect } from 'react';
import { Occupation271 } from '../data/occupations271';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { InteractiveOrreryArtwork } from './InteractiveOrreryArtwork';
import { ArrowDown, ArrowRight, Compass } from 'lucide-react';

interface EditorialLandingHeroProps {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
  onScrollToChapter1: () => void;
  onScrollToLookup: () => void;
}

export const EditorialLandingHero: React.FC<EditorialLandingHeroProps> = ({
  activeOccupation,
  onSelectOccupation,
  onScrollToChapter1,
  onScrollToLookup
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? 'rgba(11, 31, 60, 0.85)' : 'rgba(255, 255, 255, 0.9)',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    accent: isDark ? '#d7e63b' : '#1e5bb4'
  };

  return (
    <header
      id="ch00_introduction"
      className="relative min-h-[88vh] lg:min-h-[92vh] overflow-hidden flex flex-col justify-between transition-colors duration-500"
      style={{
        backgroundColor: palette.canvasBg,
        color: palette.textMain,
        borderBottom: `1px solid ${palette.border}`
      }}
    >
      {/* Integrated Interactive Artwork Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] h-full opacity-90 transition-opacity duration-700">
          <InteractiveOrreryArtwork
            mousePos={mousePos}
            onSelectOccupation={onSelectOccupation}
            className="w-full h-full pointer-events-auto"
          />
        </div>

        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[52%] pointer-events-none transition-colors duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #061329 55%, rgba(6, 19, 41, 0.8) 80%, transparent 100%)'
              : 'linear-gradient(to right, #f8f7f2 55%, rgba(248, 247, 242, 0.8) 80%, transparent 100%)'
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none transition-colors duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to top, #061329 20%, transparent)'
              : 'linear-gradient(to top, #f8f7f2 20%, transparent)'
          }}
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10 w-full flex-1 flex flex-col justify-between">
        {/* Top Masthead & Theme Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.textMuted }}
          >
            <Compass className="w-3.5 h-3.5" style={{ color: palette.cyan }} aria-hidden="true" />
            <span className="font-semibold" style={{ color: palette.textMain }}>
              The New Value of Work
            </span>
            <span aria-hidden="true">·</span>
            <span>271 Occupations</span>
          </div>

          <ThemeToggle />
        </div>

        {/* Main Introduction */}
        <div className="my-auto py-12 sm:py-16 max-w-2xl space-y-6">
          <div
            className="text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            00 · Introduction
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[0.98]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            How Is AI Changing Work?
          </h1>

          <p
            className="text-lg sm:text-2xl font-sans font-normal leading-relaxed max-w-xl"
            style={{ color: palette.textMuted }}
          >
            AI is changing what people do at work. But not every job is changing in the same way.
          </p>

          {/* Two Primary Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onScrollToChapter1}
              className="px-5 py-3 min-h-[44px] rounded-xl text-sm font-sans font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: palette.cyan,
                color: isDark ? '#061329' : '#ffffff'
              }}
              data-cursor-interactive="true"
            >
              <span>Explore the Story</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onScrollToLookup}
              className="px-5 py-3 min-h-[44px] rounded-xl border text-sm font-sans font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 backdrop-blur-md focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border,
                color: palette.textMain
              }}
              data-cursor-interactive="true"
            >
              <span>Find Your Profession</span>
              <ArrowRight className="w-4 h-4" style={{ color: palette.cyan }} />
            </button>
          </div>
        </div>

        {/* Bottom Tracked Profession Anchor Bar */}
        <div
          className="pt-5 flex flex-wrap items-center justify-between gap-4 border-t text-xs"
          style={{
            borderColor: palette.border,
            color: palette.textMuted
          }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans">
            <span>Click any node on the artwork to track a job:</span>
            <button
              type="button"
              onClick={onScrollToLookup}
              className="font-mono font-semibold hover:underline cursor-pointer tabular-nums"
              style={{ color: palette.cyan }}
            >
              {activeOccupation.occupation_title} ({(activeOccupation.ai_exposure_llm_human * 100).toFixed(0)}% task overlap)
            </button>
          </div>

          <span className="font-mono text-[11px]" style={{ color: palette.textMuted }}>
            U.S. BLS &amp; O*NET · Peer-Reviewed Studies
          </span>
        </div>
      </div>
    </header>
  );
};
