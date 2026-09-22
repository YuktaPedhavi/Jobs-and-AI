import React, { useState, useEffect } from 'react';
import { Occupation271, occupations271 } from '../data/occupations271';
import { EvidenceBadge } from './EvidenceBadge';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { InteractiveOrreryArtwork } from './InteractiveOrreryArtwork';
import { ArrowDown, Check, Shuffle, Compass, Sparkles, HelpCircle } from 'lucide-react';

interface EditorialLandingHeroProps {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
  onScrollToChapter1: () => void;
}

interface ChoiceItem {
  title: string;
  socCode: string;
  category: string;
  exposure: number;
  growth: number;
  wage: number;
  aiTouches: string;
  humanValue: string;
}

interface CuriosityPair {
  jobA: ChoiceItem;
  jobB: ChoiceItem;
  curiosityPrompt: string;
  editorialInsight: string;
  evidenceId: string;
}

const CURIOSITY_PAIRS: CuriosityPair[] = [
  {
    jobA: {
      title: 'Graphic Designer',
      socCode: '27-1024',
      category: 'Arts & Media',
      exposure: 0.411,
      growth: 2.0,
      wage: 61300,
      aiTouches: 'Layout drafts, asset variations, image cleanup',
      humanValue: 'Creative direction, visual taste, cultural context'
    },
    jobB: {
      title: 'Accountant & Auditor',
      socCode: '13-2011',
      category: 'Business & Finance',
      exposure: 0.672,
      growth: 4.0,
      wage: 79880,
      aiTouches: 'Ledger reconciliation, tax form synthesis, audit sampling',
      humanValue: 'Fiduciary sign-off, tax strategy, client advisory'
    },
    curiosityPrompt: 'Creative vs Analytical',
    editorialInsight:
      'Many assume AI hits visual designers harder than numbers-driven accountants. In reality, accounting tasks are more rule-bound (67% exposure vs 41%). Yet both occupations have positive expected job growth. AI changes daily workflows—it does not simply eliminate the profession.',
    evidenceId: 'C001'
  },
  {
    jobA: {
      title: 'Software Developer',
      socCode: '15-1252',
      category: 'Computer & Logic',
      exposure: 0.706,
      growth: 17.0,
      wage: 132270,
      aiTouches: 'Boilerplate code, unit test generation, docstrings, syntax fixes',
      humanValue: 'System architecture, trade-off decisions, operational reliability'
    },
    jobB: {
      title: 'Elementary Teacher',
      socCode: '25-2021',
      category: 'Education & Care',
      exposure: 0.182,
      growth: 1.0,
      wage: 63680,
      aiTouches: 'Lesson plan drafting, worksheet generation, quiz grading',
      humanValue: 'Classroom empathy, behavioral management, childhood development'
    },
    curiosityPrompt: 'High Tech vs Human Care',
    editorialInsight:
      'Software engineering has one of the highest technical exposures (71%), yet projected growth remains robust (+17%) due to insatiable software demand. Meanwhile, teaching has low exposure (18%) because physical classroom presence and emotional guidance cannot be automated.',
    evidenceId: 'C002'
  },
  {
    jobA: {
      title: 'Customer Service Rep',
      socCode: '43-4051',
      category: 'Office & Support',
      exposure: 0.671,
      growth: -5.0,
      wage: 42830,
      aiTouches: 'Knowledge base retrieval, auto-reply suggestions, ticket classification',
      humanValue: 'Handling complex crises, angry customer de-escalation'
    },
    jobB: {
      title: 'Financial Advisor',
      socCode: '13-2052',
      category: 'Financial Strategy',
      exposure: 0.710,
      growth: 10.0,
      wage: 102140,
      aiTouches: 'Portfolio simulations, market summary briefings, tax optimization',
      humanValue: 'Personal empathy during market panics, life-transition trust'
    },
    curiosityPrompt: 'Routine Support vs Fiduciary Trust',
    editorialInsight:
      'Both roles share high AI task overlap (~67–71%). But customer support is projected to decline (-5%) while personal financial advising expands (+10%). Why? Trust, liability, and personal relationships command an increasing premium when routine information is commoditized.',
    evidenceId: 'C003'
  }
];

export const EditorialLandingHero: React.FC<EditorialLandingHeroProps> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence,
  onScrollToChapter1
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [chosenSide, setChosenSide] = useState<'A' | 'B' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const pair = CURIOSITY_PAIRS[selectedPairIndex];

  // Restrained parallax tracking on desktop
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

  const handleChoose = (side: 'A' | 'B') => {
    setChosenSide(side);
    const chosenJob = side === 'A' ? pair.jobA : pair.jobB;
    const occ = occupations271.find((o) => o.soc_code === chosenJob.socCode);
    if (occ) onSelectOccupation(occ);
  };

  const handleCyclePair = () => {
    setSelectedPairIndex((prev) => (prev + 1) % CURIOSITY_PAIRS.length);
    setChosenSide(null);
  };

  return (
    <header
      id="ch00_which_changes"
      className="relative min-h-[96vh] lg:min-h-screen overflow-hidden flex flex-col justify-between transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#061329' : '#f8f7f2',
        color: isDark ? '#f7faeb' : '#061329',
        borderBottom: `1px solid ${isDark ? '#163560' : '#d8dcce'}`
      }}
    >
      {/* ========================================================================= */}
      {/* INTEGRATED 2D CONCEPTUAL ARTWORK (Positioned right & flowing behind)       */}
      {/* Blends smoothly into canvas with NO visible rectangular frame or box     */}
      {/* ========================================================================= */}
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

        {/* Ambient atmospheric linear gradients to ensure total edge integration */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[50%] pointer-events-none transition-colors duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #061329 55%, rgba(6, 19, 41, 0.8) 80%, transparent 100%)'
              : 'linear-gradient(to right, #f8f7f2 55%, rgba(248, 247, 242, 0.8) 80%, transparent 100%)'
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none transition-colors duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to top, #061329 20%, transparent)'
              : 'linear-gradient(to top, #f8f7f2 20%, transparent)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* EDITORIAL POSTER CONTENT LAYER (Unified typography and data interaction)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10 w-full flex-1 flex flex-col justify-between">
        {/* Top Observatory Masthead & Visible Theme Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider backdrop-blur-md transition-colors"
              style={{
                backgroundColor: isDark ? 'rgba(11, 31, 60, 0.8)' : '#ffffff',
                borderColor: isDark ? '#163560' : '#d5dde7',
                color: isDark ? '#d7e63b' : '#1e5bb4'
              }}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>THE WORK OBSERVATORY · 271 PROFESSIONS</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono opacity-70">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: isDark ? '#d7e63b' : '#1e5bb4' }}
              />
              <span>Empirical BLS & O*NET Research</span>
            </div>
          </div>

          {/* Visible Dark / Light Theme Toggle Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Main Poster Layout: Typography Left, Integrated Data & Artwork */}
        <div className="my-auto py-8 sm:py-12 max-w-2xl space-y-6">
          {/* Main Title & Editorial Thesis */}
          <div className="space-y-4">
            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[0.92] select-none uppercase"
              style={{ color: isDark ? '#f7faeb' : '#061329' }}
            >
              THE NEW VALUE <br />
              <span>OF WORK</span>
            </h1>

            <p
              className="text-lg sm:text-xl lg:text-2xl font-sans font-normal leading-relaxed max-w-xl"
              style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
            >
              AI is changing work.{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#f7faeb' : '#061329' }}
              >
                But not every job in the same way.
              </span>
            </p>
          </div>

          {/* Integrated Interactive Curiosity Question */}
          <div
            className="pt-6 space-y-5 border-t"
            style={{ borderColor: isDark ? '#142e53' : '#e2e6db' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span
                  className="text-xs font-mono uppercase tracking-widest font-semibold block"
                  style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
                >
                  Interactive Curiosity Test
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                  style={{ color: isDark ? '#f7faeb' : '#061329' }}
                >
                  Which job do you think AI affects more?
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCyclePair}
                className="px-3 py-1.5 rounded-full border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                style={{
                  backgroundColor: isDark ? 'rgba(11, 31, 60, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  borderColor: isDark ? '#163560' : '#d8dcce',
                  color: isDark ? '#9bb2cf' : '#526a85'
                }}
                data-cursor-interactive="true"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Try another pair ({selectedPairIndex + 1}/{CURIOSITY_PAIRS.length})</span>
              </button>
            </div>

            {/* Architectural Profession Choice Cards (Reduced box feeling, sleek geometry) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option A */}
              <button
                type="button"
                onClick={() => handleChoose('A')}
                className="p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md group"
                style={{
                  backgroundColor:
                    chosenSide === 'A'
                      ? isDark
                        ? '#0b1f3c'
                        : '#ffffff'
                      : chosenSide === 'B'
                      ? isDark
                        ? 'rgba(7, 23, 49, 0.5)'
                        : 'rgba(241, 239, 230, 0.5)'
                      : isDark
                      ? 'rgba(11, 31, 60, 0.65)'
                      : 'rgba(255, 255, 255, 0.75)',
                  borderColor:
                    chosenSide === 'A'
                      ? isDark
                        ? '#d7e63b'
                        : '#1e5bb4'
                      : isDark
                      ? '#163560'
                      : '#d8dcce',
                  boxShadow:
                    chosenSide === 'A'
                      ? isDark
                        ? '0 0 20px rgba(215, 230, 59, 0.15)'
                        : '0 4px 20px rgba(30, 91, 180, 0.12)'
                      : 'none'
                }}
                data-cursor-interactive="true"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span style={{ color: isDark ? '#9bb2cf' : '#526a85' }}>
                      {pair.jobA.category}
                    </span>
                    {chosenSide === 'A' && (
                      <span
                        className="flex items-center gap-1 font-bold text-xs"
                        style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
                      >
                        <Check className="w-3.5 h-3.5" /> Your choice
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-display font-extrabold tracking-tight transition-colors"
                    style={{ color: isDark ? '#f7faeb' : '#061329' }}
                  >
                    {pair.jobA.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
                  >
                    Focus: {pair.jobA.aiTouches}
                  </p>

                  {/* Revealed Empirical Data on Choice */}
                  {chosenSide && (
                    <div
                      className="pt-3 border-t space-y-2.5 animate-in fade-in duration-300"
                      style={{ borderColor: isDark ? '#163560' : '#d8dcce' }}
                    >
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div
                          className="p-2.5 rounded-xl border"
                          style={{
                            backgroundColor: isDark ? '#071731' : '#f1efe6',
                            borderColor: isDark ? '#142e53' : '#cbd0c1'
                          }}
                        >
                          <span
                            className="text-[10px] block"
                            style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
                          >
                            AI Task Overlap:
                          </span>
                          <span
                            className="text-lg font-bold"
                            style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
                          >
                            {(pair.jobA.exposure * 100).toFixed(0)}%
                          </span>
                          <span
                            className="text-[9px] block"
                            style={{ color: isDark ? '#5f7d9f' : '#6c829c' }}
                          >
                            of workday tasks
                          </span>
                        </div>

                        <div
                          className="p-2.5 rounded-xl border"
                          style={{
                            backgroundColor: isDark ? '#071731' : '#f1efe6',
                            borderColor: isDark ? '#142e53' : '#cbd0c1'
                          }}
                        >
                          <span
                            className="text-[10px] block"
                            style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
                          >
                            10-Yr Job Growth:
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              pair.jobA.growth >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                            }`}
                          >
                            {pair.jobA.growth > 0 ? '+' : ''}
                            {pair.jobA.growth}%
                          </span>
                          <span
                            className="text-[9px] block"
                            style={{ color: isDark ? '#5f7d9f' : '#6c829c' }}
                          >
                            BLS 2024–34
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px]">
                        <strong
                          className="block font-sans"
                          style={{ color: isDark ? '#f7faeb' : '#061329' }}
                        >
                          Human core:
                        </strong>
                        <span style={{ color: isDark ? '#9bb2cf' : '#526a85' }}>
                          {pair.jobA.humanValue}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>

              {/* Option B */}
              <button
                type="button"
                onClick={() => handleChoose('B')}
                className="p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md group"
                style={{
                  backgroundColor:
                    chosenSide === 'B'
                      ? isDark
                        ? '#0b1f3c'
                        : '#ffffff'
                      : chosenSide === 'A'
                      ? isDark
                        ? 'rgba(7, 23, 49, 0.5)'
                        : 'rgba(241, 239, 230, 0.5)'
                      : isDark
                      ? 'rgba(11, 31, 60, 0.65)'
                      : 'rgba(255, 255, 255, 0.75)',
                  borderColor:
                    chosenSide === 'B'
                      ? isDark
                        ? '#d7e63b'
                        : '#1e5bb4'
                      : isDark
                      ? '#163560'
                      : '#d8dcce',
                  boxShadow:
                    chosenSide === 'B'
                      ? isDark
                        ? '0 0 20px rgba(215, 230, 59, 0.15)'
                        : '0 4px 20px rgba(30, 91, 180, 0.12)'
                      : 'none'
                }}
                data-cursor-interactive="true"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span style={{ color: isDark ? '#9bb2cf' : '#526a85' }}>
                      {pair.jobB.category}
                    </span>
                    {chosenSide === 'B' && (
                      <span
                        className="flex items-center gap-1 font-bold text-xs"
                        style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
                      >
                        <Check className="w-3.5 h-3.5" /> Your choice
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-display font-extrabold tracking-tight transition-colors"
                    style={{ color: isDark ? '#f7faeb' : '#061329' }}
                  >
                    {pair.jobB.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
                  >
                    Focus: {pair.jobB.aiTouches}
                  </p>

                  {/* Revealed Empirical Data on Choice */}
                  {chosenSide && (
                    <div
                      className="pt-3 border-t space-y-2.5 animate-in fade-in duration-300"
                      style={{ borderColor: isDark ? '#163560' : '#d8dcce' }}
                    >
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div
                          className="p-2.5 rounded-xl border"
                          style={{
                            backgroundColor: isDark ? '#071731' : '#f1efe6',
                            borderColor: isDark ? '#142e53' : '#cbd0c1'
                          }}
                        >
                          <span
                            className="text-[10px] block"
                            style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
                          >
                            AI Task Overlap:
                          </span>
                          <span
                            className="text-lg font-bold"
                            style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
                          >
                            {(pair.jobB.exposure * 100).toFixed(0)}%
                          </span>
                          <span
                            className="text-[9px] block"
                            style={{ color: isDark ? '#5f7d9f' : '#6c829c' }}
                          >
                            of workday tasks
                          </span>
                        </div>

                        <div
                          className="p-2.5 rounded-xl border"
                          style={{
                            backgroundColor: isDark ? '#071731' : '#f1efe6',
                            borderColor: isDark ? '#142e53' : '#cbd0c1'
                          }}
                        >
                          <span
                            className="text-[10px] block"
                            style={{ color: isDark ? '#9bb2cf' : '#526a85' }}
                          >
                            10-Yr Job Growth:
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              pair.jobB.growth >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                            }`}
                          >
                            {pair.jobB.growth > 0 ? '+' : ''}
                            {pair.jobB.growth}%
                          </span>
                          <span
                            className="text-[9px] block"
                            style={{ color: isDark ? '#5f7d9f' : '#6c829c' }}
                          >
                            BLS 2024–34
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px]">
                        <strong
                          className="block font-sans"
                          style={{ color: isDark ? '#f7faeb' : '#061329' }}
                        >
                          Human core:
                        </strong>
                        <span style={{ color: isDark ? '#9bb2cf' : '#526a85' }}>
                          {pair.jobB.humanValue}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Revealed Editorial Data Insight */}
            {chosenSide && (
              <div
                className="p-5 rounded-2xl border space-y-2 backdrop-blur-md animate-in fade-in duration-300"
                style={{
                  backgroundColor: isDark ? '#0b1f3c' : '#ffffff',
                  borderColor: isDark ? '#d7e63b' : '#1e5bb4'
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-bold"
                    style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
                  >
                    {pair.curiosityPrompt} · Key Insight
                  </span>
                  <EvidenceBadge
                    id={pair.evidenceId}
                    onClick={onOpenEvidence}
                    labelOverride="Inspect Dataset"
                  />
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDark ? '#f7faeb' : '#061329' }}
                >
                  {pair.editorialInsight}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Editorial Anchor Bar */}
        <div
          className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t text-xs"
          style={{
            borderColor: isDark ? '#142e53' : '#d8dcce',
            color: isDark ? '#9bb2cf' : '#526a85'
          }}
        >
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span
              className="inline-flex items-center gap-1.5 font-semibold"
              style={{ color: isDark ? '#f7faeb' : '#061329' }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: isDark ? '#d7e63b' : '#1e5bb4' }}
              />
              <span>The 271 Jobs Living Atlas</span>
            </span>
            <span style={{ color: isDark ? '#163560' : '#cbd0c1' }}>|</span>
            <span>Hover or click any node on the orrery artwork to inspect professions</span>
          </div>

          <button
            type="button"
            onClick={onScrollToChapter1}
            className="group font-mono text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            style={{ color: isDark ? '#d7e63b' : '#1e5bb4' }}
            data-cursor-interactive="true"
          >
            <span>Explore Chapter 1: Four Different Futures</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
