import React, { useState } from 'react';
import { curatedOccupations, calculatedKeyFindings } from '../../data/researchData';
import { EvidenceBadge } from '../EvidenceBadge';
import { Layers, ShieldCheck, CheckCircle2, Sparkles, UserCheck, AlertCircle } from 'lucide-react';

interface Chapter1FearProps {
  onOpenEvidence: (id: string) => void;
}

export const Chapter1Fear: React.FC<Chapter1FearProps> = ({ onOpenEvidence }) => {
  const [selectedOccupationIndex, setSelectedOccupationIndex] = useState(0);
  const [incomeView, setIncomeView] = useState<'global' | 'high_income' | 'low_income'>('global');

  const currentOccupation = curatedOccupations[selectedOccupationIndex];

  return (
    <section id="01_fear" className="py-20 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-sky-700 uppercase tracking-widest bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              Chapter 01
            </span>
            <span className="text-xs font-medium text-stone-500">The Mental Model Shift</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            THE FEAR: Exposure Is Not Replacement
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-serif italic max-w-3xl">
            “AI is coming for your job.” The binary headline treats work as a monolith. But a job is not a single task—it is a bundle of distinct capabilities.
          </p>
        </div>

        {/* Global Exposure Reality Cards (C001, C002, C003) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" />
                The Global Exposure Pyramid
              </h3>
              <p className="text-xs text-stone-500">
                Empirical estimates from the International Labour Organization (ILO)
              </p>
            </div>
            {/* Income tier toggle */}
            <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-1 text-xs">
              <button
                onClick={() => setIncomeView('global')}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  incomeView === 'global' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Global (25%)
              </button>
              <button
                onClick={() => setIncomeView('high_income')}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  incomeView === 'high_income' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                High-Income (34%)
              </button>
              <button
                onClick={() => setIncomeView('low_income')}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  incomeView === 'low_income' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Low-Income (11%)
              </button>
            </div>
          </div>

          {/* Visual Nested Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1.5">
                <span>Entire Global Workforce</span>
                <span>100% of employment (~3.5 billion workers)</span>
              </div>
              <div className="w-full h-8 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 relative flex items-center px-3">
                <span className="text-xs font-medium text-stone-500">Global Employment Baseline</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1.5 items-center">
                <span className="flex items-center gap-1.5">
                  Occupations with Some GenAI Exposure
                  <EvidenceBadge id="C001" onClick={onOpenEvidence} />
                  {incomeView !== 'global' && <EvidenceBadge id="C003" onClick={onOpenEvidence} />}
                </span>
                <span className="font-mono text-sky-700 font-bold text-sm">
                  {incomeView === 'global' ? '25.0%' : incomeView === 'high_income' ? '34.0%' : '11.0%'}
                </span>
              </div>
              <div className="w-full h-8 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex">
                <div
                  className="h-full bg-sky-500 transition-all duration-500 flex items-center px-3 text-white text-xs font-bold"
                  style={{
                    width: incomeView === 'global' ? '25%' : incomeView === 'high_income' ? '34%' : '11%'
                  }}
                >
                  {incomeView === 'global' ? '~1 in 4 workers' : incomeView === 'high_income' ? 'High-income economies' : 'Low-income economies'}
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Potential technological overlap with daily workflows. Crucially, exposure denotes tasks that can interact with AI, <strong>not jobs destined for elimination</strong>.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1.5 items-center">
                <span className="flex items-center gap-1.5">
                  Highest Exposure Category (ILO Top Tier)
                  <EvidenceBadge id="C002" onClick={onOpenEvidence} />
                </span>
                <span className="font-mono text-amber-700 font-bold text-sm">3.3%</span>
              </div>
              <div className="w-full h-8 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex">
                <div
                  className="h-full bg-amber-500 transition-all duration-500 flex items-center px-3 text-white text-xs font-bold whitespace-nowrap"
                  style={{ width: '3.3%', minWidth: '40px' }}
                >
                  3.3%
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Even within this top 3.3% band, tasks are predominantly augmented and transformed rather than dissolved.
              </p>
            </div>
          </div>

          {/* Factual Guardrail Note */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Factual Guardrail (ILO Guideline):</span>
              <span>
                Never equate "25% exposure" with "25% of jobs disappearing". Exposure measures task reachability. In practice, technology adoption faces organizational, regulatory, economic, and human adoption barriers.
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Task Decomposer */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="border-b border-stone-100 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  Interactive Task Decomposer
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select a knowledge profession to see how real-world responsibilities split across technological affordances
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                271 Occupations Dataset
              </span>
            </div>

            {/* Profession Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
              {curatedOccupations.map((occ, idx) => (
                <button
                  key={occ.soc_code}
                  id={`decomposer-tab-${occ.soc_code}`}
                  onClick={() => setSelectedOccupationIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedOccupationIndex === idx
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                >
                  {occ.occupation_title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Occupation Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <span className="text-stone-500 block uppercase tracking-wider font-semibold text-[10px]">
                Occupation Profile
              </span>
              <h4 className="text-base font-bold text-stone-900 leading-tight">
                {currentOccupation.occupation_title}
              </h4>
              <div className="space-y-1 text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold text-stone-800">{currentOccupation.job_category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Median Annual Wage:</span>
                  <span className="font-semibold text-stone-800 font-mono">
                    ${currentOccupation.median_annual_wage_usd.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>BLS 10-Yr Outlook:</span>
                  <span className={`font-semibold ${currentOccupation.projected_growth_pct_2024_2034 >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {currentOccupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}{currentOccupation.projected_growth_pct_2024_2034}% ({currentOccupation.growth_outlook})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>AI Exposure Index:</span>
                  <span className="font-bold text-sky-800 font-mono">
                    {(currentOccupation.ai_exposure_llm_human * 100).toFixed(0)}% ({currentOccupation.ai_exposure_level})
                  </span>
                </div>
              </div>
            </div>

            {/* Task Decomposition Breakdown */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-stone-500 block uppercase tracking-wider font-semibold text-[10px]">
                Deconstructed Task Spectrum (Conceptual Model)
              </span>

              {currentOccupation.tasks?.map((task, i) => {
                const badgeColor =
                  task.type === 'automatable'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : task.type === 'augmentable'
                    ? 'bg-sky-100 text-sky-800 border-sky-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300';

                const icon =
                  task.type === 'automatable' ? (
                    <Sparkles className="w-4 h-4 text-amber-700" />
                  ) : task.type === 'augmentable' ? (
                    <Layers className="w-4 h-4 text-sky-700" />
                  ) : (
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                  );

                const label =
                  task.type === 'automatable'
                    ? 'High Automation Potential'
                    : task.type === 'augmentable'
                    ? 'High Augmentation & Assistance'
                    : 'Human-Intensive Judgement';

                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {icon}
                        <h5 className="font-bold text-stone-900 text-xs sm:text-sm">{task.name}</h5>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badgeColor}`}>
                        {label}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed pl-6">
                      {task.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Macro Finding: Correlation between Exposure and Growth */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-1.5">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              Correlation r (Exposure vs Growth)
            </span>
            <div className="text-3xl font-mono font-extrabold text-stone-900">
              {calculatedKeyFindings.correlation_exposure_vs_projected_growth.toFixed(3)}
            </div>
            <p className="text-xs text-stone-600">
              Statistically zero linear relationship across 271 occupations. High exposure does NOT correlate with occupational contraction.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-1.5">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              High-Exposure Occupations Growing
            </span>
            <div className="text-3xl font-mono font-extrabold text-emerald-700">
              {calculatedKeyFindings.high_exposure_positive_growth_share_pct}%
            </div>
            <p className="text-xs text-stone-600">
              72 out of 90 high-exposure occupations are projected by the US BLS to expand in headcount through 2034.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-1.5">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              High-Exposure Projected to Decline
            </span>
            <div className="text-3xl font-mono font-extrabold text-amber-700">
              {calculatedKeyFindings.high_exposure_declining_share_pct}%
            </div>
            <p className="text-xs text-stone-600">
              Only 13 of 90 high-exposure occupations show projected declines, mostly driven by broader macroeconomic factors.
            </p>
          </div>
        </div>

        {/* Chapter Transition */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-serif italic text-stone-700">
            <strong>Key Transition:</strong> If a job is a bundle of tasks, and AI accelerates routine cognitive tasks, does that make each worker more productive?
          </p>
          <a
            href="#02_boost"
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Explore Chapter 02: The Boost →
          </a>
        </div>
      </div>
    </section>
  );
};
