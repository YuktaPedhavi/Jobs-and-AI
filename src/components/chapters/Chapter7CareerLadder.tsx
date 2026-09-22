import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import {
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  HelpCircle,
  Layers,
  CheckCircle2,
  Brain,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

interface Chapter7Props {
  onOpenEvidence: (id: string) => void;
}

interface CareerTier {
  id: string;
  tier: 'Junior' | 'Mid-level' | 'Senior';
  levelNumber: number;
  traditionalTasks: string[];
  aiShift: string;
  theDilemma: string;
  statusBadge: string;
  badgeColor: string;
  borderColor: string;
}

const CAREER_TIERS: CareerTier[] = [
  {
    id: 'senior',
    tier: 'Senior',
    levelNumber: 3,
    traditionalTasks: [
      'Strategic judgement & trade-offs',
      'Discerning taste & aesthetic direction',
      'High-stakes client relationships',
      'Legal & fiduciary liability (signing the audit)'
    ],
    aiShift: 'Amplified in leverage. Seniors use AI to produce output of entire teams.',
    theDilemma: 'Seniors possess the deep tacit knowledge needed to spot subtle AI bugs. But their expertise was forged over 10 years of doing grunt work.',
    statusBadge: 'Compounded Leverage',
    badgeColor: 'text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/30',
    borderColor: 'border-[#22D3EE]'
  },
  {
    id: 'mid',
    tier: 'Mid-level',
    levelNumber: 2,
    traditionalTasks: [
      'Cross-domain synthesis',
      'Structuring complex projects',
      'Direct client communication',
      'Reviewing and mentoring junior work'
    ],
    aiShift: 'Compressed from both sides. Expected to act like directors with zero junior buffer.',
    theDilemma: 'Mid-level professionals used to mentor juniors through redlines. Now they spend their time reviewing machine drafts in isolation.',
    statusBadge: 'Compressed Band',
    badgeColor: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
    borderColor: 'border-[#F59E0B]'
  },
  {
    id: 'junior',
    tier: 'Junior',
    levelNumber: 1,
    traditionalTasks: [
      'Initial research & summary memos',
      'Data cleaning & spreadsheet formatting',
      'Basic boilerplate code & test cases',
      'First-pass layout drafts & asset prep'
    ],
    aiShift: 'Automated by 60–80%. The exact tasks historically used to train new graduates.',
    theDilemma: 'When beginner tasks are automated, the entry gate vanishes. Job postings demand 3–5 years of senior judgement on day one.',
    statusBadge: 'The Missing Rung',
    badgeColor: 'text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/30',
    borderColor: 'border-[#F43F5E]'
  }
];

export const Chapter7CareerLadder: React.FC<Chapter7Props> = ({ onOpenEvidence }) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('junior');

  const activeTier = CAREER_TIERS.find((t) => t.id === selectedTierId) || CAREER_TIERS[2];

  return (
    <article
      id="ch07_career_ladder"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">06</span>
            <span>THE CAREER LADDER PROBLEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#EEF2F6] tracking-tight leading-tight">
            If junior tasks disappear, how do people learn to become senior?
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            AI automates the entry-level tasks people used to learn on: drafting, data cleaning, and basic boilerplate. Without those repetitions, how does an apprentice acquire senior judgement?
          </p>
        </header>

        {/* Empirical Evidence Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* PwC 2026 Analysis */}
          <div className="p-6 rounded-2xl bg-[#161C25] border border-[#222B38] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
                Hiring Market Signal
              </span>
              <EvidenceBadge id="C013" onClick={onOpenEvidence} labelOverride="PwC 2026 · Role Requirements" />
            </div>
            <h3 className="text-xl font-display font-extrabold tracking-tight text-[#EEF2F6]">
              7× Senior Skill Requirement in Entry Roles
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Analysis of millions of job openings demonstrates that entry-level positions in AI-exposed industries are now <strong className="text-[#EEF2F6]">7 times more likely</strong> to demand senior capabilities—such as client advisory and independent risk evaluation—on day one.
            </p>
          </div>

          {/* Stanford / ADP Payroll Study */}
          <div className="p-6 rounded-2xl bg-[#161C25] border border-[#222B38] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#F43F5E] uppercase tracking-wider">
                Payroll Microdata
              </span>
              <EvidenceBadge id="C014" onClick={onOpenEvidence} labelOverride="Stanford · ADP Youth Employment" />
            </div>
            <h3 className="text-xl font-display font-extrabold tracking-tight text-[#EEF2F6]">
              -19% Drop in Young Worker Hiring
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Stanford analysis of ADP payroll data found that workers aged 22–25 in high AI-exposure white-collar roles experienced a <strong className="text-[#EEF2F6]">19% relative contraction</strong> in employment compared to peers in non-exposed professions.
            </p>
          </div>
        </div>

        {/* Visual Career Ladder Interactive Diagram */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222B38] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE]">
                The Three-Tier Apprenticeship Breakdown
              </span>
              <h3 className="text-xl font-display font-extrabold tracking-tight text-[#EEF2F6] mt-0.5">
                The Disappearing First Rung
              </h3>
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">Select a rung to inspect</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* The Visual Ladder Column */}
            <div className="lg:col-span-6 space-y-3">
              {CAREER_TIERS.map((tier) => {
                const isSelected = selectedTierId === tier.id;

                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? `bg-[#0C1016] ${tier.borderColor} ring-2 ring-offset-2 ring-offset-[#161C25] shadow-2xl`
                        : 'bg-[#0C1016]/60 border-[#222B38] hover:border-[#38BDF8] hover:bg-[#0C1016]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#94A3B8]">
                          L0{tier.levelNumber}
                        </span>
                        <h4 className="text-xl font-serif font-bold text-[#EEF2F6]">
                          {tier.tier}
                        </h4>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${tier.badgeColor}`}
                      >
                        {tier.statusBadge}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tier.traditionalTasks.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#161C25] border border-[#222B38] text-[11px] text-[#94A3B8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tier Deep Dive Card */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0C1016] border border-[#222B38] space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#22D3EE] font-semibold">
                  Tier Analysis
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#EEF2F6]">
                  {activeTier.tier} Level
                </h4>
                <p className="text-xs font-mono text-[#94A3B8]">{activeTier.aiShift}</p>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-[#94A3B8] block">
                  Tasks traditionally performed at this level:
                </span>
                <ul className="space-y-1.5">
                  {activeTier.traditionalTasks.map((task, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#EEF2F6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Provocative Dilemma Box */}
              <div className="p-4 rounded-xl bg-[#161C25] border border-[#222B38] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#F43F5E] font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Apprenticeship Paradox</span>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {activeTier.theDilemma}
                </p>
              </div>
            </div>
          </div>

          {/* Provocative Thought Anchor */}
          <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <span className="text-xs font-sans italic text-[#EEF2F6]">
                “A junior lawyer who never drafted a standard NDA will never know why a sentence is missing. Experience cannot be downloaded; it must be lived through repetition.”
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#22D3EE]">
              The Apprenticeship Gap
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
