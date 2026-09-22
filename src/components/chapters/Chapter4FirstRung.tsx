import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { ArrowUpRight, AlertCircle, ShieldAlert, Sparkles, User, Briefcase, ChevronRight, Eye } from 'lucide-react';

interface Chapter4FirstRungProps {
  onOpenEvidence: (id: string) => void;
}

export const Chapter4FirstRung: React.FC<Chapter4FirstRungProps> = ({ onOpenEvidence }) => {
  const [caveatRevealed, setCaveatRevealed] = useState(false);
  const [ladderStep, setLadderStep] = useState<'traditional' | 'ai_disrupted'>('traditional');

  return (
    <section id="04_first_rung" className="py-20 border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              Chapter 04
            </span>
            <span className="text-xs font-medium text-stone-500">The Human Apprenticeship Paradox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            THE MISSING FIRST RUNG: The Apprenticeship Paradox
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-serif italic max-w-3xl">
            If artificial intelligence can perform beginner-level cognitive tasks in seconds, how does the next generation build the intuitive judgement required to become seasoned experts?
          </p>
        </div>

        {/* The Career Ladder Interactive Comparison */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h3 className="text-xl font-bold text-stone-900">
                The Career Ladder: Traditional vs AI-Mediated
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Toggle the ladder to visualize how early-career skill acquisition is being structurally re-engineered
              </p>
            </div>

            {/* Toggle Ladder Mode */}
            <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-1 text-xs">
              <button
                id="ladder-toggle-traditional"
                onClick={() => setLadderStep('traditional')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  ladderStep === 'traditional'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                The Traditional Ramp
              </button>
              <button
                id="ladder-toggle-disrupted"
                onClick={() => setLadderStep('ai_disrupted')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  ladderStep === 'ai_disrupted'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                The Missing First Rung
              </button>
            </div>
          </div>

          {/* Stepped Ladder Visualization */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Rung 1 */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                ladderStep === 'ai_disrupted'
                  ? 'bg-rose-50/50 border-rose-300 border-dashed'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-stone-500">Rung 01</span>
                {ladderStep === 'ai_disrupted' ? (
                  <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-100 px-1.5 py-0.5 rounded">
                    Abstracted by AI
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-stone-600 uppercase bg-stone-200 px-1.5 py-0.5 rounded">
                    Apprenticeship
                  </span>
                )}
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">
                Routine Execution
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {ladderStep === 'traditional'
                  ? 'Drafting basic memos, writing unit test boilerplate, reconciling data. High repetitive volume teaches mechanics.'
                  : 'LLMs generate first drafts, summaries, and boilerplate instantaneously. The beginner’s sandbox is removed.'}
              </p>
            </div>

            {/* Rung 2 */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-stone-500">Rung 02</span>
                <span className="text-[10px] font-bold text-stone-600 uppercase bg-stone-200 px-1.5 py-0.5 rounded">
                  Feedback Loop
                </span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">
                Critique & Redlines
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Senior mentors reviewing junior work. Corrections reveal organizational taste, edge cases, and tacit standards.
              </p>
            </div>

            {/* Rung 3 */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-stone-500">Rung 03</span>
                <span className="text-[10px] font-bold text-stone-600 uppercase bg-stone-200 px-1.5 py-0.5 rounded">
                  Pattern Mastery
                </span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">
                Intuitive Patterning
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                After thousands of routine hours, the practitioner develops instinct—recognizing anomalies and system fragility.
              </p>
            </div>

            {/* Rung 4 */}
            <div className="p-4 rounded-xl border-2 border-stone-800 bg-stone-900 text-white space-y-1 shadow-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-stone-400">Rung 04</span>
                <span className="text-[10px] font-bold text-amber-300 uppercase bg-stone-800 px-1.5 py-0.5 rounded">
                  Judgement
                </span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">
                Senior Judgement & Taste
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {ladderStep === 'traditional'
                  ? 'Strategic decisions, legal sign-offs, and client diplomacy earned through years on Rungs 1–3.'
                  : 'Junior candidates are now expected to have Rung 4 judgement on Day 1, with zero patience for learning curves.'}
              </p>
            </div>
          </div>
        </div>

        {/* Evidence Grid: PwC 7x Seniorization vs Stanford 19% Gap vs OECD Caveat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* PwC 7x Seniorization Card (C009) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                PwC 2026 Job Barometer
              </span>
              <EvidenceBadge id="C009" onClick={onOpenEvidence} />
            </div>

            <h4 className="text-lg font-bold text-stone-900">
              Entry-Level Roles Demand Senior Skills
            </h4>

            <div className="text-4xl font-mono font-extrabold text-stone-900 flex items-baseline gap-1">
              7×
              <span className="text-sm font-sans font-medium text-stone-600">more likely</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              In an analysis of 2.4 million US entry-level job ads, the most AI-exposed roles were <strong>seven times more likely</strong> to demand traditionally senior competencies like strategic judgement, conflict resolution, and leadership.
            </p>
          </div>

          {/* Dataset Seniority Skew (D005) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                Dataset Seniority Profile
              </span>
              <EvidenceBadge id="D005" onClick={onOpenEvidence} />
            </div>

            <h4 className="text-lg font-bold text-stone-900">
              Where Are The Junior AI Roles?
            </h4>

            <div className="flex items-center gap-6 font-mono pt-1">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 block">5.5%</span>
                <span className="text-[11px] font-sans text-stone-500 font-semibold">Entry-Level</span>
              </div>
              <div className="text-stone-300 font-light text-2xl">/</div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 block">63.2%</span>
                <span className="text-[11px] font-sans text-stone-500 font-semibold">Senior-Level</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Within the classified AI/ML roles in our 71,913 dataset, only 5.5% of listings are designated for entry-level talent, whereas senior roles constitute the overwhelming majority.
            </p>
          </div>
        </div>

        {/* The Inseparable Pair: Stanford 19% Gap + Mandatory OECD Warning */}
        <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h4 className="text-lg font-bold text-stone-900">
                The Early-Career Warning Signal & Scientific Caveat
              </h4>
            </div>
            <div className="flex items-center gap-1.5">
              <EvidenceBadge id="C010" onClick={onOpenEvidence} />
              <EvidenceBadge id="C011" onClick={onOpenEvidence} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stanford Finding */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Stanford Digital Economy Lab (Aug 2026)
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-stone-900 flex items-baseline gap-1.5">
                -19%
                <span className="text-xs font-sans font-medium text-stone-600">relative employment gap</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Using ADP high-frequency administrative payroll records covering millions of US workers through June 2026, researchers found that employment of workers aged 22–25 in highly AI-exposed occupations fell <strong>19% behind</strong> where it would have been if it had matched less-exposed occupations.
              </p>
            </div>

            {/* Mandatory OECD Caveat (C011) */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  OECD Factual Warning (Inseparable)
                </span>
                {!caveatRevealed && (
                  <button
                    id="reveal-oecd-caveat-btn"
                    onClick={() => setCaveatRevealed(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    Inspect Warning
                  </button>
                )}
              </div>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                The OECD warns that <strong>broad youth labor-market stagnation began well before the launch of modern LLMs</strong>. Researchers do not establish AI as the sole causal driver; macroeconomic cooling, hiring freezes in tech, and shifts in credentialing are major concurrent forces.
              </p>
              {caveatRevealed && (
                <div className="p-2.5 bg-white rounded border border-amber-200 text-[11px] text-stone-700 space-y-1">
                  <span className="font-bold text-stone-900 block">Editorial Guardrail:</span>
                  <p>
                    Never report the 19% Stanford payroll gap as "AI destroyed 19% of youth jobs." Always present it alongside the OECD caveat.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chapter Transition */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-serif italic text-stone-700">
            <strong>Key Transition:</strong> If routine tasks are cheap, what constitutes durable human capability in this new landscape?
          </p>
          <a
            href="#05_new_advantage"
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Explore Chapter 05: The New Advantage →
          </a>
        </div>
      </div>
    </section>
  );
};
