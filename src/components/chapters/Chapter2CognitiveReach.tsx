import React, { useState } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { EvidenceBadge } from '../EvidenceBadge';
import {
  FileText,
  Search,
  BookOpen,
  LineChart,
  FileCheck,
  GitBranch,
  Palette,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Heart,
  Eye
} from 'lucide-react';

interface Chapter2Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

interface WorkTaskFlow {
  id: string;
  name: string;
  icon: any;
  speedShift: string;
  exposurePct: number;
  whatAiDoes: string;
  whatRemainsHuman: string;
  category: 'cognitive_first' | 'human_anchor';
}

const WORK_TASKS: WorkTaskFlow[] = [
  {
    id: 'writing',
    name: 'Writing & Drafting',
    icon: FileText,
    speedShift: '70% faster drafts',
    exposurePct: 76,
    whatAiDoes: 'Generates first drafts, proposals, boilerplate code, summaries',
    whatRemainsHuman: 'Authentic voice, strategic argument, defending the thesis',
    category: 'cognitive_first'
  },
  {
    id: 'info_search',
    name: 'Information Search',
    icon: Search,
    speedShift: 'Instant retrieval',
    exposurePct: 72,
    whatAiDoes: 'Indexes thousands of internal manuals and documentation in seconds',
    whatRemainsHuman: 'Asking the right question, knowing where truth lies',
    category: 'cognitive_first'
  },
  {
    id: 'research',
    name: 'Research & Synthesis',
    icon: BookOpen,
    speedShift: 'Hours to minutes',
    exposurePct: 68,
    whatAiDoes: 'Summarizes literature, compares competitor filings, clusters trends',
    whatRemainsHuman: 'Validating citations, recognizing biased training datasets',
    category: 'cognitive_first'
  },
  {
    id: 'documentation',
    name: 'Documentation & Notes',
    icon: FileCheck,
    speedShift: '50% charting relief',
    exposurePct: 65,
    whatAiDoes: 'Transcribes ambient conversations into clinical notes and specs',
    whatRemainsHuman: 'Signing legal responsibility for diagnostic accuracy',
    category: 'cognitive_first'
  },
  {
    id: 'analysis',
    name: 'Quantitative Analysis',
    icon: LineChart,
    speedShift: 'Instant formula/scripts',
    exposurePct: 58,
    whatAiDoes: 'Cleans dirty spreadsheets, generates SQL queries and chart code',
    whatRemainsHuman: 'Understanding business context, causality vs correlation',
    category: 'cognitive_first'
  },
  {
    id: 'routine_decisions',
    name: 'Routine Decisions',
    icon: GitBranch,
    speedShift: 'Automated triage',
    exposurePct: 54,
    whatAiDoes: 'Routes support tickets, classifies loan applicants, flags anomalies',
    whatRemainsHuman: 'Handling exceptions, setting moral rules, fairness appeals',
    category: 'cognitive_first'
  },
  {
    id: 'creative_assist',
    name: 'Creative Assistance',
    icon: Palette,
    speedShift: '50 variations in 1 min',
    exposurePct: 48,
    whatAiDoes: 'Background removal, visual moodboards, storyboard ideas',
    whatRemainsHuman: 'Taste, curation, selecting the single direction that works',
    category: 'cognitive_first'
  },
  {
    id: 'communication',
    name: 'Routine Communication',
    icon: MessageSquare,
    speedShift: 'Suggested replies',
    exposurePct: 45,
    whatAiDoes: 'Polishes tone, translates languages, suggests customer emails',
    whatRemainsHuman: 'Genuine human empathy, building long-term personal trust',
    category: 'cognitive_first'
  }
];

export const Chapter2CognitiveReach: React.FC<Chapter2Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('writing');

  const activeTask = WORK_TASKS.find((t) => t.id === selectedTaskId) || WORK_TASKS[0];
  const IconComponent = activeTask.icon;

  return (
    <article
      id="ch02_cognitive_reach"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header matching prompt verbatim */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">02</span>
            <span>TASK MAP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#EEF2F6] tracking-tight leading-tight">
            Which parts of work are changing first?
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            AI does not replace entire jobs in one sweep. It enters specific daily tasks that rely on language, code, and structured retrieval first.
          </p>
        </header>

        {/* Interactive Task Flow Map */}
        <div className="bg-[#161C25] p-6 sm:p-8 rounded-2xl border border-[#222B38] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222B38] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
              <span className="text-xs font-mono uppercase text-[#94A3B8] tracking-wider">
                Daily Task Transformation Flow
              </span>
            </div>
            <EvidenceBadge id="C004" onClick={onOpenEvidence} labelOverride="Eloundou et al. · Task Decomposition" />
          </div>

          {/* 8-Node Interactive Flow Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {WORK_TASKS.map((task) => {
              const isSelected = selectedTaskId === task.id;
              const TIcon = task.icon;

              return (
                <button
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-[#22D3EE]/10 border-[#22D3EE] ring-2 ring-[#22D3EE]/25'
                      : 'bg-[#0C1016] border-[#222B38] hover:border-[#38BDF8] hover:bg-[#1A222E]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <TIcon
                      className={`w-4 h-4 ${isSelected ? 'text-[#22D3EE]' : 'text-[#94A3B8]'}`}
                    />
                    <span className="font-mono text-[10px] text-[#94A3B8]">
                      {task.exposurePct}%
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs tracking-tight text-[#EEF2F6] leading-tight">
                      {task.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Task Transformation Flow Detail Card */}
          <div className="p-6 bg-[#0C1016] rounded-xl border border-[#222B38] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#161C25] border border-[#222B38] flex items-center justify-center text-[#22D3EE]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold tracking-tight text-[#EEF2F6]">
                    {activeTask.name}
                  </h3>
                  <span className="text-xs font-mono text-[#22D3EE]">
                    Shift: {activeTask.speedShift}
                  </span>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-[#94A3B8]">
                <span>Task Exposure:</span>{' '}
                <strong className="text-[#22D3EE] text-base">{activeTask.exposurePct}%</strong>
              </div>
            </div>

            {/* Side-by-side Flow Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#161C25] border border-[#222B38] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> What AI Handles
                </span>
                <p className="text-sm font-sans text-[#EEF2F6] leading-relaxed">
                  {activeTask.whatAiDoes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161C25] border border-[#F97316]/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> What Remains Distinctly Human
                </span>
                <p className="text-sm font-sans text-[#EEF2F6] leading-relaxed">
                  {activeTask.whatRemainsHuman}
                </p>
              </div>
            </div>
          </div>

          {/* Takeaway line */}
          <div className="text-xs font-mono text-[#94A3B8] flex items-center justify-between pt-2">
            <span>When first drafts are cheap, validation and taste become scarce.</span>
            <span className="text-[#22D3EE]">r = +0.71 on verbal tasks</span>
          </div>
        </div>
      </div>
    </article>
  );
};
