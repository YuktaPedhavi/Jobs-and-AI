import React, { useState, useEffect } from 'react';
import { Workline, CHAPTER_LIST } from './components/Workline';
import { OccupationToken } from './components/OccupationToken';
import { OccupationConstellation } from './components/OccupationConstellation';
import { EditorialLandingHero } from './components/EditorialLandingHero';
import { Chapter1FourFutures } from './components/chapters/Chapter1FourFutures';
import { Chapter2CognitiveReach } from './components/chapters/Chapter2CognitiveReach';
import { Chapter4PossibleVsActual } from './components/chapters/Chapter4PossibleVsActual';
import { Chapter6FasterThenWhat } from './components/chapters/Chapter6FasterThenWhat';
import { Chapter7CareerLadder } from './components/chapters/Chapter7CareerLadder';
import { Chapter9IndiaLens } from './components/chapters/Chapter9IndiaLens';
import { Chapter10YourProfession } from './components/chapters/Chapter10YourProfession';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { MethodologyModal } from './components/MethodologyModal';
import { occupations271, Occupation271 } from './data/occupations271';
import { ShieldCheck, Database } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';

const MainApp: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeChapter, setActiveChapter] = useState<string>('ch00_introduction');
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

  const handleOpenInLookup = (occ: Occupation271) => {
    setActiveOccupation(occ);
    handleSelectChapter('ch07_your_profession');
  };

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    amber: isDark ? '#f59e0b' : '#b45309',
    emerald: isDark ? '#10b981' : '#059669'
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-500"
      style={{
        backgroundColor: palette.canvasBg,
        color: palette.textMain
      }}
    >
      {/* Precision Custom Desktop Cursor */}
      <CustomCursor />

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
        onOpenInChapter10={handleOpenInLookup}
        onSelectAnother={() => handleSelectChapter('ch07_your_profession')}
      />

      {/* Main Container - Padded for left Desktop Workline */}
      <div className="md:pl-12 flex flex-col min-h-screen">
        {/* 00 · INTRODUCTION */}
        <EditorialLandingHero
          activeOccupation={activeOccupation}
          onSelectOccupation={setActiveOccupation}
          onOpenEvidence={handleOpenEvidence}
          onScrollToChapter1={() => handleSelectChapter('ch01_living_atlas')}
          onScrollToLookup={() => handleSelectChapter('ch07_your_profession')}
        />

        {/* 01 · EXPLORE THE LIVING ATLAS (271 OCCUPATIONS) */}
        <section
          id="ch01_living_atlas"
          className="scroll-mt-12 py-14 sm:py-20 border-b transition-colors duration-300"
          style={{
            backgroundColor: palette.canvasBg,
            borderColor: palette.border
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <OccupationConstellation
              activeOccupation={activeOccupation}
              onSelectOccupation={(occ) => {
                setActiveOccupation(occ);
              }}
              onExploreProfile={handleOpenInLookup}
              onNextSection={() => handleSelectChapter('ch02_exposure_growth')}
              onOpenMethodology={() => setMethodologyModalOpen(true)}
              initialMode="constellation"
            />
          </div>
        </section>

        {/* CONNECTED STORYTELLING CHAPTERS (02 – 07 + EXPLORE MORE) */}
        <main className="flex-1">
          {/* 02 · EXPOSURE VS. JOB GROWTH (+ expandable How Exposure Is Measured) */}
          <Chapter1FourFutures
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* 03 · UNDERSTANDING TASKS (RANKED TASK SPECTRUM) */}
          <Chapter2CognitiveReach
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* 04 · AI IN THE REAL WORKPLACE (REALITY FILTER + EVIDENCE + WORKDAY EXPLORER) */}
          <Chapter4PossibleVsActual onOpenEvidence={handleOpenEvidence} />

          {/* 05 · PRODUCTIVITY & ITS CONSEQUENCES (TASKS → FIRMS → WORKERS) */}
          <Chapter6FasterThenWhat onOpenEvidence={handleOpenEvidence} />

          {/* 06 · CAREERS & HUMAN SKILLS (CAREER LADDER + VALUE SHIFT) */}
          <Chapter7CareerLadder onOpenEvidence={handleOpenEvidence} />

          {/* 07 · EXPLORE YOUR PROFESSION (SEARCH, WORK TRANSFORMATION & COMPARE) */}
          <Chapter10YourProfession
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* + · EXPLORE MORE: INDIA PERSPECTIVE (SEPARATE REGIONAL DATA) */}
          <Chapter9IndiaLens onOpenEvidence={handleOpenEvidence} />
        </main>

        {/* EDITORIAL REPOSITORY FOOTER */}
        <footer
          className="py-16 border-t transition-colors duration-300"
          style={{
            backgroundColor: palette.canvasBg,
            borderColor: palette.border,
            color: palette.textMuted
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b"
              style={{ borderColor: palette.border }}
            >
              <div>
                <span
                  className="font-display font-extrabold text-xl tracking-tight block"
                  style={{ color: palette.textMain }}
                >
                  THE NEW VALUE OF WORK
                </span>
                <p className="text-xs mt-1 max-w-lg leading-relaxed font-sans" style={{ color: palette.textMuted }}>
                  An interactive research story synthesized from 271 U.S. occupation profiles, macroeconomic surveys, and verified field experiments. No synthetic quotes, no sponsored hype.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenEvidence()}
                  className="px-3.5 py-2 rounded-lg border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  style={{
                    backgroundColor: palette.surfaceBg,
                    borderColor: palette.border,
                    color: palette.textMain
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: palette.cyan }} />
                  <span>Evidence Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethodologyModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  style={{
                    backgroundColor: palette.surfaceBg,
                    borderColor: palette.border,
                    color: palette.textMain
                  }}
                >
                  <Database className="w-3.5 h-3.5" style={{ color: palette.cyan }} />
                  <span>Data Audit &amp; Methods</span>
                </button>
              </div>
            </div>

            {/* Sourced Research Registries */}
            <div className="space-y-3">
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-wider block"
                style={{ color: palette.cyan }}
              >
                Primary Research &amp; Methodological Sources
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
                <div>• International Labour Organization (ILO)</div>
                <div>• NBER / Stanford DEL (Brynjolfsson et al.)</div>
                <div>• Humlum &amp; Vestergaard (Denmark NBER)</div>
                <div>• OECD Employment Outlook 2026</div>
                <div>• PwC AI Jobs Barometer 2026</div>
                <div>• World Economic Forum (WEF 2025)</div>
                <div>• International Monetary Fund (IMF)</div>
                <div>• Deloitte–NASSCOM India AI Talent</div>
                <div>• U.S. Bureau of Labor Statistics (BLS)</div>
                <div>• O*NET Cognitive Taxonomy</div>
              </div>
            </div>

            <div
              className="text-[11px] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t"
              style={{ borderColor: palette.border }}
            >
              <span>© 2026 The New Value of Work. Built strictly for empirical education.</span>
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

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
