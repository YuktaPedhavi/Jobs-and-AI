import React from 'react';
import { BookOpen, Database, Compass, Layers } from 'lucide-react';

interface NavigationProps {
  activeChapter: string;
  onSelectChapter: (id: string) => void;
  onOpenEvidence: () => void;
  onOpenMethodology: () => void;
}

export const chapters = [
  { id: '01_fear', num: '01', title: 'The Fear', shortTitle: 'Fear & Exposure' },
  { id: '02_boost', num: '02', title: 'The Boost', shortTitle: 'Productivity Boost' },
  { id: '03_value_gap', num: '03', title: 'The Value Gap', shortTitle: 'The Value Gap' },
  { id: '04_first_rung', num: '04', title: 'The Missing Rung', shortTitle: 'Missing First Rung' },
  { id: '05_new_advantage', num: '05', title: 'The New Advantage', shortTitle: 'The Skill Stack' },
  { id: '06_who_gets_value', num: '06', title: 'Who Gets The Value?', shortTitle: 'Value Distribution' }
];

export const Navigation: React.FC<NavigationProps> = ({
  activeChapter,
  onSelectChapter,
  onOpenEvidence,
  onOpenMethodology
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif font-bold text-sm shadow-xs">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-stone-900 text-sm tracking-tight sm:text-base">
                  THE NEW VALUE OF WORK
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  Living Research Atlas
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden md:block">
                An empirical observatory across 271 occupations & 71,913 tech salary records
              </p>
            </div>
          </div>

          {/* Chapter Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  id={`nav-link-${ch.id}`}
                  onClick={() => onSelectChapter(ch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                    {ch.num}
                  </span>
                  <span>{ch.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              id="open-evidence-btn"
              onClick={onOpenEvidence}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors shadow-xs cursor-pointer"
              title="Open verified evidence claims database"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Evidence Drawer</span>
              <span className="sm:hidden">Evidence</span>
            </button>
            <button
              id="open-methodology-btn"
              onClick={onOpenMethodology}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors shadow-xs cursor-pointer"
              title="View auditable dataset parameters and regressions"
            >
              <Database className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Methodology</span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Chapter Scroller */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2 border-t border-stone-200/60 no-scrollbar">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span className="font-mono text-[9px] opacity-75">{ch.num}</span>
                <span>{ch.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
