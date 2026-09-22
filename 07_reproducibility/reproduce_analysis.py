"""
Reproduce the derived project-dataset files used in The New Value of Work.
Run from repository root:
    python 07_reproducibility/reproduce_analysis.py
"""
from pathlib import Path
import pandas as pd
import numpy as np
import math
import json
import statsmodels.formula.api as smf

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "02_data/raw/ai_jobs_salaries_clean.csv"
OUT = ROOT / "02_data/derived"
OUT.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(RAW)

def role_archetype(title):
    t = str(title).lower().strip()
    if any(k in t for k in [
        "machine learning","ml engineer","mlops","ai engineer","ai architect",
        "artificial intelligence","computer vision","nlp","natural language",
        "deep learning","prompt engineer","ai scientist","ai developer",
        "ai specialist","generative ai","genai"
    ]): return "AI / ML"
    if "data scientist" in t or "data science" in t: return "Data science"
    if any(k in t for k in ["data engineer","analytics engineer","data architect","etl","database engineer"]): return "Data engineering"
    if any(k in t for k in [
        "data analyst","business intelligence","bi developer","bi analyst",
        "business analyst","product analyst","analytics analyst","data analytics"
    ]): return "Analytics / BI"
    if any(k in t for k in ["research scientist","research engineer","applied scientist","research analyst"]): return "Research / applied science"
    if any(k in t for k in [
        "software engineer","software developer","software development engineer",
        "backend engineer","frontend engineer","full stack","developer","devops",
        "site reliability","platform engineer","systems engineer","solutions engineer"
    ]): return "Software / engineering"
    return "Other / general"

df["role_archetype"] = df["job_title"].map(role_archetype)

exp_order = ["EN","MI","SE","EX"]

exp = df.groupby(["experience_level","experience_level_label"])["salary_in_usd"].agg(
    count="count", median_usd="median", mean_usd="mean",
    p25_usd=lambda x:x.quantile(.25), p75_usd=lambda x:x.quantile(.75)
).reset_index()
exp["order"] = exp.experience_level.map({k:i for i,k in enumerate(exp_order)})
exp.sort_values("order").drop(columns="order").to_csv(OUT/"salary_by_experience.csv", index=False)

df.groupby("work_year")["salary_in_usd"].agg(count="count",median_usd="median",mean_usd="mean").reset_index().to_csv(OUT/"salary_by_year.csv",index=False)
df.groupby("work_mode")["salary_in_usd"].agg(count="count",median_usd="median",mean_usd="mean").reset_index().to_csv(OUT/"salary_by_work_mode.csv",index=False)
df.groupby("company_size")["salary_in_usd"].agg(count="count",median_usd="median",mean_usd="mean").reset_index().to_csv(OUT/"salary_by_company_size.csv",index=False)

role = df.groupby("role_archetype")["salary_in_usd"].agg(
    count="count",median_usd="median",mean_usd="mean",
    p25_usd=lambda x:x.quantile(.25),p75_usd=lambda x:x.quantile(.75)
).reset_index()
role.to_csv(OUT/"salary_by_role_archetype.csv",index=False)

top = df["job_title"].value_counts().head(40).index
df[df.job_title.isin(top)].groupby("job_title")["salary_in_usd"].agg(
    count="count",median_usd="median",mean_usd="mean",
    p25_usd=lambda x:x.quantile(.25),p75_usd=lambda x:x.quantile(.75)
).reset_index().sort_values("count",ascending=False).to_csv(OUT/"salary_by_top40_titles.csv",index=False)

comp = (pd.crosstab(df["role_archetype"],df["experience_level"],normalize="index")*100).reindex(columns=exp_order).reset_index()
comp.to_csv(OUT/"role_experience_composition.csv",index=False)

us = df[(df.employee_residence=="US")&(df.employment_type=="FT")&df.work_year.isin([2024,2025])&(df.role_archetype!="Other / general")]
us.pivot_table(index="role_archetype",columns="experience_level",values="salary_in_usd",aggfunc="median").reindex(columns=exp_order).reset_index().to_csv(OUT/"us_2024_25_role_experience_salary.csv",index=False)
us.pivot_table(index="role_archetype",columns="experience_level",values="salary_in_usd",aggfunc="count").reindex(columns=exp_order).fillna(0).astype(int).reset_index().to_csv(OUT/"us_2024_25_role_experience_counts.csv",index=False)

df[["job_title","role_archetype"]].drop_duplicates().sort_values(["role_archetype","job_title"]).to_csv(OUT/"job_title_to_role_archetype.csv",index=False)

# Adjusted association: 2024–25 full-time, classified roles
reg = df[df.work_year.isin([2024,2025]) & (df.employment_type=="FT") & (df.role_archetype!="Other / general")].copy()
reg["log_salary"]=np.log(reg["salary_in_usd"])
reg["role_archetype"]=pd.Categorical(reg["role_archetype"],categories=["Software / engineering","AI / ML","Data science","Data engineering","Analytics / BI","Research / applied science"])
reg["experience_level"]=pd.Categorical(reg["experience_level"],categories=exp_order)
m=smf.ols('log_salary ~ C(role_archetype, Treatment(reference="Software / engineering")) + C(experience_level, Treatment(reference="EN")) + C(work_year) + C(employee_residence) + C(work_mode) + C(company_size)',data=reg).fit(cov_type="HC1")
name=[x for x in m.params.index if "role_archetype" in x and "AI / ML" in x][0]
coef=float(m.params[name]); se=float(m.bse[name])
result={
    "analysis_population_n":len(reg),
    "sample":"2024–2025, full-time, classified role archetypes only",
    "estimated_salary_difference_pct":(math.exp(coef)-1)*100,
    "ci95_pct":[(math.exp(coef-1.96*se)-1)*100,(math.exp(coef+1.96*se)-1)*100],
    "controls":["experience level","work year","employee residence","work mode","company size"],
    "interpretation":"Association, not causation."
}
(OUT/"adjusted_ai_salary_association.json").write_text(json.dumps(result,indent=2),encoding="utf-8")
print("Derived files regenerated.")
