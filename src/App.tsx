import React, { useState, useEffect } from 'react';
import { Workline, CHAPTER_LIST } from './components/Workline';
import { OccupationToken } from './components/OccupationToken';
import { OccupationConstellation } from './components/OccupationConstellation';
import { EditorialLandingHero } from './components/EditorialLandingHero';
import { Chapter1FourFutures } from './components/chapters/Chapter1FourFutures';
import { Chapter2CognitiveReach } from './components/chapters/Chapter2CognitiveReach';
import { Chapter3ThreeLenses } from './components/chapters/Chapter3ThreeLenses';
import { Chapter4PossibleVsActual } from './components/chapters/Chapter4PossibleVsActual';
import { Chapter5RealWorkday } from './components/chapters/Chapter5RealWorkday';
import { Chapter6FasterThenWhat } from './components/chapters/Chapter6FasterThenWhat';
import { Chapter7CareerLadder } from './components/chapters/Chapter7CareerLadder';
import { Chapter8NewAdvantage } from './components/chapters/Chapter8NewAdvantage';
import { Chapter9IndiaLens } from './components/chapters/Chapter9IndiaLens';
import { Chapter10YourProfession } from './components/chapters/Chapter10YourProfession';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { MethodologyModal } from './components/MethodologyModal';
import { occupations271, Occupation271 } from './data/occupations271';
import { calculatedKeyFindings } from './data/researchData';
import { Compass, ShieldCheck, Database, Sparkles, ArrowDown, Layers, HelpCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>('ch00_which_changes');
  const [activeOccupation, setActiveOccupation] = useState<Occupation271>(() => {
    return (
      occupations271.find((o) => o.soc_code === '27-1024') || // Graphic designers
      occupations271[0]
    );
  });
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [methodologyModalOpen, setMethodologyModalOpen] = useState(false);

  // Track active chapter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const chapterElements = CHAPTER_LIST.map((ch) => ({
        id: ch.id,
        el: document.getElementById(ch.id)
      }));

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const item = chapterElements[i];
        if (item.el && item.el.offsetTop - 240 <= scrollY) {
          setActiveChapter(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEvidence = (claimOrSourceId?: string) => {
    setSelectedClaimId(claimOrSourceId || null);
    setEvidenceDrawerOpen(true);
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapter(chapterId);
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInChapter10 = (occ: Occupation271) => {
    setActiveOccupation(occ);
    handleSelectChapter('ch10_your_profession');
  };

  return (
    <div className="min-h-screen bg-[#0C1016] text-[#EEF2F6] flex flex-col font-sans selection:bg-[#22D3EE] selection:text-[#0C1016]">
      {/* Editorial Workline Navigation (Desktop Left Spine + Mobile Progress Knot + Story Map) */}
      <Workline
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onOpenEvidence={handleOpenEvidence}
        onOpenMethodology={() => setMethodologyModalOpen(true)}
      />

      {/* Persistent Floating Occupation Token */}
      <OccupationToken
        occupation={activeOccupation}
        onOpenInChapter10={handleOpenInChapter10}
        onSelectAnother={() => handleSelectChapter('ch10_your_profession')}
      />

      {/* Main Container - Padded for left Desktop Workline */}
      <div className="md:pl-12 flex flex-col min-h-screen">
        {/* EDITORIAL LANDING / HERO SECTION (CH00) */}
        <EditorialLandingHero
          activeOccupation={activeOccupation}
          onSelectOccupation={setActiveOccupation}
          onOpenEvidence={handleOpenEvidence}
          onScrollToChapter1={() => handleSelectChapter('ch01_four_futures')}
        />

        {/* 271 OCCUPATION PARTICLES LIVING CONSTELLATION OBSERVATORY */}
        <section className="py-12 sm:py-16 border-b border-[#1E2633] bg-[#0C1016]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>THE 271 OCCUPATIONS PARTICLE OBSERVATORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6]">
                Explore the Living Atlas
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Every point represents one of the 271 federal occupations mapped in the empirical dataset. Click any particle to anchor that profession across every chapter.
              </p>
            </div>

            <OccupationConstellation
              activeOccupation={activeOccupation}
              onSelectOccupation={(occ) => {
                setActiveOccupation(occ);
              }}
              initialMode="constellation"
              interactiveControls={true}
              height={380}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#94A3B8]">
              <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-[#EEF2F6]">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> High Exposure (72)
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#EEF2F6]">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Medium Exposure (94)
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#EEF2F6]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Low Exposure (105)
                </span>
              </div>

              <button
                onClick={() => handleSelectChapter('ch01_four_futures')}
                className="font-mono text-xs text-[#22D3EE] font-semibold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Chapter 1: Four Futures</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* THE EDITORIAL CHAPTERS */}
        <main className="flex-1">
          {/* Chapter 1: 271 JOBS. FOUR DIFFERENT FUTURES. */}
          <Chapter1FourFutures
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* Chapter 2: WHAT KIND OF WORK DOES AI REACH FIRST? */}
          <Chapter2CognitiveReach
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* Chapter 3: ONE JOB. THREE AI LENSES. */}
          <Chapter3ThreeLenses
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* Chapter 4: POSSIBLE ≠ ACTUAL. */}
          <Chapter4PossibleVsActual onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 5: REAL WORKDAY DOCUMENTARY */}
          <Chapter5RealWorkday onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 6: PRODUCTIVITY & THE SKILL COMPRESSION */}
          <Chapter6FasterThenWhat onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 7: THE CAREER LADDER PROBLEM */}
          <Chapter7CareerLadder onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 8: WHAT BECOMES MORE VALUABLE? (THE NEW ADVANTAGE) */}
          <Chapter8NewAdvantage onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 9: INDIA & GLOBAL LABOR ARBITRAGE */}
          <Chapter9IndiaLens onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 10: LOOK UP YOUR PROFESSION (COMPLETE OCCUPATIONAL DOSSIER) */}
          <Chapter10YourProfession
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />
        </main>

        {/* EDITORIAL REPOSITORY FOOTER */}
        <footer className="bg-[#0C1016] text-[#94A3B8] py-16 border-t border-[#1E2633]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#1E2633]">
              <div>
                <span className="font-serif font-bold text-[#EEF2F6] text-xl tracking-tight block">
                  THE WORK OBSERVATORY
                </span>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-lg leading-relaxed">
                  An open data-storytelling website synthesized from 271 occupation profiles, macroeconomic surveys, and verified field experiments. No synthetic quotes, no sponsored hype.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenEvidence()}
                  className="px-3.5 py-2 rounded-lg bg-[#161C25] hover:bg-[#222B38] border border-[#222B38] text-[#EEF2F6] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Evidence Vault</span>
                </button>
                <button
                  onClick={() => setMethodologyModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#161C25] hover:bg-[#222B38] border border-[#222B38] text-[#EEF2F6] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Data Audit & Methods</span>
                </button>
              </div>
            </div>

            {/* Sourced Research Registries */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#22D3EE] block">
                Primary Research & Methodological Sources
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs text-[#94A3B8]">
                <div>• International Labour Organization (ILO)</div>
                <div>• NBER / Stanford DEL (Brynjolfsson et al.)</div>
                <div>• Humlum & Meyer (Denmark NBER)</div>
                <div>• OECD Employment Outlook 2026</div>
                <div>• PwC AI Jobs Barometer 2026</div>
                <div>• World Economic Forum (WEF 2025)</div>
                <div>• International Monetary Fund (IMF)</div>
                <div>• World Bank WDR 2026</div>
                <div>• US Bureau of Labor Statistics (BLS)</div>
                <div>• O*NET Cognitive Taxonomy</div>
              </div>
            </div>

            <div className="text-[11px] text-[#94A3B8] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#1E2633]">
              <span>© 2026 The Work Observatory. Built strictly for empirical education.</span>
              <span>All claims cited with direct external URLs, methodologies, and limitations.</span>
            </div>
          </div>
        </footer>

        {/* EVIDENCE PEEL DRAWER & METHODOLOGY MODAL */}
        <EvidenceDrawer
          isOpen={evidenceDrawerOpen}
          onClose={() => setEvidenceDrawerOpen(false)}
          selectedId={selectedClaimId}
          onSelectId={(id) => setSelectedClaimId(id)}
        />

        <MethodologyModal
          isOpen={methodologyModalOpen}
          onClose={() => setMethodologyModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
