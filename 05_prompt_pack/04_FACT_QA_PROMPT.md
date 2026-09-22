# GOOGLE AI STUDIO — FACT / CLAIM QA PROMPT

Act as a research editor reviewing the built site.

Use:
- `03_sources/claim_database.json`
- `03_sources/source_registry.json`
- `02_data/derived/*`
- `01_research/RESEARCH_DOSSIER.md`

Return a table with:
- UI location
- displayed claim
- claim ID / data file
- correct?
- causal wording safe?
- sample/geography visible?
- caveat visible?
- required change

Automatically flag:
- “AI will replace 25% of jobs”
- “AI caused the 19% youth employment gap”
- “AI skills cause a 62% salary increase”
- “AI causes a 9.6% salary premium”
- project-dataset claims about Indian salaries
- raw record-count trend presented as jobs growth
- unsourced or synthetic quotations
- any number not present in the claim database or derived files

Then patch the content/code to resolve every flagged issue without weakening the storytelling.
