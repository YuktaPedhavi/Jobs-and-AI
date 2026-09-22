import React, { useState, useEffect } from 'react';
import { Occupation271, occupations271 } from '../data/occupations271';
import { EvidenceBadge } from './EvidenceBadge';
import { ArrowDown, Check, Shuffle, Compass } from 'lucide-react';
import heroHandsImage from '../assets/images/hero_hands.jpg';

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
      category: 'Arts & Design',
      exposure: 0.411,
      growth: 2.0,
      wage: 61300,
      aiTouches: 'Layout drafts, asset variations, background fills',
      humanValue: 'Creative direction, visual taste, cultural context'
    },
    jobB: {
      title: 'Accountant',
      socCode: '13-2011',
      category: 'Business & Financial',
      exposure: 0.672,
      growth: 4.0,
      wage: 79880,
      aiTouches: 'Ledger reconciliation, tax form synthesis, audit sampling',
      humanValue: 'Fiduciary sign-off, tax strategy, client advisory'
    },
    curiosityPrompt: 'Creative vs Analytical',
    editorialInsight:
      'Many assume AI hits visual designers harder than numbers-driven accountants. In reality, accounting tasks are more structured and rule-bound (67% exposure vs 41%). Yet both occupations have positive expected job growth. AI changes the daily workflow—it does not simply eliminate the profession.',
    evidenceId: 'C001'
  },
  {
    jobA: {
      title: 'Software Developer',
      socCode: '15-1252',
      category: 'Computer & Math',
      exposure: 0.706,
      growth: 17.0,
      wage: 132270,
      aiTouches: 'Boilerplate code, unit test generation, docstrings, syntax fixes',
      humanValue: 'System architecture, trade-off decisions, operational reliability'
    },
    jobB: {
      title: 'Elementary Teacher',
      socCode: '25-2021',
      category: 'Education',
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
      category: 'Office & Admin',
      exposure: 0.671,
      growth: -5.0,
      wage: 42830,
      aiTouches: 'Knowledge base retrieval, auto-reply suggestions, ticket classification',
      humanValue: 'Handling complex crises, angry customer de-escalation'
    },
    jobB: {
      title: 'Financial Advisor',
      socCode: '13-2052',
      category: 'Finance',
      exposure: 0.710,
      growth: 10.0,
      wage: 102140,
      aiTouches: 'Portfolio simulations, market summary briefings, tax optimization',
      humanValue: 'Personal empathy during market panics, life-transition trust'
    },
    curiosityPrompt: 'Routine Service vs Fiduciary Trust',
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
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [chosenSide, setChosenSide] = useState<'A' | 'B' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const pair = CURIOSITY_PAIRS[selectedPairIndex];

  // Subtle restrained parallax on mouse move (only desktop, non-reduced motion)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
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
      className="relative min-h-[96vh] lg:min-h-screen bg-[#0C1016] text-[#EEF2F6] overflow-hidden flex flex-col justify-between border-b border-[#1E2633]"
    >
      {/* ========================================================================= */}
      {/* POSTER ARTWORK LAYER: Frameless, screen/lighten blend, no rectangle       */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Main Reaching Hands with Wavy Circuit Landscape (Spans across the poster) */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px, 0)`
          }}
        >
          {/* 
            The artwork is blended using mix-blend-mode: lighten + multi-stop radial & linear masks.
            This completely eliminates the rectangular boundary so only the illuminated hands,
            spark, and data wave streams glow organically against the page background.
          */}
          <img
            src={heroHandsImage}
            alt=""
            className="w-full h-full object-cover object-[62%_36%] lg:object-[68%_38%] opacity-85"
            style={{
              mixBlendMode: 'lighten',
              maskImage:
                'radial-gradient(ellipse 80% 75% at 65% 42%, black 20%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.3) 72%, transparent 92%), linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 75% at 65% 42%, black 20%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.3) 72%, transparent 92%), linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'destination-in'
            }}
          />

          {/* Central light spark pulse between human and AI fingertips */}
          <div
            className="absolute top-[38%] left-[58%] lg:left-[66%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full pointer-events-none animate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(254, 249, 195, 1) 0%, rgba(34, 211, 238, 0.85) 30%, rgba(12, 16, 22, 0) 70%)',
              filter: 'blur(2px)'
            }}
          />
        </div>

        {/* 
          OVERLAPPING FLOWING DATA WAVES:
          Continuous topographical bezier wave lines that flow out from beneath the hands
          and ripple across the entire poster width, weaving behind and between text.
        */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 0.18}px, ${mousePos.y * 0.18}px, 0)`
          }}
          viewBox="0 0 1600 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradientCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.05" />
              <stop offset="35%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="waveGradientAmber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.05" />
              <stop offset="45%" stopColor="#F97316" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Flowing Wave Crest 1 (Cyan Data Stream) */}
          <path
            d="M -50 480 C 320 440, 520 540, 820 490 C 1120 440, 1340 520, 1650 470"
            stroke="url(#waveGradientCyan)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          {/* Flowing Wave Crest 2 (Human Coral Stream) */}
          <path
            d="M -50 560 C 280 620, 580 510, 890 580 C 1190 640, 1420 530, 1650 570"
            stroke="url(#waveGradientAmber)"
            strokeWidth="1.5"
            strokeDasharray="2 6"
          />

          {/* Flowing Wave Crest 3 (Deep Topographical Ridge) */}
          <path
            d="M -50 650 C 350 610, 680 710, 1020 640 C 1320 580, 1500 660, 1650 630"
            stroke="#22D3EE"
            strokeWidth="1"
            strokeOpacity="0.22"
          />

          {/* Flowing Wave Crest 4 (Subtle Ambient Ocean Wave) */}
          <path
            d="M -50 740 C 240 790, 620 700, 940 760 C 1240 810, 1450 720, 1650 750"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeOpacity="0.15"
          />

          {/* Circuit Trace Connectors branching from waves to text anchor */}
          <path
            d="M 680 500 L 540 500 L 460 560 L 220 560"
            stroke="#22D3EE"
            strokeWidth="1"
            strokeDasharray="3 5"
            strokeOpacity="0.3"
          />

          {/* Data Nodes floating along the waves */}
          <circle cx="820" cy="490" r="3.5" fill="#22D3EE" opacity="0.9" />
          <circle cx="890" cy="580" r="3" fill="#F97316" opacity="0.85" />
          <circle cx="540" cy="500" r="2.5" fill="#EEF2F6" opacity="0.7" />
          <circle cx="1020" cy="640" r="3" fill="#22D3EE" opacity="0.6" />
          <circle cx="460" cy="560" r="2" fill="#F59E0B" opacity="0.8" />
          <circle cx="1190" cy="640" r="2.5" fill="#22D3EE" opacity="0.75" />
        </svg>

        {/* Ambient tonal gradients for complete soft fade into #0C1016 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1016] via-transparent to-transparent h-48 bottom-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1016] via-transparent to-transparent h-28 top-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1016] via-[#0C1016]/40 to-transparent w-96 left-0" />
      </div>

      {/* ========================================================================= */}
      {/* POSTER COMPOSITION: Unified typography, integrated data & interactions    */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 w-full flex-1 flex flex-col justify-between">
        {/* Top Observatory Masthead */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161C25]/80 border border-[#222B38] text-[#22D3EE] text-xs font-mono tracking-wider backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>THE WORK OBSERVATORY · LIVING ATLAS ACROSS 271 PROFESSIONS</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-[#94A3B8]">
            <span className="inline-flex items-center gap-1.5 text-[#EEF2F6]">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>Real-World Empirical Dataset</span>
            </span>
            <span>·</span>
            <span>BLS & O*NET Benchmarks</span>
          </div>
        </div>

        {/* Main Poster Typography (Unified display, gracefully interwoven with the artwork) */}
        <div className="my-auto py-8 sm:py-12 max-w-4xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-[#EEF2F6] leading-[0.98] drop-shadow-sm">
              THE NEW VALUE <br className="hidden sm:block" />
              <span className="text-[#EEF2F6]">OF WORK</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#94A3B8] font-normal leading-relaxed max-w-2xl">
              AI is changing work. <span className="text-[#EEF2F6]">But not every job in the same way.</span>
            </p>
          </div>

          {/* Integrated Interactive Question & Profession Comparison */}
          <div className="pt-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 max-w-3xl">
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] font-semibold block">
                  Interactive Curiosity Test
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6]">
                  Which job do you think AI affects more?
                </h2>
              </div>

              <button
                onClick={handleCyclePair}
                className="px-3 py-1.5 rounded-lg bg-[#161C25]/90 hover:bg-[#1E2633] border border-[#222B38] text-xs font-mono text-[#94A3B8] hover:text-[#EEF2F6] transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-xs"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Try another pair ({selectedPairIndex + 1}/{CURIOSITY_PAIRS.length})</span>
              </button>
            </div>

            {/* Asymmetrical Profession Choice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {/* Option A */}
              <button
                onClick={() => handleChoose('A')}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md group ${
                  chosenSide === 'A'
                    ? 'bg-[#161C25]/95 border-[#22D3EE] ring-2 ring-[#22D3EE]/30 shadow-2xl'
                    : chosenSide === 'B'
                    ? 'bg-[#121720]/60 border-[#1E2633] opacity-65'
                    : 'bg-[#121720]/80 hover:bg-[#161C25] border-[#222B38] hover:border-[#22D3EE]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>{pair.jobA.category}</span>
                    {chosenSide === 'A' && (
                      <span className="flex items-center gap-1 text-[#22D3EE] font-bold">
                        <Check className="w-3.5 h-3.5" /> Your choice
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EEF2F6] group-hover:text-[#22D3EE] transition-colors">
                    {pair.jobA.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    Focus: {pair.jobA.aiTouches}
                  </p>

                  {/* Revealed Data on Click */}
                  {chosenSide && (
                    <div className="pt-3 border-t border-[#222B38] space-y-2.5 animate-in fade-in duration-300">
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-[#0C1016]/90 rounded-xl border border-[#222B38]">
                          <span className="text-[10px] text-[#94A3B8] block">AI affects:</span>
                          <span className="text-lg font-bold text-[#22D3EE]">
                            {(pair.jobA.exposure * 100).toFixed(0)}%
                          </span>
                          <span className="text-[9px] text-[#94A3B8] block">of daily tasks</span>
                        </div>
                        <div className="p-2.5 bg-[#0C1016]/90 rounded-xl border border-[#222B38]">
                          <span className="text-[10px] text-[#94A3B8] block">Expected growth:</span>
                          <span
                            className={`text-lg font-bold ${
                              pair.jobA.growth >= 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                            }`}
                          >
                            {pair.jobA.growth > 0 ? '+' : ''}
                            {pair.jobA.growth}%
                          </span>
                          <span className="text-[9px] text-[#94A3B8] block">U.S. 2024–34</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#94A3B8]">
                        <strong className="text-[#EEF2F6] block font-sans">Human core:</strong>
                        <span>{pair.jobA.humanValue}</span>
                      </div>
                    </div>
                  )}
                </div>
              </button>

              {/* Option B */}
              <button
                onClick={() => handleChoose('B')}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md group ${
                  chosenSide === 'B'
                    ? 'bg-[#161C25]/95 border-[#22D3EE] ring-2 ring-[#22D3EE]/30 shadow-2xl'
                    : chosenSide === 'A'
                    ? 'bg-[#121720]/60 border-[#1E2633] opacity-65'
                    : 'bg-[#121720]/80 hover:bg-[#161C25] border-[#222B38] hover:border-[#22D3EE]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>{pair.jobB.category}</span>
                    {chosenSide === 'B' && (
                      <span className="flex items-center gap-1 text-[#22D3EE] font-bold">
                        <Check className="w-3.5 h-3.5" /> Your choice
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EEF2F6] group-hover:text-[#22D3EE] transition-colors">
                    {pair.jobB.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    Focus: {pair.jobB.aiTouches}
                  </p>

                  {/* Revealed Data on Click */}
                  {chosenSide && (
                    <div className="pt-3 border-t border-[#222B38] space-y-2.5 animate-in fade-in duration-300">
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-[#0C1016]/90 rounded-xl border border-[#222B38]">
                          <span className="text-[10px] text-[#94A3B8] block">AI affects:</span>
                          <span className="text-lg font-bold text-[#22D3EE]">
                            {(pair.jobB.exposure * 100).toFixed(0)}%
                          </span>
                          <span className="text-[9px] text-[#94A3B8] block">of daily tasks</span>
                        </div>
                        <div className="p-2.5 bg-[#0C1016]/90 rounded-xl border border-[#222B38]">
                          <span className="text-[10px] text-[#94A3B8] block">Expected growth:</span>
                          <span
                            className={`text-lg font-bold ${
                              pair.jobB.growth >= 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                            }`}
                          >
                            {pair.jobB.growth > 0 ? '+' : ''}
                            {pair.jobB.growth}%
                          </span>
                          <span className="text-[9px] text-[#94A3B8] block">U.S. 2024–34</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#94A3B8]">
                        <strong className="text-[#EEF2F6] block font-sans">Human core:</strong>
                        <span>{pair.jobB.humanValue}</span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Revealed Editorial Insight Box */}
            {chosenSide && (
              <div className="p-5 rounded-2xl bg-[#161C25]/95 border border-[#22D3EE]/35 space-y-2 max-w-3xl backdrop-blur-md animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#22D3EE] font-bold">
                    {pair.curiosityPrompt} · The Data Finding
                  </span>
                  <EvidenceBadge id={pair.evidenceId} onClick={onOpenEvidence} labelOverride="View Empirical Data" />
                </div>
                <p className="text-sm text-[#EEF2F6] leading-relaxed">
                  {pair.editorialInsight}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Poster Anchor Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2633]/60 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-[#EEF2F6]">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>Living Atlas</span>
            </span>
            <span className="text-[#222B38]">|</span>
            <span>271 Occupations · Median AI Exposure: 37% · Growth Baseline: +3.1%</span>
          </div>

          <button
            onClick={onScrollToChapter1}
            className="group font-mono text-xs text-[#22D3EE] hover:text-[#38BDF8] font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>Explore the 271 Jobs Living Atlas</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
