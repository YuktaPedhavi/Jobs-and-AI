import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { TrendingUp, Users, Clock, AlertCircle, ArrowRight, Gauge, CheckCircle } from 'lucide-react';

interface Chapter2BoostProps {
  onOpenEvidence: (id: string) => void;
}

export const Chapter2Boost: React.FC<Chapter2BoostProps> = ({ onOpenEvidence }) => {
  const [lensMode, setLensMode] = useState<'novice_vs_expert' | 'average'>('novice_vs_expert');

  return (
    <section id="02_boost" className="py-20 border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Chapter 02
            </span>
            <span className="text-xs font-medium text-stone-500">The Productivity Mechanism</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            THE BOOST: Productivity Rises Unevenly
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 font-serif italic max-w-3xl">
            When generative AI enters the workplace, measurable productivity gains emerge. But the boost does not lift everyone equally—it acts as an equalizer, lifting novices dramatically while offering modest gains to veterans.
          </p>
        </div>

        {/* The Productivity Lens Interactive Panel */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-stone-900">
                  The Productivity Lens
                </h3>
                <EvidenceBadge id="C004" onClick={onOpenEvidence} />
                <EvidenceBadge id="C005" onClick={onOpenEvidence} />
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Field experiment across <strong>5,179 enterprise customer-support agents</strong> (NBER / QJE study)
              </p>
            </div>

            {/* Toggle Lens */}
            <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-1 text-xs">
              <button
                id="lens-toggle-novice"
                onClick={() => setLensMode('novice_vs_expert')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  lensMode === 'novice_vs_expert'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Novice vs Expert (+34% vs ~1%)
              </button>
              <button
                id="lens-toggle-avg"
                onClick={() => setLensMode('average')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  lensMode === 'average'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Overall Average (+14%)
              </button>
            </div>
          </div>

          {/* Interactive Visual Comparison */}
          {lensMode === 'novice_vs_expert' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Novice / Low-Skilled Card */}
                <div className="p-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Novice & Lower-Skilled Workers
                    </span>
                    <span className="font-mono text-xs text-emerald-700 font-semibold">Subgroup n ≈ 2,500</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-800 flex items-baseline gap-1">
                      +34%
                      <span className="text-sm font-sans font-medium text-emerald-700">productivity gain</span>
                    </div>
                    <p className="text-xs text-emerald-950 font-medium">
                      Measured as customer resolutions per hour and customer satisfaction.
                    </p>
                  </div>

                  {/* Visual Bar */}
                  <div className="space-y-1 pt-2">
                    <div className="text-[11px] font-semibold text-emerald-800 flex justify-between">
                      <span>Baseline Output</span>
                      <span>Output with Generative AI Assistance</span>
                    </div>
                    <div className="h-6 w-full bg-emerald-200/50 rounded-lg overflow-hidden flex">
                      <div className="h-full bg-emerald-600 rounded-lg flex items-center justify-end px-2 text-[10px] text-white font-bold" style={{ width: '100%' }}>
                        134% of Baseline
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed pt-2 border-t border-emerald-200/60">
                    <strong>Why the huge leap?</strong> The AI tool disseminates the tacit knowledge, best answers, and conversational patterns of the firm's top performers down to beginners in real time.
                  </p>
                </div>

                {/* Experienced / High-Skilled Card */}
                <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-200 px-2.5 py-0.5 rounded-full border border-stone-300">
                      Experienced & Veteran Workers
                    </span>
                    <span className="font-mono text-xs text-stone-500 font-semibold">Subgroup n ≈ 2,600</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl sm:text-5xl font-mono font-extrabold text-stone-700 flex items-baseline gap-1">
                      ~0% to +3%
                      <span className="text-sm font-sans font-medium text-stone-500">minimal impact</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Little to no measurable throughput acceleration detected.
                    </p>
                  </div>

                  {/* Visual Bar */}
                  <div className="space-y-1 pt-2">
                    <div className="text-[11px] font-semibold text-stone-600 flex justify-between">
                      <span>Baseline Output</span>
                      <span>Output with Generative AI</span>
                    </div>
                    <div className="h-6 w-full bg-stone-200 rounded-lg overflow-hidden flex">
                      <div className="h-full bg-stone-500 rounded-lg flex items-center justify-end px-2 text-[10px] text-white font-bold" style={{ width: '76%' }}>
                        101% of Baseline
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-200">
                    <strong>Why the flatline?</strong> High-skill workers already knew the best solutions. The AI suggestions often mirrored what they would have said anyway, occasionally adding distraction.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-stone-200 bg-stone-50 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                  Full Workforce Aggregate (n = 5,179)
                </span>
                <span className="font-mono text-xs text-stone-500">All Experience Tiers Combined</span>
              </div>
              <div className="text-5xl font-mono font-extrabold text-stone-900 flex items-baseline gap-2">
                +14%
                <span className="text-base font-sans font-medium text-stone-600">Average Resolutions per Hour</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
                When researchers evaluated all 5,179 customer support agents, overall productivity rose by an average of 14%. However, presenting only the 14% average hides the fundamental mechanism: the entire gain was driven by the bottom half of the skill distribution.
              </p>
            </div>
          )}

          {/* The Learning Curve Compression Explainer */}
          <div className="border border-stone-200 rounded-xl p-5 bg-stone-50/70 space-y-3">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              The Learning Curve Compression Effect
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              In this study, a newly hired agent with <strong>2 months of tenure using AI</strong> performed at the same proficiency level as an agent with <strong>6 months of tenure working without AI</strong>. In effect, generative AI compressed 4 months of tacit learning into immediate software guidance.
            </p>
          </div>

          {/* Scientific Guardrail */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Critical Context & Generalizability Limit:</span>
              <span>
                Do not generalize the +14% or +34% effect to all knowledge professions. Customer support tickets have well-defined answers and immediate customer feedback loops. In ambiguous, creative, or high-liability professions, the productivity effect may be substantially different.
              </span>
            </div>
          </div>
        </div>

        {/* Chapter Transition */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-serif italic text-stone-700">
            <strong>Key Transition:</strong> If workers produce 14% to 34% more output per hour, does their pay mechanically rise with their productivity?
          </p>
          <a
            href="#03_value_gap"
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Explore Chapter 03: The Value Gap →
          </a>
        </div>
      </div>
    </section>
  );
};
