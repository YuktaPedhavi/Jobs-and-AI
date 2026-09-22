import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Sparkles, Heart, Clock, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Chapter5Props {
  onOpenEvidence: (id: string) => void;
}

interface RealWorkdayProfile {
  id: string;
  profession: string;
  roleSubtitle: string;
  imageSrc: string;
  imageAlt: string;
  aiHelpsWith: string[];
  humanValue: string[];
  empiricalStat: string;
  statLabel: string;
  evidenceId: string;
  quote: string;
  timeline: {
    time: string;
    task: string;
    nature: 'ai_assisted' | 'human_core';
    detail: string;
  }[];
}

const WORKDAY_PROFILES: RealWorkdayProfile[] = [
  {
    id: 'teacher',
    profession: 'Teacher',
    roleSubtitle: 'Secondary Education',
    imageSrc: '/src/assets/images/work_teacher_1790055145661.jpg',
    imageAlt: 'Teacher grading assignments under a warm desk light in a classroom',
    aiHelpsWith: [
      'Lesson preparation & tiered reading levels',
      'Curriculum-aligned quiz & rubric generation',
      'Administrative emails and form drafting'
    ],
    humanValue: [
      'Classroom judgement and emotional temperature',
      'Direct, motivating pedagogical relationships',
      'Pastoral care for struggling students'
    ],
    empiricalStat: '5.9 hrs',
    statLabel: 'Saved weekly on lesson prep (NEA survey)',
    evidenceId: 'C006',
    quote: '“AI drafts three reading levels of a text in ten minutes. But when a student puts their head down in tears, only a teacher can read the room.”',
    timeline: [
      { time: '07:45 AM', task: 'Lesson plan differentiation', nature: 'ai_assisted', detail: 'Adapting primary source history text into 3 reading tiers' },
      { time: '09:00 AM', task: 'Classroom teaching & engagement', nature: 'human_core', detail: 'Reading non-verbal cues, sensing confusion, sparking debate' },
      { time: '01:30 PM', task: 'Comprehension quiz generation', nature: 'ai_assisted', detail: 'Generating quick formative checks aligned with state standards' },
      { time: '03:15 PM', task: 'Parent consultation & student support', nature: 'human_core', detail: 'Discussing emotional hurdles and building mutual family trust' }
    ]
  },
  {
    id: 'doctor',
    profession: 'Doctor',
    roleSubtitle: 'Internal Medicine',
    imageSrc: '/src/assets/images/work_doctor_1790055159258.jpg',
    imageAlt: 'Doctor reviewing medical charts in a dim consultation office',
    aiHelpsWith: [
      'Ambient EHR documentation during patient visits',
      'Clinical trial and pharmacology summaries',
      'Initial symptom intake organization'
    ],
    humanValue: [
      'Physical bedside examination & micro-expression detection',
      'Full legal and fiduciary malpractice responsibility',
      'Compassionate delivery of grave diagnoses'
    ],
    empiricalStat: '28%',
    statLabel: 'Reduction in administrative EHR charting (AMA 2026)',
    evidenceId: 'C007',
    quote: '“Software can summarize medical journals at lightning speed. But the software is never sued, disbarred, or bedside when life changes.”',
    timeline: [
      { time: '08:15 AM', task: 'Literature & drug interaction check', nature: 'ai_assisted', detail: 'Rapidly cross-referencing rare contraindications across 10 trials' },
      { time: '10:00 AM', task: 'Bedside physical exam', nature: 'human_core', detail: 'Palpating abdominal pain, observing patient anxiety posture' },
      { time: '11:45 AM', task: 'Ambient EHR documentation', nature: 'ai_assisted', detail: 'Microphone drafts clinical encounter notes for physician review' },
      { time: '02:30 PM', task: 'Treatment decision with family', nature: 'human_core', detail: 'Balancing quality of life with toxicity alongside family members' }
    ]
  },
  {
    id: 'designer',
    profession: 'Designer',
    roleSubtitle: 'Brand & Product Design',
    imageSrc: '/src/assets/images/work_designer_1790055172342.jpg',
    imageAlt: 'Designer sketching and testing layouts in a moody studio',
    aiHelpsWith: [
      'Rapid moodboarding and conceptual ideation',
      'Asset variations, format resizing & background fills',
      'Photoshop generative expands and cleanup'
    ],
    humanValue: [
      'Creative direction and discerning aesthetic taste',
      'Deep brand cultural context and authenticity',
      'Client stakeholder alignment and storytelling'
    ],
    empiricalStat: '84.8%',
    statLabel: 'Positive sentiment on AI ideation speed (Adobe)',
    evidenceId: 'C008',
    quote: '“When generating fifty variations costs nothing, value moves entirely to the taste that selects the one right direction.”',
    timeline: [
      { time: '09:30 AM', task: 'Moodboard & lighting exploration', nature: 'ai_assisted', detail: 'Generating 20 visual iterations to test color harmonies' },
      { time: '11:00 AM', task: 'Direction selection (Taste)', nature: 'human_core', detail: 'Choosing the single direction that authentically reflects the brand' },
      { time: '01:30 PM', task: 'Mechanical asset export & masks', nature: 'ai_assisted', detail: 'Automated background cuts, aspect ratio expansions' },
      { time: '04:00 PM', task: 'Defending design intent with client', nature: 'human_core', detail: 'Explaining strategic tradeoffs and negotiating compromise' }
    ]
  },
  {
    id: 'support',
    profession: 'Customer Support',
    roleSubtitle: 'Enterprise Operations',
    imageSrc: '/src/assets/images/work_support_1790055186012.jpg',
    imageAlt: 'Support specialist wearing headset looking thoughtful at an operations desk',
    aiHelpsWith: [
      'Suggested answer snippets for common billing queries',
      'Instant knowledge base documentation retrieval',
      'Ticket routing and summary tagging'
    ],
    humanValue: [
      'De-escalating furious or distressed customers',
      'Nuanced problem interpretation beyond keywords',
      'Knowing when to override policies for client retention'
    ],
    empiricalStat: '+34%',
    statLabel: 'Productivity lift for novice support staff (NBER 2023)',
    evidenceId: 'C010',
    quote: '“AI suggests the technical answer in two seconds. It takes a human to calm down someone who just lost their company data.”',
    timeline: [
      { time: '09:00 AM', task: 'Routine query resolution', nature: 'ai_assisted', detail: 'AI auto-suggests verified responses for password resets' },
      { time: '11:30 AM', task: 'Angry customer de-escalation', nature: 'human_core', detail: 'Validating distress with genuine human presence and empathy' },
      { time: '02:00 PM', task: 'Knowledge retrieval across tickets', nature: 'ai_assisted', detail: 'Surfacing obscure bug reports from engineer logs' },
      { time: '04:00 PM', task: 'Critical outage escalation judgment', nature: 'human_core', detail: 'Deciding whether an incident warrants waking leadership' }
    ]
  }
];

export const Chapter5RealWorkday: React.FC<Chapter5Props> = ({ onOpenEvidence }) => {
  const [selectedProfId, setSelectedProfId] = useState<string>('teacher');

  const profile = WORKDAY_PROFILES.find((p) => p.id === selectedProfId) || WORKDAY_PROFILES[0];

  return (
    <article
      id="ch05_real_workday"
      className="scroll-mt-12 py-16 sm:py-24 border-b border-[#1E2633] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161C25] border border-[#222B38] text-[#22D3EE] text-xs font-mono">
            <span className="font-bold">04</span>
            <span>AI IN A REAL WORKDAY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EEF2F6] tracking-tight leading-tight">
            How AI redistributes a real day's work.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            Across teaching, medicine, design, and operations, AI acts as an administrative accelerator—while core human judgement and relationships become the anchor.
          </p>
        </header>

        {/* Profession Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1E2633] pb-3">
          {WORKDAY_PROFILES.map((p) => {
            const isSelected = selectedProfId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProfId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#22D3EE] text-[#0C1016] shadow-lg'
                    : 'bg-[#161C25] text-[#94A3B8] hover:text-[#EEF2F6] hover:bg-[#1C2430] border border-[#222B38]'
                }`}
              >
                {p.profession}
              </button>
            );
          })}
        </div>

        {/* Editorial Composition: Integrated Horizontal Photo Crop + Typography */}
        <div className="bg-[#161C25] rounded-2xl border border-[#222B38] overflow-hidden shadow-2xl">
          {/* Hero Photo Crop integrated with typography */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={profile.imageSrc}
              alt={profile.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
            {/* Gradient overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#161C25] via-[#161C25]/40 to-transparent" />

            {/* Float badge & title */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE]">
                  Field Study · {profile.roleSubtitle}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#EEF2F6]">
                  {profile.profession}
                </h3>
              </div>

              <div className="px-4 py-2 bg-[#0C1016]/90 backdrop-blur-md rounded-xl border border-[#222B38] text-right font-mono">
                <span className="text-xl sm:text-2xl font-bold text-[#22D3EE] block">
                  {profile.empiricalStat}
                </span>
                <span className="text-[10px] text-[#94A3B8]">{profile.statLabel}</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Below Photo */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quote block */}
            <blockquote className="border-l-2 border-[#22D3EE] pl-4 sm:pl-6 py-1">
              <p className="text-base sm:text-lg font-serif italic text-[#EEF2F6] leading-relaxed">
                {profile.quote}
              </p>
            </blockquote>

            {/* Side-by-Side: AI May Help With vs Human Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI May Help With */}
              <div className="p-5 rounded-xl bg-[#0C1016] border border-[#222B38] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#38BDF8] tracking-wider font-semibold">
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                  <span>AI May Help With</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
                  {profile.aiHelpsWith.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#38BDF8] shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Human Value */}
              <div className="p-5 rounded-xl bg-[#0C1016] border border-[#F97316]/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#F97316] tracking-wider font-semibold">
                  <Heart className="w-4 h-4 text-[#F97316]" />
                  <span>Human Value</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#EEF2F6]">
                  {profile.humanValue.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F97316] shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline Breakdown */}
            <div className="space-y-4 pt-4 border-t border-[#222B38]">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="uppercase tracking-wider">A Realistic Workday Flow</span>
                <EvidenceBadge id={profile.evidenceId} onClick={onOpenEvidence} labelOverride="Field Research Data" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {profile.timeline.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      slot.nature === 'ai_assisted'
                        ? 'bg-[#0C1016] border-[#222B38]'
                        : 'bg-[#1C2430] border-[#F97316]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#94A3B8] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {slot.time}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                          slot.nature === 'ai_assisted'
                            ? 'bg-[#22D3EE]/10 text-[#22D3EE]'
                            : 'bg-[#F97316]/10 text-[#F97316]'
                        }`}
                      >
                        {slot.nature === 'ai_assisted' ? 'AI Assisted' : 'Human Core'}
                      </span>
                    </div>
                    <h5 className="font-serif font-bold text-xs text-[#EEF2F6]">
                      {slot.task}
                    </h5>
                    <p className="text-[11px] text-[#94A3B8] leading-snug">
                      {slot.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
