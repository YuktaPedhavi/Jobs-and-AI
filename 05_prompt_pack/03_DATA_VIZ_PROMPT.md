# GOOGLE AI STUDIO — DATA VISUALISATION IMPLEMENTATION PROMPT

Use `04_platform_seed/visualization_specs.json` plus files in `02_data/derived/`.

Rules:
1. Median is the default salary statistic.
2. Show N for every filtered salary view.
3. Do not use raw yearly row counts as job-market growth.
4. If a cell is very small, flag or suppress it rather than implying precision.
5. Use the US 2024–2025 role×experience files only when the UI clearly labels that scope.
6. Role archetypes are a project-derived conservative classification; expose the methodology in the UI.
7. External statistics with different populations/methodologies must not share an axis that falsely implies direct comparability.
8. C009, C010 and C011 should be separate evidence blocks.
9. India exposure can use a stacked 14 + 12 = 26 visual because those categories belong to the same IMF framework.
10. Give every chart a screen-reader-friendly textual summary.

Build chart components from data rather than hard-coding displayed values.
