import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { qualitativeThemes } from '../../data/researchData';
import { Check, ShieldCheck, Sparkles, Brain, FileCheck2, MessageSquare, AlertCircle, Users, Scale } from 'lucide-react';

interface Chapter5NewAdvantageProps {
  onOpenEvidence: (id: string) => void;
}

const skillLayers = [
  {
    id: 'layer_ai',
    title: '1. AI Capability & Tool Orchestration',
    shortTitle: 'AI Fluency',
    icon: Sparkles,
    color: 'border-sky-500 bg-sky-50/50 text-sky-800',
    description: 'Mastery over prompt phrasing, multi-modal chaining, API orchestration, and context injection.',
    insight: 'AI capability is the baseline multiplier, but it commoditizes rapidly as consumer interfaces become intuitive.'
  },
  {
    id: 'layer_domain',
    title: '2. Deep Domain Fundamentals',
    shortTitle: 'Domain Depth',
    icon: Brain,
    color: 'border-indigo-500 bg-indigo-50/50 text-indigo-800',
    description: 'First-principles understanding of accounting rules, legal doctrine, statistical distributions, or anatomy.',
    insight: 'Without deep domain knowledge, you cannot know what question to ask or recognize when a generated answer is subtly flawed.'
  },
  {
    id: 'layer_verification',
    title: '3. Judgement & Rigorous Verification',
    shortTitle: 'Verification',
    icon: FileCheck2,
    color: 'border-emerald-500 bg-emerald-50/50 text-emerald-800',
    description: 'Systematic auditing, cross-checking citations, catching hallucinations, and exercising discerning taste.',
    insight: 'In the ILO Poland focus groups (Q01/C020), senior practitioners identified verification as the primary differentiator of real professionals.'
  },
  {
    id: 'layer_communication',
    title: '4. Communication, Empathy & Context',
    shortTitle: 'Human Context',
    icon: MessageSquare,
    color: 'border-amber-500 bg-amber-50/50 text-amber-800',
    description: 'Translating ambiguous human needs into technical directives, managing client anxieties, and building consensus.',
    insight: 'AI can synthesize data, but cannot absorb political subtext, cultural sensitivities, or ethical compromises in a room.'
  },
  {
    id: 'layer_responsibility',
    title: '5. Fiduciary Responsibility & Accountability',
    shortTitle: 'Accountability',
    icon: Scale,
    color: 'border-stone-800 bg-stone-100 text-stone-900',
    description: 'Standing legally, professionally, and ethically behind the decision when millions of dollars or lives are at stake.',
    insight: 'An algorithm cannot be sued, barred from practicing, or sent to prison. Responsibility remains permanently human.'
  }
];

export const Chapter5NewAdvantage: React.FC<Chapter5NewAdvantageProps> = ({ onOpenEvidence }) => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer_verification');

  const activeLayer = skillLayers.find((l) => l.id === activeLayerId) || skillLayers[0];

  return (
    <section id="05_new_advantage" className="py-20 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
              Chapter 05
            </span>
            <span className="text-xs font-medium text-stone-500">The Human Complement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            THE NEW ADVANTAGE: From Production to Judgement
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-serif italic max-w-3xl">
            When routine drafting and syntax generation become zero-marginal-cost commodities, human value shifts decisively from production toward verification, domain depth, and accountability.
          </p>
        </div>

        {/* The Skill Stack Interactive Assembly */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="border-b border-stone-100 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  The Modern Capability Stack
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select each layer to inspect its empirical evidence and organizational implications
                </p>
              </div>
              <span className="text-xs text-stone-400 font-mono hidden sm:inline">5 Integrated Tiers</span>
            </div>

            {/* Layer Selection Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
              {skillLayers.map((layer) => {
                const isSelected = activeLayerId === layer.id;
                return (
                  <button
                    key={layer.id}
                    id={`skill-stack-chip-${layer.id}`}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <layer.icon className="w-3.5 h-3.5" />
                    <span>{layer.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Layer Detail Card */}
          <div className="p-6 rounded-2xl border-2 border-stone-200 bg-stone-50/70 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <activeLayer.icon className="w-5 h-5 text-indigo-700" />
                <h4 className="text-lg font-bold text-stone-900">{activeLayer.title}</h4>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                Core Human Asset
              </span>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed font-medium">
              {activeLayer.description}
            </p>

            <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 space-y-1">
              <span className="font-bold text-stone-900 block uppercase tracking-wider text-[10px]">
                Strategic Insight & Research Basis:
              </span>
              <p className="leading-relaxed text-stone-600">{activeLayer.insight}</p>
            </div>
          </div>
        </div>

        {/* Global Reskilling Stats: WEF 59 of 100 Unit Grid (C012, C013, C014) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-stone-900">
                  Global Reskilling Projections: 59 in Every 100 Workers
                </h4>
                <EvidenceBadge id="C012" onClick={onOpenEvidence} />
              </div>
              <p className="text-xs text-stone-500">World Economic Forum (WEF) Future of Jobs Report 2025</p>
            </div>
            <div className="flex gap-1.5">
              <EvidenceBadge id="C013" onClick={onOpenEvidence} />
              <EvidenceBadge id="C014" onClick={onOpenEvidence} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* 100 Unit Grid Visualization */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-stone-700">
                <span>The Global 100-Worker Grid</span>
                <span className="text-indigo-700 font-bold font-mono">59 Requiring Retraining</span>
              </div>
              <div className="grid grid-cols-10 gap-1 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                {Array.from({ length: 100 }).map((_, idx) => {
                  const isRetrained = idx < 59;
                  return (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-xs transition-colors ${
                        isRetrained ? 'bg-indigo-600' : 'bg-stone-200'
                      }`}
                      title={isRetrained ? 'Worker requiring core skill upgrade by 2030' : 'Stable skill baseline'}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-xs inline-block" /> 59 Need Retraining
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-stone-200 rounded-xs inline-block" /> 41 Baseline
                </span>
              </div>
            </div>

            {/* Metric 2: 63% Skill Gap Barrier */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Enterprise Transformation Barrier
              </span>
              <div className="text-3xl font-mono font-extrabold text-stone-900">
                63%
              </div>
              <p className="text-xs text-stone-600">
                of employers cite critical skill gaps as their single greatest impediment to business model evolution.
              </p>
            </div>

            {/* Metric 3: 77% Upskilling Intent */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Employer Upskilling Intent
              </span>
              <div className="text-3xl font-mono font-extrabold text-emerald-700">
                77%
              </div>
              <p className="text-xs text-stone-600">
                of surveyed enterprises plan to upskill incumbent staff rather than relying solely on external hiring.
              </p>
            </div>
          </div>
        </div>

        {/* Qualitative Themes: The ILO Poland Workplace Evidence (C019, C020, C021, C022) */}
        <div className="bg-stone-50/70 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <h4 className="text-base font-bold text-stone-900">
                Workplace Realities: Shadow AI, Governance Gaps & Employee Dialogue
              </h4>
              <p className="text-xs text-stone-500">
                Synthesized from ILO Poland nationwide surveys and qualitative practitioner fieldwork
              </p>
            </div>
            <div className="flex gap-1">
              <EvidenceBadge id="C019" onClick={onOpenEvidence} />
              <EvidenceBadge id="C021" onClick={onOpenEvidence} />
              <EvidenceBadge id="C022" onClick={onOpenEvidence} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Theme 1: Shadow Adoption */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">Shadow Adoption Dynamic</span>
                <span className="font-mono font-bold text-sky-700">16.7% vs 9.4%</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Formal employer rollouts stood at only <strong>9.4%</strong>, yet <strong>16.7%</strong> of staff reported using consumer AI tools weekly for work. Grassroots adoption systematically outpaces corporate governance.
              </p>
            </div>

            {/* Theme 2: Dialogue vs Resistance */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">The Consultation Factor</span>
                <span className="font-mono font-bold text-emerald-700">67% vs 41%</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Where AI was introduced through transparent consultation, <strong>two-thirds</strong> of staff welcomed deeper usage. Where introduced without dialogue, <strong>41%</strong> were firmly opposed.
              </p>
            </div>

            {/* Theme 3: Governance Vacuum */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">The Governance Vacuum</span>
                <span className="font-mono font-bold text-rose-700">Only 2.1% Clear Rules</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Over <strong>66%</strong> of employees received no company guidelines on workplace AI, and only <strong>2.1%</strong> reported clear boundaries on prohibited use, creating legal and hallucination risks.
              </p>
            </div>

            {/* Theme 4: The Verification Mindset */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">Verification as Professionalism</span>
                <EvidenceBadge id="C020" onClick={onOpenEvidence} />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                In practitioner focus groups, experienced users regarded checking AI outputs as an ordinary baseline hygiene task, whereas intermittent users feared skill atrophy.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter Transition */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-serif italic text-stone-700">
            <strong>Key Transition:</strong> If you become 30% faster and assemble this skill stack, where does the economic surplus actually flow?
          </p>
          <a
            href="#06_who_gets_value"
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Explore Chapter 06: Who Gets The Value? →
          </a>
        </div>
      </div>
    </section>
  );
};
