import React, { useState } from 'react';
import { experienceSalaries, roleFamilySalaries } from '../../data/researchData';
import { EvidenceBadge } from '../EvidenceBadge';
import { DollarSign, Scale, BarChart2, Filter, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface Chapter3ValueGapProps {
  onOpenEvidence: (id: string) => void;
  onOpenMethodology: () => void;
}

export const Chapter3ValueGap: React.FC<Chapter3ValueGapProps> = ({
  onOpenEvidence,
  onOpenMethodology
}) => {
  const [selectedRoleFamily, setSelectedRoleFamily] = useState<string>('all');
  const [selectedExpTier, setSelectedExpTier] = useState<string>('all');

  // Filter calculations
  const displayRoles = selectedRoleFamily === 'all'
    ? roleFamilySalaries
    : roleFamilySalaries.filter((r) => r.role_family === selectedRoleFamily);

  const displayExp = selectedExpTier === 'all'
    ? experienceSalaries
    : experienceSalaries.filter((e) => e.experience_level === selectedExpTier);

  return (
    <section id="03_value_gap" className="py-20 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              Chapter 03
            </span>
            <span className="text-xs font-medium text-stone-500">The Economic Contradiction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            THE VALUE GAP: Productivity ≠ Pay
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-serif italic max-w-3xl">
            More productive does not automatically mean better paid. Economic history proves that technology gains often accrue to employers, capital, or consumers before workers see higher compensation.
          </p>
        </div>

        {/* The Core Contradiction: Denmark vs PwC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Denmark Study */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                Administrative Payroll Reality
              </span>
              <EvidenceBadge id="C006" onClick={onOpenEvidence} />
            </div>

            <h3 className="text-xl font-bold text-stone-900 leading-snug">
              Denmark: No Measurable Wage Lift in 2 Years
            </h3>

            <div className="text-4xl font-mono font-extrabold text-stone-800 flex items-baseline gap-1.5">
              0.0%
              <span className="text-xs font-sans font-medium text-stone-500">average wage effect</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Evaluating nationwide chatbot adoption linked to administrative tax and payroll records in Denmark, researchers found <strong>no statistically significant average effect on wages or hours</strong> within two years, conclusively ruling out effects greater than 2%.
            </p>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
              <strong>Mechanism:</strong> Tasks were reorganized, but individual compensation remained anchored by collective bargaining agreements and broader labor market supply.
            </div>
          </div>

          {/* PwC Job Ad Barometer */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                Job Advertisement Appetite
              </span>
              <div className="flex gap-1">
                <EvidenceBadge id="C007" onClick={onOpenEvidence} />
                <EvidenceBadge id="C008" onClick={onOpenEvidence} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 leading-snug">
              PwC: 62% Wage Premium in AI Job Postings
            </h3>

            <div className="text-4xl font-mono font-extrabold text-sky-700 flex items-baseline gap-1.5">
              +62%
              <span className="text-xs font-sans font-medium text-stone-500">job-ad wage premium</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Across one billion job advertisements on six continents, roles requiring specialist AI skills carried an average 62% advertised wage premium, with AI-skill postings expanding by <strong>+69% vs +9%</strong> for the general market.
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 font-medium">
              <strong>Mandatory Guardrail (C007):</strong> This is an <em>observational job-advertisement premium</em>. It does NOT guarantee that learning prompt engineering will grant an existing employee a 62% raise.
            </div>
          </div>
        </div>

        {/* Interactive Salary Explorer */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-6">
          <div className="border-b border-stone-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-stone-900">
                  Interactive Salary Explorer
                </h3>
                <EvidenceBadge id="D001" onClick={onOpenEvidence} />
                <EvidenceBadge id="D002" onClick={onOpenEvidence} />
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Empirical dataset of <strong>71,913 tech & data compensation records</strong> (Overall Median: $138,750)
              </p>
            </div>

            {/* Link to Regression Controls */}
            <button
              onClick={onOpenMethodology}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Scale className="w-3.5 h-3.5 text-indigo-700" />
              <span>Inspect Adjusted Model (+9.6%)</span>
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                <Filter className="w-3 h-3 text-stone-500" />
                Filter by Role Family
              </label>
              <select
                id="salary-role-filter"
                value={selectedRoleFamily}
                onChange={(e) => setSelectedRoleFamily(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              >
                <option value="all">All Role Families (Curated)</option>
                {roleFamilySalaries.map((r) => (
                  <option key={r.role_family} value={r.role_family}>
                    {r.role_family} (n={r.count.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                <BarChart2 className="w-3 h-3 text-stone-500" />
                Filter by Seniority Level
              </label>
              <select
                id="salary-exp-filter"
                value={selectedExpTier}
                onChange={(e) => setSelectedExpTier(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              >
                <option value="all">All Seniority Tiers</option>
                {experienceSalaries.map((e) => (
                  <option key={e.experience_level} value={e.experience_level}>
                    {e.experience_level_label} ({e.experience_level}) — n={e.count.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Experience Salary Ladder (Claim D003) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                The Experience Salary Ladder
                <EvidenceBadge id="D003" onClick={onOpenEvidence} />
              </span>
              <span className="text-[11px] text-stone-400">Interquartile Range (p25 to p75)</span>
            </div>

            <div className="space-y-3">
              {displayExp.map((exp) => {
                // Max scale is 260k
                const p25Pct = (exp.p25_usd / 260000) * 100;
                const p75Pct = (exp.p75_usd / 260000) * 100;
                const medPct = (exp.median_usd / 260000) * 100;

                return (
                  <div key={exp.experience_level} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{exp.experience_level_label}</span>
                        <span className="text-[11px] font-mono text-stone-500 bg-stone-200/70 px-1.5 py-0.2 rounded">
                          n = {exp.count.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-stone-500 text-[11px]">IQR: ${Math.round(exp.p25_usd / 1000)}k – ${Math.round(exp.p75_usd / 1000)}k</span>
                        <span className="font-bold text-stone-900 text-sm">Median: ${exp.median_usd.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Horizontal Range Marker */}
                    <div className="h-4 w-full bg-stone-200/80 rounded-full relative flex items-center">
                      {/* IQR span */}
                      <div
                        className="h-full bg-sky-200 rounded-full absolute"
                        style={{ left: `${p25Pct}%`, width: `${p75Pct - p25Pct}%` }}
                      />
                      {/* Median pin */}
                      <div
                        className="h-6 w-2 bg-sky-700 rounded-full absolute shadow-sm -top-1"
                        style={{ left: `${medPct}%` }}
                        title={`Median: $${exp.median_usd.toLocaleString()}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Role Family Salary Breakdown */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Salary Baselines by Specialized Tech Role Family
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayRoles.map((role) => (
                <div
                  key={role.role_family}
                  className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-sky-300 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{role.role_family}</span>
                    <span className="text-[10px] text-stone-400 font-mono">n={role.count}</span>
                  </div>
                  <div className="text-xl font-mono font-extrabold text-stone-800">
                    ${role.median_usd.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-stone-500 flex justify-between font-mono">
                    <span>25th: ${Math.round(role.p25_usd / 1000)}k</span>
                    <span>75th: ${Math.round(role.p75_usd / 1000)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controlled Model Card (Claim D004) */}
          <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-700" />
                The Adjusted AI Association (+9.6%)
                <EvidenceBadge id="D004" onClick={onOpenEvidence} />
              </span>
              <span className="font-mono text-xs text-indigo-700 font-bold">n = 39,808 controlled</span>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">
              When researchers conditioned on experience, year, country, remote mode, and company size, AI/ML roles were associated with about <strong>+9.6% higher compensation</strong> than traditional software roles.
            </p>
            <p className="text-[11px] text-indigo-900 font-medium">
              <strong>Crucial Distinction:</strong> This +9.6% is an <em>observational association</em>, not proven causation. Top-tier tech firms pay more regardless, and engineers with deep mathematical backgrounds naturally cluster in these titles.
            </p>
          </div>
        </div>

        {/* Chapter Transition */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-serif italic text-stone-700">
            <strong>Key Transition:</strong> If senior expertise commands the premium, what happens to junior workers trying to build that expertise?
          </p>
          <a
            href="#04_first_rung"
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Explore Chapter 04: The Missing First Rung →
          </a>
        </div>
      </div>
    </section>
  );
};
