import React, { useState, useMemo } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { curatedOccupations, calculatedKeyFindings } from '../../data/researchData';
import { useTheme } from '../../context/ThemeContext';
import { Search, Scale, ChevronDown, BookOpen } from 'lucide-react';

interface Chapter10Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

interface OccupationProfileMapping {
  sourceType: 'curated' | 'illustrative';
  pairs: {
    aiActivity: string;
    humanContribution: string;
  }[];
  suggestedSkill: {
    title: string;
    reason: string;
  };
}

// Verified suggested occupations mapped to actual SOC records in occupations271
const SUGGESTED_OCCUPATION_CODES = [
  { soc: '27-1024', shortLabel: 'Graphic Designer' },
  { soc: '25-2031', shortLabel: 'High School Teacher' },
  { soc: '29-1141', shortLabel: 'Registered Nurse' },
  { soc: '13-2011', shortLabel: 'Accountant & Auditor' },
  { soc: '43-4051', shortLabel: 'Customer Service Rep' }
];

// Domain-accurate occupation/category profiles to prevent mismatched generic text
const SOC_SPECIFIC_PROFILES: Record<
  string,
  {
    pairs: { aiActivity: string; humanContribution: string }[];
    suggestedSkill: { title: string; reason: string };
  }
> = {
  '43-4051': {
    // Customer service representatives
    pairs: [
      {
        aiActivity: 'Drafting routine replies & FAQ explanations',
        humanContribution: 'De-escalating frustrated callers with empathy'
      },
      {
        aiActivity: 'Summarizing prior ticket & account history',
        humanContribution: 'Judging policy exceptions & refund discretion'
      },
      {
        aiActivity: 'Classifying inbound requests for routing',
        humanContribution: 'Building customer trust during complex issues'
      }
    ],
    suggestedSkill: {
      title: 'Exception Judgement & Empathetic Resolution',
      reason:
        'When routine inquiries are resolved faster with AI drafts, human value concentrates on complex edge cases and calm interpersonal trust.'
    }
  },
  '25-2031': {
    // High school teachers
    pairs: [
      {
        aiActivity: 'Adapting reading texts & quiz drafts across levels',
        humanContribution: 'Reading classroom engagement & pacing live lessons'
      },
      {
        aiActivity: 'Summarizing rubric comments & parent updates',
        humanContribution: 'Mentoring struggling students & pastoral care'
      },
      {
        aiActivity: 'Generating practice problem variations',
        humanContribution: 'Sparking discussion & critical inquiry'
      }
    ],
    suggestedSkill: {
      title: 'Adaptive Pedagogy & Assessment Design',
      reason:
        'Knowing when AI scaffolds help comprehension versus when unassisted practice is essential for student mastery.'
    }
  },
  '25-2022': {
    // Middle school teachers
    pairs: [
      {
        aiActivity: 'Drafting differentiated lesson worksheets',
        humanContribution: 'Guiding classroom dynamics & peer collaboration'
      },
      {
        aiActivity: 'Organizing unit schedules & quiz banks',
        humanContribution: 'Supporting emotional & developmental milestones'
      },
      {
        aiActivity: 'Formatting routine family newsletters',
        humanContribution: 'Building individual trust with students & parents'
      }
    ],
    suggestedSkill: {
      title: 'Formative Feedback & Classroom Facilitation',
      reason:
        'Using saved prep time to observe student reasoning firsthand and intervene early.'
    }
  },
  '13-2052': {
    // Personal financial advisors
    pairs: [
      {
        aiActivity: 'Summarizing market research & client meeting notes',
        humanContribution: 'Advising families through emotional financial decisions'
      },
      {
        aiActivity: 'Preparing draft portfolio review templates',
        humanContribution: 'Holding fiduciary accountability & risk trade-offs'
      },
      {
        aiActivity: 'Organizing routine intake checklists',
        humanContribution: 'Tailoring goals around nuanced life circumstances'
      }
    ],
    suggestedSkill: {
      title: 'Fiduciary Communication & Behavioral Coaching',
      reason:
        'Clients pay for trusted human judgement during volatile markets and major life transitions.'
    }
  }
};

function getOccupationProfile(occ: Occupation271): OccupationProfileMapping {
  // 1. Check curatedOccupations in verified researchData.ts first
  const curated = curatedOccupations.find((c) => c.soc_code === occ.soc_code);
  if (curated?.tasks && curated.tasks.length > 0) {
    const aiTasks = curated.tasks.filter((t) => t.type !== 'human_intensive');
    const humanTask = curated.tasks.find((t) => t.type === 'human_intensive');
    const pairs = [
      {
        aiActivity: aiTasks[0]?.name || 'Routine preparation & structuring',
        humanContribution: humanTask?.name || 'Core professional judgement & accountability'
      },
      {
        aiActivity: aiTasks[1]?.name || 'Drafting & concept synthesis',
        humanContribution:
          humanTask?.description?.replace(/\.$/, '') ||
          `Applying ${occ.top_cognitive_ability.toLowerCase()} in context`
      }
    ];
    return {
      sourceType: 'curated',
      pairs,
      suggestedSkill: {
        title: `${occ.top_cognitive_ability} & Output Verification`,
        reason: `Grounded in ${occ.occupation_title}'s top O*NET cognitive requirement (${occ.top_cognitive_ability}) alongside checking AI-assisted outputs.`
      }
    };
  }

  // 2. Check explicit SOC-specific overrides
  if (SOC_SPECIFIC_PROFILES[occ.soc_code]) {
    return {
      sourceType: 'illustrative',
      ...SOC_SPECIFIC_PROFILES[occ.soc_code]
    };
  }

  // 3. Domain-accurate mapping strictly by job_category & O*NET cognitive profile
  const cat = occ.job_category;

  if (cat === 'Healthcare') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Ambient charting & intake note formatting',
          humanContribution: 'Clinical assessment & physical patient examination'
        },
        {
          aiActivity: 'Summarizing patient history & guideline checklists',
          humanContribution: 'Compassionate bedside care & diagnostic responsibility'
        }
      ],
      suggestedSkill: {
        title: 'Clinical Verification & Patient Communication',
        reason: `Supports safe review of automated documentation while prioritizing ${occ.top_cognitive_ability.toLowerCase()} in patient care.`
      }
    };
  }

  if (cat === 'Education Training And Library') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Drafting lesson outlines & tiered reading materials',
          humanContribution: 'Live instruction & sensing student comprehension'
        },
        {
          aiActivity: 'Generating formative quiz items & study guides',
          humanContribution: 'Mentoring, motivation & classroom relationships'
        }
      ],
      suggestedSkill: {
        title: 'Learning Design & Critical Source Literacy',
        reason: `Helps translate saved preparation effort into deeper student guidance anchored in ${occ.top_cognitive_ability.toLowerCase()}.`
      }
    };
  }

  if (cat === 'Office And Administrative Support') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Sorting records, scheduling & draft correspondence',
          humanContribution: 'Handling non-standard exceptions & stakeholder coordination'
        },
        {
          aiActivity: 'Summarizing forms & extracting routine fields',
          humanContribution: 'Verifying compliance, accuracy & privacy rules'
        }
      ],
      suggestedSkill: {
        title: 'Workflow Coordination & Quality Checking',
        reason: `Builds on ${occ.top_cognitive_ability.toLowerCase()} to catch errors in automated records and handle exceptions.`
      }
    };
  }

  if (cat === 'Business And Financial' || cat === 'Management') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Summarizing operational briefs & meeting action items',
          humanContribution: 'Setting priorities under competing constraints'
        },
        {
          aiActivity: 'Structuring baseline reports & variance checklists',
          humanContribution: 'Negotiating trade-offs & accepting sign-off risk'
        }
      ],
      suggestedSkill: {
        title: 'Decision Framing & Assumption Auditing',
        reason: `Complements ${occ.top_cognitive_ability.toLowerCase()} by stress-testing summaries before committing resources.`
      }
    };
  }

  if (cat === 'Legal') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'First-pass document review & clause comparison',
          humanContribution: 'Client advocacy, negotiation & legal strategy'
        },
        {
          aiActivity: 'Summarizing case files & citation indexes',
          humanContribution: 'Verifying precedent accuracy & fiduciary liability'
        }
      ],
      suggestedSkill: {
        title: 'Primary Source Verification & Legal Judgement',
        reason: `Essential for catching fabricated citations and exercising ${occ.top_cognitive_ability.toLowerCase()} under professional liability.`
      }
    };
  }

  if (cat === 'Arts And Design' || cat === 'Media And Communication' || cat === 'Entertainment And Sports') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Exploring early concept variations & rough outlines',
          humanContribution: 'Original artistic voice, taste & cultural judgement'
        },
        {
          aiActivity: 'Formatting assets & summarizing background research',
          humanContribution: 'Final editorial curation & authentic audience resonance'
        }
      ],
      suggestedSkill: {
        title: 'Editorial Taste & Creative Direction',
        reason: `Elevates ${occ.top_cognitive_ability.toLowerCase()} when raw variations become fast and inexpensive.`
      }
    };
  }

  if (cat === 'Sales' || cat === 'Personal Care And Service' || cat === 'Community And Social Service') {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Preparing follow-up summaries & product lookups',
          humanContribution: 'Building genuine rapport & reading personal context'
        },
        {
          aiActivity: 'Logging routine service notes & scheduling',
          humanContribution: 'Navigating sensitive, trust-based conversations'
        }
      ],
      suggestedSkill: {
        title: 'Relational Trust & Active Listening',
        reason: `Human presence and ${occ.top_cognitive_ability.toLowerCase()} remain central where trust drives outcomes.`
      }
    };
  }

  if (
    cat === 'Construction And Extraction' ||
    cat === 'Installation Maintenance And Repair' ||
    cat === 'Transportation And Material Moving' ||
    cat === 'Production' ||
    cat === 'Building And Grounds Cleaning' ||
    cat === 'Farming Fishing And Forestry' ||
    cat === 'Food Preparation And Serving' ||
    cat === 'Protective Service'
  ) {
    return {
      sourceType: 'illustrative',
      pairs: [
        {
          aiActivity: 'Voice-logged inspection notes & maintenance checklists',
          humanContribution: 'Hands-on physical execution in changing environments'
        },
        {
          aiActivity: 'Scheduling routes, manuals lookup & safety reminders',
          humanContribution: 'Real-time situational awareness & tactile judgement'
        }
      ],
      suggestedSkill: {
        title: 'Digital Diagnostics & Field Documentation',
        reason: `Pairs hands-on ${occ.top_cognitive_ability.toLowerCase()} with quick mobile lookup and reporting tools.`
      }
    };
  }

  // STEM / Math / Architecture & Engineering / Life, Physical & Social Science
  return {
    sourceType: 'illustrative',
    pairs: [
      {
        aiActivity: 'Drafting technical documentation & literature syntheses',
        humanContribution: 'Validating methodology, physical limits & safety'
      },
      {
        aiActivity: 'Structuring standard queries & test boilerplate',
        humanContribution: 'Framing novel problems & signing off on system integrity'
      }
    ],
    suggestedSkill: {
      title: 'Verification & Problem Framing',
      reason: `Reinforces ${occ.top_cognitive_ability.toLowerCase()} by auditing technical outputs against real-world constraints.`
    }
  };
}

export const Chapter10YourProfession: React.FC<Chapter10Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareOccupation, setCompareOccupation] = useState<Occupation271>(
    occupations271.find((o) => o.soc_code === '29-1141') || occupations271[1]
  );
  const [sourceOpen, setSourceOpen] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    occupations271.forEach((o) => set.add(o.job_category));
    return Array.from(set).sort();
  }, []);

  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return occupations271.filter((occ) => {
      const matchesCategory =
        selectedCategory === 'all' || occ.job_category === selectedCategory;
      const matchesSearch =
        !q ||
        occ.occupation_title.toLowerCase().includes(q) ||
        occ.soc_code.includes(q) ||
        occ.job_category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeProfile = useMemo(
    () => getOccupationProfile(activeOccupation),
    [activeOccupation]
  );
  const compareProfile = useMemo(
    () => getOccupationProfile(compareOccupation),
    [compareOccupation]
  );

  const palette = {
    canvasBg: isDark ? '#061329' : '#f8f7f2',
    surfaceBg: isDark ? '#0b1f3c' : '#ffffff',
    surfaceSubtle: isDark ? '#071731' : '#f1efe6',
    border: isDark ? '#163560' : '#d5dde7',
    textMain: isDark ? '#f7faeb' : '#061329',
    textMuted: isDark ? '#9bb2cf' : '#475e77',
    cyan: isDark ? '#22d3ee' : '#0284c7',
    lime: isDark ? '#d7e63b' : '#5c6800',
    amber: isDark ? '#f59e0b' : '#b45309',
    coral: isDark ? '#fb7185' : '#e11d48',
    emerald: isDark ? '#34d399' : '#059669'
  };

  const exposurePct = Math.round(activeOccupation.ai_exposure_llm_human * 100);
  const compareExposurePct = Math.round(compareOccupation.ai_exposure_llm_human * 100);
  const maxWage = Math.max(
    activeOccupation.median_annual_wage_usd,
    compareOccupation.median_annual_wage_usd,
    150000
  );

  return (
    <article
      id="ch10_your_profession"
      className="scroll-mt-12 py-16 sm:py-24 border-b relative transition-colors duration-300"
      style={{
        backgroundColor: palette.canvasBg,
        borderColor: palette.border,
        color: palette.textMain
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Compact Header */}
        <header className="space-y-3 max-w-3xl">
          <div
            className="flex items-center gap-2 text-xs font-mono tracking-wider"
            style={{ color: palette.cyan }}
          >
            <span className="font-bold">08</span>
            <span aria-hidden="true">·</span>
            <span>Look Up Your Profession</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-[1.08]"
            style={{ color: palette.textMain, textWrap: 'balance' }}
          >
            How might AI change your job?
          </h2>

          <p
            className="text-base sm:text-xl font-sans leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Explore AI exposure, employment outlook and the tasks involved in your profession.
          </p>
        </header>

        {/* A. SEARCH, CATEGORY FILTER & SUGGESTED OCCUPATIONS */}
        <section aria-label="Search and select an occupation" className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: palette.textMuted }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 271 U.S. occupations (e.g. Graphic designers, Nurses, Accountants)..."
                aria-label="Search across 271 occupations"
                className="w-full pl-10 pr-4 py-2.5 min-h-[42px] text-sm font-sans rounded-lg border focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: palette.surfaceBg,
                  borderColor: palette.border,
                  color: palette.textMain
                }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => {
                const cat = e.target.value;
                setSelectedCategory(cat);
                if (cat !== 'all') {
                  const firstInCat = occupations271.find((o) => o.job_category === cat);
                  if (firstInCat) onSelectOccupation(firstInCat);
                }
              }}
              aria-label="Filter by occupational category"
              className="py-2.5 px-3 min-h-[42px] text-sm font-sans rounded-lg border cursor-pointer focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: palette.surfaceBg,
                borderColor: palette.border,
                color: palette.textMain
              }}
            >
              <option value="all">All Categories ({occupations271.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setCompareMode((v) => !v)}
              aria-pressed={compareMode}
              className="px-4 py-2.5 min-h-[42px] text-xs font-mono font-semibold rounded-lg border transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: compareMode ? palette.cyan : palette.surfaceBg,
                borderColor: compareMode ? palette.cyan : palette.border,
                color: compareMode
                  ? isDark
                    ? '#061329'
                    : '#ffffff'
                  : palette.textMain
              }}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{compareMode ? 'Hide Comparison' : 'Compare Two Occupations'}</span>
            </button>
          </div>

          {/* Search Matches */}
          {(searchQuery.trim() !== '' || selectedCategory !== 'all') && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-sans mr-1" style={{ color: palette.textMuted }}>
                {filteredList.length === 0 ? 'No matching occupations' : 'Matching:'}
              </span>
              {filteredList.slice(0, 8).map((occ) => {
                const isSelected = activeOccupation.soc_code === occ.soc_code;
                return (
                  <button
                    key={occ.soc_code}
                    type="button"
                    onClick={() => onSelectOccupation(occ)}
                    className="px-3 py-1.5 rounded-md border text-xs font-sans transition-colors cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? palette.cyan : palette.surfaceSubtle,
                      borderColor: isSelected ? palette.cyan : palette.border,
                      color: isSelected
                        ? isDark
                          ? '#061329'
                          : '#ffffff'
                        : palette.textMain,
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {occ.occupation_title}
                  </button>
                );
              })}
              {filteredList.length > 8 && (
                <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
                  +{filteredList.length - 8} more
                </span>
              )}
            </div>
          )}

          {/* Verified Suggested Occupations */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-sans mr-1" style={{ color: palette.textMuted }}>
              Suggested:
            </span>
            {SUGGESTED_OCCUPATION_CODES.map((preset) => {
              const found = occupations271.find((o) => o.soc_code === preset.soc);
              if (!found) return null;
              const isSelected = activeOccupation.soc_code === found.soc_code;
              return (
                <button
                  key={preset.soc}
                  type="button"
                  onClick={() => onSelectOccupation(found)}
                  aria-pressed={isSelected}
                  className="px-3 py-1.5 min-h-[36px] rounded-md border text-xs font-sans transition-colors cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: isSelected ? palette.cyan : palette.surfaceSubtle,
                    borderColor: isSelected ? palette.cyan : palette.border,
                    color: isSelected
                      ? isDark
                        ? '#061329'
                        : '#ffffff'
                      : palette.textMain,
                    fontWeight: isSelected ? 600 : 400
                  }}
                >
                  {preset.shortLabel}
                </button>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* MAIN OCCUPATION PROFILE (or Side-by-Side Comparison when toggled)   */}
        {/* =================================================================== */}
        {!compareMode ? (
          <section
            aria-labelledby="profile-occ-title"
            className="rounded-2xl border p-5 sm:p-8 space-y-8"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            {/* B. Occupation Overview */}
            <div
              className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b"
              style={{ borderColor: palette.border }}
            >
              <div className="space-y-1.5">
                <div
                  className="flex flex-wrap items-center gap-2 text-xs font-sans"
                  style={{ color: palette.textMuted }}
                >
                  <span>{activeOccupation.job_category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">SOC {activeOccupation.soc_code}</span>
                  {activeOccupation.education_required && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Typical education: {activeOccupation.education_required}</span>
                    </>
                  )}
                </div>
                <h3
                  id="profile-occ-title"
                  className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight"
                  style={{ color: palette.textMain }}
                >
                  {activeOccupation.occupation_title}
                </h3>
              </div>

              <div className="text-xs font-mono" style={{ color: palette.textMuted }}>
                Cognitive strength: <strong style={{ color: palette.textMain }}>{activeOccupation.top_cognitive_ability}</strong>
              </div>
            </div>

            {/* C. Four Visually Distinct Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b" style={{ borderColor: palette.border }}>
              {/* 1. AI Exposure (Proportional Indicator) */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-medium block" style={{ color: palette.textMuted }}>
                  AI Task Exposure (Human rubric)
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-mono font-bold tabular-nums"
                    style={{ color: palette.cyan }}
                  >
                    {exposurePct}%
                  </span>
                  <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
                    {activeOccupation.ai_exposure_level} tier
                  </span>
                </div>
                <div
                  className="h-2.5 w-full rounded-sm overflow-hidden"
                  style={{ backgroundColor: palette.surfaceSubtle }}
                  role="img"
                  aria-label={`AI task exposure ${exposurePct}%`}
                >
                  <div
                    className="h-full rounded-sm"
                    style={{ width: `${exposurePct}%`, backgroundColor: palette.cyan }}
                  />
                </div>
                <p className="text-[11px] font-sans" style={{ color: palette.textMuted }}>
                  Task overlap score—not probability of job loss
                </p>
              </div>

              {/* 2. Projected Job Growth (U.S. BLS 2024–2034) */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-medium block" style={{ color: palette.textMuted }}>
                  Projected U.S. Growth (2024–2034)
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-mono font-bold tabular-nums"
                    style={{
                      color:
                        activeOccupation.projected_growth_pct_2024_2034 >= 3.1
                          ? palette.emerald
                          : activeOccupation.projected_growth_pct_2024_2034 >= 0
                          ? palette.textMain
                          : palette.coral
                    }}
                  >
                    {activeOccupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                    {activeOccupation.projected_growth_pct_2024_2034}%
                  </span>
                </div>
                <div className="text-xs font-sans" style={{ color: palette.textMain }}>
                  {activeOccupation.growth_outlook}
                </div>
                <p className="text-[11px] font-sans" style={{ color: palette.textMuted }}>
                  U.S. BLS projection (all-jobs avg: +{calculatedKeyFindings.bls_baseline_growth}%)
                </p>
              </div>

              {/* 3. Median Annual Wage (U.S. BLS) */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-medium block" style={{ color: palette.textMuted }}>
                  Median Annual Wage (U.S.)
                </span>
                <div
                  className="text-3xl font-mono font-bold tabular-nums"
                  style={{ color: palette.textMain }}
                >
                  ${activeOccupation.median_annual_wage_usd.toLocaleString()}
                </div>
                <p className="text-[11px] font-sans" style={{ color: palette.textMuted }}>
                  U.S. Bureau of Labor Statistics (2024)
                </p>
              </div>

              {/* 4. U.S. Employment (2024 BLS) */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-medium block" style={{ color: palette.textMuted }}>
                  U.S. Employment (2024)
                </span>
                <div
                  className="text-3xl font-mono font-bold tabular-nums"
                  style={{ color: palette.textMain }}
                >
                  {activeOccupation.employment_2024.toLocaleString()}
                </div>
                <p className="text-[11px] font-sans" style={{ color: palette.textMuted }}>
                  Workers employed in the United States
                </p>
              </div>
            </div>

            {/* D. Work Transformation Map (Connected Task Relationship Diagram) */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-base font-sans font-semibold" style={{ color: palette.textMain }}>
                  Work Transformation Map
                </span>
                <span className="text-xs font-sans" style={{ color: palette.textMuted }}>
                  {activeProfile.sourceType === 'curated'
                    ? 'Curated occupational task breakdown'
                    : 'Illustrative pattern from category & O*NET cognitive profile'}
                </span>
              </div>

              {/* Connected 2-Group SVG Relationship Rows */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_72px_1fr] gap-2 text-xs font-mono uppercase tracking-wider">
                  <span style={{ color: palette.cyan }} className="font-bold">
                    AI-assisted activities
                  </span>
                  <span className="hidden md:block text-center" style={{ color: palette.textMuted }}>
                    ↔
                  </span>
                  <span style={{ color: palette.amber }} className="font-bold md:text-right">
                    Human-led contributions
                  </span>
                </div>

                {activeProfile.pairs.map((pair, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-[1fr_72px_1fr] items-center gap-2 md:gap-0"
                  >
                    <div
                      className="px-4 py-3 rounded-lg border text-sm font-sans"
                      style={{
                        backgroundColor: palette.surfaceSubtle,
                        borderColor: palette.border,
                        color: palette.textMain
                      }}
                    >
                      {pair.aiActivity}
                    </div>

                    {/* Connecting line SVG */}
                    <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                      <svg viewBox="0 0 72 20" className="w-18 h-5">
                        <line
                          x1="2"
                          y1="10"
                          x2="70"
                          y2="10"
                          stroke={palette.border}
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <circle cx="8" cy="10" r="3" fill={palette.cyan} />
                        <circle cx="64" cy="10" r="3" fill={palette.amber} />
                      </svg>
                    </div>

                    <div
                      className="px-4 py-3 rounded-lg border text-sm font-sans"
                      style={{
                        backgroundColor: palette.surfaceSubtle,
                        borderColor: palette.amber,
                        color: palette.textMain
                      }}
                    >
                      {pair.humanContribution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E. Skill to Explore (Explicitly Labeled Editorial Recommendation) */}
            <div
              className="pt-5 border-t flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              style={{ borderColor: palette.border }}
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider" style={{ color: palette.lime }}>
                    Suggested skill to explore
                  </span>
                  <span aria-hidden="true" style={{ color: palette.textMuted }}>
                    ·
                  </span>
                  <span style={{ color: palette.textMuted }}>
                    Editorial recommendation (not a measured prediction)
                  </span>
                </div>
                <div className="text-base font-sans font-bold" style={{ color: palette.textMain }}>
                  {activeProfile.suggestedSkill.title}
                </div>
                <p className="text-sm font-sans leading-relaxed" style={{ color: palette.textMuted }}>
                  {activeProfile.suggestedSkill.reason}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSourceOpen((v) => !v)}
                aria-expanded={sourceOpen}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 cursor-pointer hover:underline self-start"
                style={{ color: palette.cyan }}
              >
                <span>Sources &amp; caveats</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    sourceOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {sourceOpen && (
              <div
                className="pt-3 border-t text-xs font-sans space-y-2"
                style={{ borderColor: palette.border, color: palette.textMuted }}
              >
                <p>
                  <strong style={{ color: palette.textMain }}>Data sources:</strong>{' '}
                  Wages, 2024 employment, and 2024–2034 job projections come from the U.S. Bureau of Labor Statistics (BLS). Task-exposure scores come from Eloundou et al. (human expert rubric) mapped to O*NET abilities.
                </p>
                <p>
                  <strong style={{ color: palette.textMain }}>Interpretation note:</strong>{' '}
                  High AI exposure reflects task overlap with language models, not a forecast that the profession will disappear.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenEvidence('C001')}
                  className="inline-flex items-center gap-1.5 font-mono font-semibold cursor-pointer hover:underline"
                  style={{ color: palette.cyan }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Evidence Vault</span>
                </button>
              </div>
            )}
          </section>
        ) : (
          /* F. SIDE-BY-SIDE COMPARE TWO OCCUPATIONS (Shared Numerical Scales) */
          <section
            aria-label="Compare two occupations side by side"
            className="rounded-2xl border p-5 sm:p-8 space-y-8"
            style={{
              backgroundColor: palette.surfaceBg,
              borderColor: palette.border
            }}
          >
            {/* Selectors Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 border-b" style={{ borderColor: palette.border }}>
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold uppercase" style={{ color: palette.cyan }}>
                  Occupation A
                </span>
                <select
                  value={activeOccupation.soc_code}
                  onChange={(e) => {
                    const found = occupations271.find((o) => o.soc_code === e.target.value);
                    if (found) onSelectOccupation(found);
                  }}
                  aria-label="Select Occupation A"
                  className="w-full py-2 px-3 min-h-[42px] text-sm font-sans rounded-lg border cursor-pointer"
                  style={{
                    backgroundColor: palette.surfaceSubtle,
                    borderColor: palette.cyan,
                    color: palette.textMain
                  }}
                >
                  {occupations271.map((o) => (
                    <option key={o.soc_code} value={o.soc_code}>
                      {o.occupation_title}
                    </option>
                  ))}
                </select>
                <div className="text-xs font-sans" style={{ color: palette.textMuted }}>
                  {activeOccupation.job_category} · SOC {activeOccupation.soc_code}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold uppercase" style={{ color: palette.amber }}>
                  Occupation B
                </span>
                <select
                  value={compareOccupation.soc_code}
                  onChange={(e) => {
                    const found = occupations271.find((o) => o.soc_code === e.target.value);
                    if (found) setCompareOccupation(found);
                  }}
                  aria-label="Select Occupation B"
                  className="w-full py-2 px-3 min-h-[42px] text-sm font-sans rounded-lg border cursor-pointer"
                  style={{
                    backgroundColor: palette.surfaceSubtle,
                    borderColor: palette.amber,
                    color: palette.textMain
                  }}
                >
                  {occupations271.map((o) => (
                    <option key={o.soc_code} value={o.soc_code}>
                      {o.occupation_title}
                    </option>
                  ))}
                </select>
                <div className="text-xs font-sans" style={{ color: palette.textMuted }}>
                  {compareOccupation.job_category} · SOC {compareOccupation.soc_code}
                </div>
              </div>
            </div>

            {/* Aligned Shared-Scale Metric Comparisons */}
            <div className="space-y-6">
              {/* 1. AI Exposure (0-100% shared scale) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-semibold" style={{ color: palette.textMain }}>
                    AI Task Exposure (Human rubric · 0–100% scale, not job-loss probability)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="truncate pr-2" style={{ color: palette.textMuted }}>
                        {activeOccupation.occupation_title}
                      </span>
                      <span className="font-mono font-bold tabular-nums" style={{ color: palette.cyan }}>
                        {exposurePct}%
                      </span>
                    </div>
                    <div className="h-3 rounded-sm overflow-hidden" style={{ backgroundColor: palette.surfaceSubtle }}>
                      <div className="h-full" style={{ width: `${exposurePct}%`, backgroundColor: palette.cyan }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="truncate pr-2" style={{ color: palette.textMuted }}>
                        {compareOccupation.occupation_title}
                      </span>
                      <span className="font-mono font-bold tabular-nums" style={{ color: palette.amber }}>
                        {compareExposurePct}%
                      </span>
                    </div>
                    <div className="h-3 rounded-sm overflow-hidden" style={{ backgroundColor: palette.surfaceSubtle }}>
                      <div className="h-full" style={{ width: `${compareExposurePct}%`, backgroundColor: palette.amber }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Median Annual Wage (shared wage scale) */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-semibold block" style={{ color: palette.textMain }}>
                  Median Annual Wage (U.S. BLS, 2024)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="truncate pr-2" style={{ color: palette.textMuted }}>
                        {activeOccupation.occupation_title}
                      </span>
                      <span className="font-mono font-bold tabular-nums" style={{ color: palette.textMain }}>
                        ${activeOccupation.median_annual_wage_usd.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 rounded-sm overflow-hidden" style={{ backgroundColor: palette.surfaceSubtle }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${(activeOccupation.median_annual_wage_usd / maxWage) * 100}%`,
                          backgroundColor: palette.cyan
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="truncate pr-2" style={{ color: palette.textMuted }}>
                        {compareOccupation.occupation_title}
                      </span>
                      <span className="font-mono font-bold tabular-nums" style={{ color: palette.textMain }}>
                        ${compareOccupation.median_annual_wage_usd.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 rounded-sm overflow-hidden" style={{ backgroundColor: palette.surfaceSubtle }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${(compareOccupation.median_annual_wage_usd / maxWage) * 100}%`,
                          backgroundColor: palette.amber
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Projected 10-Yr U.S. Growth (shared scale, 0% baseline) */}
              {(() => {
                const maxAbsGrowth = Math.max(
                  Math.abs(activeOccupation.projected_growth_pct_2024_2034),
                  Math.abs(compareOccupation.projected_growth_pct_2024_2034),
                  20
                );
                return (
                  <div className="space-y-2">
                    <span className="text-xs font-sans font-semibold block" style={{ color: palette.textMain }}>
                      Projected U.S. Growth 2024–2034 (BLS · baseline +{calculatedKeyFindings.bls_baseline_growth}%)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { item: activeOccupation, color: palette.cyan },
                        { item: compareOccupation, color: palette.amber }
                      ].map(({ item, color }) => {
                        const g = item.projected_growth_pct_2024_2034;
                        const widthPct = Math.min(100, (Math.abs(g) / maxAbsGrowth) * 100);
                        return (
                          <div key={item.soc_code} className="space-y-1">
                            <div className="flex justify-between text-xs font-sans">
                              <span className="truncate pr-2" style={{ color: palette.textMuted }}>
                                {item.occupation_title}
                              </span>
                              <span
                                className="font-mono font-bold tabular-nums"
                                style={{ color: g < 0 ? palette.coral : palette.textMain }}
                              >
                                {g > 0 ? `+${g}%` : `${g}%`}
                              </span>
                            </div>
                            <div className="h-3 rounded-sm overflow-hidden" style={{ backgroundColor: palette.surfaceSubtle }}>
                              <div
                                className="h-full"
                                style={{
                                  width: `${widthPct}%`,
                                  backgroundColor: g < 0 ? palette.coral : color
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* 4. U.S. Employment 2024 (shared scale) */}
              {(() => {
                const maxEmp = Math.max(
                  activeOccupation.employment_2024,
                  compareOccupation.employment_2024,
                  1
                );
                return (
                  <div className="space-y-2">
                    <span className="text-xs font-sans font-semibold block" style={{ color: palette.textMain }}>
                      U.S. Employment (2024 BLS)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { item: activeOccupation, color: palette.cyan },
                        { item: compareOccupation, color: palette.amber }
                      ].map(({ item, color }) => (
                        <div key={item.soc_code} className="space-y-1">
                          <div className="flex justify-between text-xs font-sans">
                            <span className="truncate pr-2" style={{ color: palette.textMuted }}>
                              {item.occupation_title}
                            </span>
                            <span className="font-mono font-bold tabular-nums" style={{ color: palette.textMain }}>
                              {item.employment_2024.toLocaleString()}
                            </span>
                          </div>
                          <div className="h-3 rounded-sm overflow-hidden" style={{ backgroundColor: palette.surfaceSubtle }}>
                            <div
                              className="h-full"
                              style={{
                                width: `${(item.employment_2024 / maxEmp) * 100}%`,
                                backgroundColor: color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Side-by-Side Task Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: palette.border }}>
              {[
                { occ: activeOccupation, profile: activeProfile, color: palette.cyan },
                { occ: compareOccupation, profile: compareProfile, color: palette.amber }
              ].map(({ occ: item, profile, color }) => (
                <div key={item.soc_code} className="space-y-3">
                  <div className="text-sm font-sans font-bold" style={{ color }}>
                    {item.occupation_title}
                  </div>
                  {profile.pairs.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border text-xs font-sans space-y-1"
                      style={{
                        backgroundColor: palette.surfaceSubtle,
                        borderColor: palette.border
                      }}
                    >
                      <div style={{ color: palette.textMain }}>
                        <span className="font-mono font-semibold" style={{ color: palette.cyan }}>
                          AI assists:{' '}
                        </span>
                        {p.aiActivity}
                      </div>
                      <div style={{ color: palette.textMuted }}>
                        <span className="font-mono font-semibold" style={{ color: palette.amber }}>
                          Human-led:{' '}
                        </span>
                        {p.humanContribution}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
