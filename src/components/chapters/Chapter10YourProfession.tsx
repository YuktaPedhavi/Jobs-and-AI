import React, { useState, useMemo } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { EvidenceBadge } from '../EvidenceBadge';
import {
  Search,
  ArrowUpDown,
  Filter,
  ChevronRight,
  Check,
  Sparkles,
  Scale,
  Info,
  Heart,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Briefcase
} from 'lucide-react';

interface Chapter10Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

// Helper to provide grounded, constructive guidance for any occupation
function getEmpoweringGuidance(occ: Occupation271) {
  const exp = occ.ai_exposure_llm_human;
  const strength = occ.distinctive_cognitive_strength.toLowerCase();

  let aiHelps: string[] = [];
  let humanCore: string[] = [];
  let nextSkill: { title: string; desc: string };

  if (exp >= 0.55) {
    aiHelps = [
      'Automated first-pass drafting of memos, reports, and code',
      'Instant research summarization across large document libraries',
      'Routine classification, data cleaning, and spreadsheet formulas'
    ];
  } else if (exp >= 0.3) {
    aiHelps = [
      'Lesson or meeting preparation and reference asset generation',
      'Administrative scheduling and voice-transcription notes',
      'Visual asset variations and formatting templates'
    ];
  } else {
    aiHelps = [
      'Route optimization and inventory monitoring alerts',
      'Ambient voice logging of service encounters and equipment stats',
      'Basic compliance checklists and automated maintenance reminders'
    ];
  }

  if (strength.includes('verbal') || strength.includes('comprehension')) {
    humanCore = [
      'High-stakes client negotiation and empathetic crisis calming',
      'Contextual nuance and reading between the lines in human teams',
      'Defending strategic arguments and moral responsibility'
    ];
    nextSkill = {
      title: 'Problem Framing & Strategic Steering',
      desc: 'Learn to decompose ambiguous organizational challenges into precise, structured prompt architectures.'
    };
  } else if (strength.includes('reasoning') || strength.includes('deductive') || strength.includes('inductive')) {
    humanCore = [
      'Rigorous verification and catching subtle 5% errors in machine drafts',
      'Fiduciary accountability and signing professional legal stamps',
      'Balancing competing business constraints and technical trade-offs'
    ];
    nextSkill = {
      title: 'Verification & Automated Audit Pipelines',
      desc: 'Build workflows to cross-reference model outputs against verified databases and legal precedents.'
    };
  } else if (strength.includes('originality') || strength.includes('fluency')) {
    humanCore = [
      'Discerning aesthetic taste and cultural authenticity',
      'Curating the single compelling direction from 50 machine iterations',
      'Synthesizing lateral concepts outside internet training distributions'
    ];
    nextSkill = {
      title: 'Curatorial Direction & Cultural Taste',
      desc: 'Strengthen your editorial eye to rapidly filter and polish raw AI generations into signature brand assets.'
    };
  } else {
    humanCore = [
      'Direct hands-on physical adaptability in unpredictable real-world spaces',
      'Sensory-motor dexterity and instant tactile problem solving',
      'Interpersonal presence and building face-to-face team trust'
    ];
    nextSkill = {
      title: 'Digital Tool Integration & Workflow Automation',
      desc: 'Adopt mobile AI diagnostic and logging tools to eliminate manual administrative paperwork.'
    };
  }

  return { aiHelps, humanCore, nextSkill };
}

export const Chapter10YourProfession: React.FC<Chapter10Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareOccupation, setCompareOccupation] = useState<Occupation271>(
    occupations271.find((o) => o.soc_code === '29-1141') || occupations271[1] // Registered Nurses default
  );

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    occupations271.forEach((o) => set.add(o.job_category));
    return Array.from(set).sort();
  }, []);

  // Filtered occupations
  const filteredList = useMemo(() => {
    return occupations271.filter((occ) => {
      const matchesCategory = selectedCategory === 'all' || occ.job_category === selectedCategory;
      const matchesSearch =
        occ.occupation_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.soc_code.includes(searchQuery) ||
        occ.distinctive_cognitive_strength.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeGuidance = useMemo(() => getEmpoweringGuidance(activeOccupation), [activeOccupation]);
  const compareGuidance = useMemo(() => getEmpoweringGuidance(compareOccupation), [compareOccupation]);

  return (
    <article
      id="ch10_your_profession"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">08</span>
            <span>LOOK UP YOUR PROFESSION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EEF2F6] tracking-tight leading-tight">
            Find where your work sits in the atlas.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            Search across all 271 verified occupations. Explore empirical AI task exposure, projected job growth, what AI assists with, what remains human, and which skill to develop next.
          </p>
        </header>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#161C25] p-5 rounded-2xl border border-[#222B38] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[260px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 271 occupations (e.g. Teacher, Nurse, Designer, Accountant)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#0C1016] text-[#EEF2F6] rounded-xl border border-[#222B38] focus:outline-none focus:border-[#22D3EE] placeholder:text-[#94A3B8]"
              />
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2.5 px-3 text-xs bg-[#0C1016] text-[#EEF2F6] rounded-xl border border-[#222B38] focus:outline-none focus:border-[#22D3EE] cursor-pointer"
            >
              <option value="all">All Categories ({occupations271.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2.5 text-xs font-mono rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                compareMode
                  ? 'bg-[#22D3EE] text-[#0C1016] border-[#22D3EE] font-bold'
                  : 'bg-[#0C1016] text-[#EEF2F6] border-[#222B38] hover:border-[#38BDF8]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{compareMode ? 'Comparing 2 Jobs' : 'Compare 2 Jobs'}</span>
            </button>
          </div>

          {/* Quick Result Chips */}
          {searchQuery && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-[#94A3B8] mr-1">Matching:</span>
              {filteredList.slice(0, 8).map((occ) => (
                <button
                  key={occ.soc_code}
                  onClick={() => onSelectOccupation(occ)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans border transition-colors cursor-pointer ${
                    activeOccupation.soc_code === occ.soc_code
                      ? 'bg-[#22D3EE] text-[#0C1016] border-[#22D3EE] font-bold'
                      : 'bg-[#0C1016] text-[#EEF2F6] border-[#222B38] hover:border-[#38BDF8]'
                  }`}
                >
                  {occ.occupation_title}
                </button>
              ))}
              {filteredList.length > 8 && (
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  +{filteredList.length - 8} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* OCCUPATIONAL DOSSIER CARDS (Single or Side-by-Side Compare) */}
        <div className={`grid gap-6 ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Card A: Active Occupation */}
          <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#222B38] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#22D3EE]">
                    {activeOccupation.job_category}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0C1016] border border-[#222B38] text-[#94A3B8]">
                    SOC {activeOccupation.soc_code}
                  </span>
                  {compareMode && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22D3EE] text-[#0C1016] font-bold">
                      Job A
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6] mt-1">
                  {activeOccupation.occupation_title}
                </h3>
                <span className="text-xs text-[#94A3B8] mt-0.5 block">
                  Education Required: <strong className="text-[#EEF2F6]">{activeOccupation.education_required}</strong>
                </span>
              </div>
            </div>

            {/* Core Metrics: Exposure, Growth, Wage, Employment */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                <span className="text-[10px] text-[#94A3B8] block uppercase">AI Exposure</span>
                <span className="text-2xl font-bold text-[#22D3EE]">
                  {(activeOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-[#94A3B8] block capitalize">
                  {activeOccupation.ai_exposure_level} tier
                </span>
              </div>

              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                <span className="text-[10px] text-[#94A3B8] block uppercase">10-Yr US Growth</span>
                <span
                  className={`text-2xl font-bold ${
                    activeOccupation.projected_growth_pct_2024_2034 >= 3.1
                      ? 'text-[#10B981]'
                      : activeOccupation.projected_growth_pct_2024_2034 >= 0
                      ? 'text-[#EEF2F6]'
                      : 'text-[#F43F5E]'
                  }`}
                >
                  {activeOccupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                  {activeOccupation.projected_growth_pct_2024_2034}%
                </span>
                <span className="text-[10px] text-[#94A3B8] block truncate">
                  {activeOccupation.growth_outlook}
                </span>
              </div>

              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                <span className="text-[10px] text-[#94A3B8] block uppercase">Typical Pay</span>
                <span className="text-2xl font-bold text-[#EEF2F6]">
                  ${activeOccupation.median_annual_wage_usd.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#94A3B8] block">per year (BLS)</span>
              </div>

              <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                <span className="text-[10px] text-[#94A3B8] block uppercase">US Employment</span>
                <span className="text-2xl font-bold text-[#EEF2F6]">
                  {activeOccupation.employment_2024.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#94A3B8] block">workers in 2024</span>
              </div>
            </div>

            {/* What AI Can Help With */}
            <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38] space-y-2.5">
              <span className="text-xs font-mono uppercase text-[#38BDF8] flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> What AI Can Help With in This Job
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#94A3B8]">
                {activeGuidance.aiHelps.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#38BDF8] font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Remains Distinctly Human */}
            <div className="p-4 bg-[#0C1016] rounded-xl border border-[#F97316]/40 space-y-2.5">
              <span className="text-xs font-mono uppercase text-[#F97316] flex items-center gap-1.5 font-semibold">
                <Heart className="w-3.5 h-3.5" /> What Remains Distinctly Human
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#EEF2F6]">
                {activeGuidance.humanCore.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F97316] font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Skill to Develop Next */}
            <div className="p-4 bg-[#0C1016] rounded-xl border border-[#22D3EE]/30 space-y-2">
              <span className="text-xs font-mono uppercase text-[#22D3EE] flex items-center gap-1.5 font-semibold">
                <Lightbulb className="w-3.5 h-3.5" /> What Skill to Develop Next
              </span>
              <h5 className="font-serif font-bold text-sm text-[#EEF2F6]">
                {activeGuidance.nextSkill.title}
              </h5>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {activeGuidance.nextSkill.desc}
              </p>
            </div>
          </div>

          {/* Card B: Comparison Occupation (If Active) */}
          {compareMode && (
            <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] shadow-2xl space-y-6 animate-in fade-in duration-200">
              {/* Header with selector */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#222B38] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#F59E0B]">
                      {compareOccupation.job_category}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0C1016] border border-[#222B38] text-[#94A3B8]">
                      SOC {compareOccupation.soc_code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F59E0B] text-[#0C1016] font-bold">
                      Job B
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EEF2F6] mt-1">
                    {compareOccupation.occupation_title}
                  </h3>
                  <span className="text-xs text-[#94A3B8] mt-0.5 block">
                    Education Required: <strong className="text-[#EEF2F6]">{compareOccupation.education_required}</strong>
                  </span>
                </div>

                {/* Job B Selector */}
                <select
                  value={compareOccupation.soc_code}
                  onChange={(e) => {
                    const found = occupations271.find((o) => o.soc_code === e.target.value);
                    if (found) setCompareOccupation(found);
                  }}
                  className="py-1.5 px-2.5 text-xs bg-[#0C1016] border border-[#222B38] rounded-xl font-mono text-[#EEF2F6] cursor-pointer"
                >
                  {occupations271.map((o) => (
                    <option key={o.soc_code} value={o.soc_code}>
                      {o.occupation_title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">AI Exposure</span>
                  <span className="text-2xl font-bold text-[#F59E0B]">
                    {(compareOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-[#94A3B8] block capitalize">
                    {compareOccupation.ai_exposure_level} tier
                  </span>
                </div>

                <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">10-Yr US Growth</span>
                  <span
                    className={`text-2xl font-bold ${
                      compareOccupation.projected_growth_pct_2024_2034 >= 3.1
                        ? 'text-[#10B981]'
                        : compareOccupation.projected_growth_pct_2024_2034 >= 0
                        ? 'text-[#EEF2F6]'
                        : 'text-[#F43F5E]'
                    }`}
                  >
                    {compareOccupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                    {compareOccupation.projected_growth_pct_2024_2034}%
                  </span>
                  <span className="text-[10px] text-[#94A3B8] block truncate">
                    {compareOccupation.growth_outlook}
                  </span>
                </div>

                <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">Typical Pay</span>
                  <span className="text-2xl font-bold text-[#EEF2F6]">
                    ${compareOccupation.median_annual_wage_usd.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] block">per year (BLS)</span>
                </div>

                <div className="p-3 bg-[#0C1016] rounded-xl border border-[#222B38]">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">US Employment</span>
                  <span className="text-2xl font-bold text-[#EEF2F6]">
                    {compareOccupation.employment_2024.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] block">workers in 2024</span>
                </div>
              </div>

              {/* What AI Can Help With */}
              <div className="p-4 bg-[#0C1016] rounded-xl border border-[#222B38] space-y-2.5">
                <span className="text-xs font-mono uppercase text-[#38BDF8] flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> What AI Can Help With in This Job
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#94A3B8]">
                  {compareGuidance.aiHelps.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#38BDF8] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Remains Distinctly Human */}
              <div className="p-4 bg-[#0C1016] rounded-xl border border-[#F97316]/40 space-y-2.5">
                <span className="text-xs font-mono uppercase text-[#F97316] flex items-center gap-1.5 font-semibold">
                  <Heart className="w-3.5 h-3.5" /> What Remains Distinctly Human
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#EEF2F6]">
                  {compareGuidance.humanCore.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F97316] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Skill to Develop Next */}
              <div className="p-4 bg-[#0C1016] rounded-xl border border-[#22D3EE]/30 space-y-2">
                <span className="text-xs font-mono uppercase text-[#22D3EE] flex items-center gap-1.5 font-semibold">
                  <Lightbulb className="w-3.5 h-3.5" /> What Skill to Develop Next
                </span>
                <h5 className="font-serif font-bold text-sm text-[#EEF2F6]">
                  {compareGuidance.nextSkill.title}
                </h5>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {compareGuidance.nextSkill.desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
