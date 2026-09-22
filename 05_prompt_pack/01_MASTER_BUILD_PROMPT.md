# GOOGLE AI STUDIO — MASTER BUILD PROMPT
## Project: THE NEW VALUE OF WORK

You are building a polished interactive data-storytelling website, not a dashboard and not a static report.

### Before coding
Read these files in this order:
1. `manifest.json`
2. `04_platform_seed/story_seed.json`
3. `03_sources/claim_database.json`
4. `04_platform_seed/visualization_specs.json`
5. `04_platform_seed/design_direction.json`
6. `02_data/DATA_DICTIONARY.md`
7. the derived data files needed for each chapter
8. `03_sources/source_registry.json`

Treat `claim_database.json` as the factual authority for story claims. Treat derived CSV/JSON files as the factual authority for project-dataset values.

### Locked concept
**THE NEW VALUE OF WORK**  
**How AI is changing what work is worth — and who gets to capture that value**

Central question:
**If AI makes one worker capable of producing more, who captures the extra value?**

Human question:
**If AI increasingly performs beginner-level cognitive tasks, how will the next generation build the experience needed to become experts?**

### Audience
Students and early-career knowledge workers, approximately 18–30, with an India-aware but globally grounded perspective.

### Narrative architecture — keep these six chapters
1. THE FEAR — exposure is not replacement
2. THE BOOST — productivity can rise, especially for novices in some settings
3. THE VALUE GAP — productivity does not automatically become pay
4. THE MISSING FIRST RUNG — the path from beginner tasks to expert judgement may be changing
5. THE NEW ADVANTAGE — AI capability + domain knowledge + judgement + verification + communication + responsibility
6. WHO GETS THE VALUE? — distribution, India, and the unresolved final question

You may creatively redesign layouts, transitions and micro-interactions, but do not reorder or collapse the six-chapter logic without a compelling UX reason.

### Inline factual seed
Use these only as a quick boot seed; the claim database contains full context and caveats:
- ILO: ~25% of global employment has some GenAI exposure; 3.3% is in the highest exposure category.
- NBER customer-support field study: +14% average productivity; +34% for novice/lower-skilled workers.
- Denmark NBER study: no measurable average earnings/hours effect within two years; rules out effects >2%.
- PwC 2026: 62% average wage premium for jobs requiring AI skills in its job-ad comparison; AI-skill postings +69% vs +9% total job market; most AI-exposed US junior roles 7× more likely to request traditionally senior human-intensive skills.
- Stanford Aug 2026: 22–25-year-old workers in highly AI-exposed US occupations show a 19% relative employment gap versus less-exposed peers; do NOT present as sole causal effect of AI.
- OECD: broad youth labour-market deterioration predates current LLMs and current evidence does not show AI caused the whole trend.
- Project dataset: 71,913 records, median salary $138,750; experience medians Entry $85,469, Mid $122,000, Senior $156,160, Executive $190,000.
- Adjusted project-data association: AI/ML roles about +9.6% vs classified software/engineering roles, conditional on listed controls. Association, not causation.
- Conservatively classified AI/ML records: ~5.5% entry level and ~63.2% senior level. Do not claim this proves junior jobs were removed by AI.
- IMF India: 26% high AI exposure = 14% relatively complementary + 12% higher displacement risk.
- Dataset limitation: 83.6% US residence; only 0.3% India; 91.7% of rows are 2024–2025.

### Experience principles
- Guided story first, exploration second.
- Make uncertainty visible rather than burying it.
- Use motion to explain mechanisms, not decorate them.
- Every substantial number must be traceable to a claim ID/source or a derived data file.
- Provide a persistent “Evidence” affordance: source, date, population/method, caveat.
- Include an Explore view for salary data after the story introduces the Value Gap.
- Never fabricate qualitative quotes.
- Never imply that a correlation proves AI caused a salary or employment outcome.

### Required interactions
**Chapter 1 — Task Decomposer**
Show that a job is made of tasks. This interaction is conceptual/educational, not a new exposure estimator. Do not invent task-level probabilities.

**Chapter 2 — Productivity Lens**
Toggle average vs novice/lower-skilled result. Context label must say customer-support field study, n=5,179.

**Chapter 3 — Salary Explorer**
Use local derived files. Default to medians and show sample N. Allow role and experience exploration. Use IQR/range where useful. Add methodology drawer for adjusted model.

**Chapter 4 — Career Ladder**
Show the traditional path from routine work to experience to judgement, then show routine tasks being transformed/assisted. Present PwC + Stanford evidence, and make the OECD caveat impossible to miss.

**Chapter 5 — Skill Stack**
No fake “career score.” Let users open evidence for AI capability, judgement, verification, domain expertise, communication and responsibility.

**Chapter 6 — India Lens**
Use IMF/NASSCOM evidence. Do not use the project salary dataset for representative India salary claims.

### Visual direction
Follow `design_direction.json`. The feel should be editorial, contemporary and human—not cyberpunk. Avoid robot imagery, glowing brains and generic circuit graphics.

Use a restrained neutral base, one system/AI accent, one human/expertise accent and one caution accent. You have freedom to choose exact accessible colours.

Typography can be expressive for headlines but must remain highly legible for charts and citations.

### Technical direction
Build a responsive single-page web experience. React + TypeScript is preferred if supported by the environment; an equivalent component architecture is acceptable. Use local JSON/CSV data assets; no backend is required for v1.

Use SVG/D3, Recharts, or another suitable chart layer. Choose the simplest reliable tool for each interaction.

Create components for:
- ChapterShell
- EvidenceBadge / EvidenceDrawer
- StatCard
- SourceLink
- CaveatCallout
- TaskDecomposer
- ProductivityLens
- SalaryExplorer
- CareerLadder
- SkillStack
- IndiaLens

Keep story content/data separate from rendering components. Do not hard-code research facts across multiple UI files.

### Data safety / factual QA
Before finalising:
1. Search the codebase for every displayed number.
2. Verify each external number maps to a claim ID.
3. Verify each project-dataset number comes from a derived data file.
4. Check that Stanford C010 is displayed with OECD C011.
5. Check that 62% is labelled observational/job-ad wage premium.
6. Check that 9.6% is labelled adjusted association, not causation.
7. Check that India is sourced from external research, not the US-heavy salary dataset.
8. Check that no synthetic interview quote exists.
9. Add accessible text equivalents for every chart.
10. Test mobile and reduced-motion behaviour.

### Creative flexibility
You are encouraged to improve:
- visual composition
- transitions
- typography
- responsive behaviour
- interaction choreography
- loading/empty states
- microcopy

You are NOT allowed to creatively change:
- numeric facts
- source relationships
- sample/geography
- causal interpretation
- the presence of caveats
- the locked central question

Start by generating the information architecture and component/data architecture, then implement the complete experience.
