import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Share2, Download, Building2, ShoppingBag, Cpu, UserCheck, Globe, AlertTriangle, ArrowRight } from 'lucide-react';

interface Chapter6WhoGetsValueProps {
  onOpenEvidence: (id: string) => void;
  onOpenMethodology: () => void;
}

const valueDestinations = [
  {
    id: 'dest_corp',
    title: '1. Corporate Margins & Capital',
    icon: Building2,
    tag: 'Operational Leverage',
    summary: 'Higher throughput per headcount reduces operational cost curves, expanding EBITDA and shareholder equity.',
    mechanism: 'Firms capture productivity gains directly when wage contracts remain sticky while output scales.'
  },
  {
    id: 'dest_consumer',
    title: '2. Consumer Surplus & Price Deflation',
    icon: ShoppingBag,
    tag: 'Market Competition',
    summary: 'Competitive pressure forces service prices downward, passing savings to end users as free or cheaper services.',
    mechanism: 'In highly contestable markets, firms compete away margin advantages, creating massive consumer welfare gains.'
  },
  {
    id: 'dest_compute',
    title: '3. Compute & Model Tollbooths',
    icon: Cpu,
    tag: 'Capital Bottlenecks',
    summary: 'Cloud hyperscalers, silicon foundries, and foundation model labs capture subscription and token fees.',
    mechanism: 'Every automated task consumes inference compute and data infrastructure, shifting expenditure from payroll to tech OpEx.'
  },
  {
    id: 'dest_worker',
    title: '4. Worker Wages & Specialization',
    icon: UserCheck,
    tag: 'Scarce Complementarity',
    summary: 'Captured primarily by rare individuals who combine deep domain judgement with AI leverage.',
    mechanism: 'Routine tasks commoditize, so only unique institutional context, leadership, and verifiable expertise capture wage premiums.'
  }
];

export const Chapter6WhoGetsValue: React.FC<Chapter6WhoGetsValueProps> = ({
  onOpenEvidence,
  onOpenMethodology
}) => {
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeDest = valueDestinations[selectedDestination];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="06_who_gets_value" className="py-20 border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-stone-700 uppercase tracking-widest bg-stone-200 px-2.5 py-1 rounded border border-stone-300">
              Chapter 06
            </span>
            <span className="text-xs font-medium text-stone-500">The Final Synthesis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            WHO GETS THE VALUE? The Distribution of Surplus
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-serif italic max-w-3xl">
            A faster worker does not automatically become a richer worker. When artificial intelligence creates massive cognitive abundance, four distinct economic destinations compete for the resulting surplus.
          </p>
        </div>

        {/* The 4 Value Destinations Interactive Matrix */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="border-b border-stone-100 pb-5">
            <h3 className="text-xl font-bold text-stone-900">
              The Four Surplus Sinks
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Select an economic recipient to trace where productivity surpluses are currently flowing
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              {valueDestinations.map((dest, idx) => {
                const isSelected = selectedDestination === idx;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestination(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <dest.icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-600'}`} />
                    <div className="text-xs font-bold leading-tight">{dest.title}</div>
                    <span className={`text-[10px] font-mono block ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {dest.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Destination Detail */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <activeDest.icon className="w-5 h-5 text-stone-800" />
                {activeDest.title}
              </h4>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                {activeDest.tag}
              </span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed font-medium">
              {activeDest.summary}
            </p>
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-800 block">Economic Transmission Mechanism:</span>
              <p>{activeDest.mechanism}</p>
            </div>
          </div>
        </div>

        {/* The India Lens: IMF 2025 & NASSCOM Macro Data */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  The India Lens: Exposure, Scale & Transition
                </h3>
                <p className="text-xs text-stone-500">
                  Authoritative macroeconomic evidence from the International Monetary Fund (IMF) and NASSCOM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <EvidenceBadge id="C015" onClick={onOpenEvidence} />
              <EvidenceBadge id="C016" onClick={onOpenEvidence} />
              <EvidenceBadge id="C017" onClick={onOpenEvidence} />
            </div>
          </div>

          {/* IMF 2025 finding: 26% total exposure split */}
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-stone-800 items-center">
              <span>IMF 2025: Indian Workforce AI Exposure (26% Total)</span>
              <EvidenceBadge id="C015" onClick={onOpenEvidence} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* High Complementarity */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900">High Complementarity (Opportunity)</span>
                  <span className="font-mono text-sm font-extrabold text-emerald-700">14%</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Indian workers in knowledge and technology roles where AI tools act as productivity amplifiers, enabling domestic firms to bid on higher-value global contracts.
                </p>
              </div>

              {/* High Displacement Pressure */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900">High Displacement Risk (Pressure)</span>
                  <span className="font-mono text-sm font-extrabold text-amber-700">12%</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  Workers in routine business process outsourcing (BPO) and standardized documentation facing substitution pressure from automated customer interactions.
                </p>
              </div>
            </div>
          </div>

          {/* NASSCOM Sector Stats (C016, C017, C018) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Talent Pool Scale</span>
              <div className="text-2xl font-mono font-extrabold text-stone-900">1.25 Million+</div>
              <p className="text-[11px] text-stone-600">AI-ready tech professionals in India (NASSCOM 2026).</p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Talent Demand CAGR</span>
              <div className="text-2xl font-mono font-extrabold text-sky-700">25% – 35%</div>
              <p className="text-[11px] text-stone-600">Annual demand surge for specialist machine learning practitioners.</p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Workflow Integration</span>
              <div className="text-2xl font-mono font-extrabold text-stone-800">20% – 40%</div>
              <p className="text-[11px] text-stone-600">of tech services workflows now actively augmented by AI assistants.</p>
            </div>
          </div>

          {/* Dataset Geographic Limitation Banner (Claim D006) */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold">Dataset Limitation Enforced (D006):</span>
                <EvidenceBadge id="D006" onClick={onOpenEvidence} />
              </div>
              <p className="leading-relaxed">
                The primary dataset of 71,913 records is <strong>83.6% US-based and contains only 0.3% (229 records) for India</strong>. We strictly refuse to draw general conclusions about Indian salaries from our internal dataset, relying entirely on official IMF and NASSCOM studies for domestic claims.
              </p>
            </div>
          </div>
        </div>

        {/* Final Reflective Synthesis Card */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              The Bottom Line
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-snug">
              IF AI MAKES YOUR WORK MORE VALUABLE, WHO GETS THE VALUE?
            </h3>
            <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
              AI accelerates tasks, but markets reward scarcity. Speed alone is not scarce when anyone can prompt an LLM. What remains truly scarce is taste, accountability, deep domain verification, and the courage to take responsibility for ambiguous outcomes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-800">
            <button
              onClick={() => onOpenEvidence('C001')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs transition-colors cursor-pointer"
            >
              Browse Full Evidence Registry
            </button>
            <button
              onClick={onOpenMethodology}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Auditable Methodology & Code
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Research Observatory'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
