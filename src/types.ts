export type EvidenceType =
  | 'external_quantitative'
  | 'external_qualitative_mixed'
  | 'external_quantitative_qualitative'
  | 'external_caveat'
  | 'project_dataset'
  | 'project_dataset_model'
  | 'project_dataset_quality';

export type { Occupation271 } from './data/occupations271';

export interface Claim {
  claim_id: string;
  chapter: string;
  evidence_type: EvidenceType;
  claim: string;
  value: any;
  unit: string | null;
  population: string;
  period: string;
  source_id: string;
  confidence: 'high' | 'medium_high' | 'medium' | 'medium_low';
  safe_wording: string;
  caveat: string;
}

export interface Source {
  source_id: string;
  organization: string;
  title: string;
  date: string;
  type: string;
  geography: string;
  url: string;
  method_note: string;
  use: string;
}

export interface QualitativeTheme {
  theme_id: string;
  theme: string;
  evidence: string;
  source_id: string;
  use: string;
}

export interface ExperienceSalary {
  experience_level: string;
  experience_level_label: string;
  count: number;
  median_usd: number;
  mean_usd: number;
  p25_usd: number;
  p75_usd: number;
}

export interface RoleFamilySalary {
  role_family: string;
  count: number;
  median_usd: number;
  mean_usd: number;
  p25_usd: number;
  p75_usd: number;
}

export interface CuratedOccupation {
  occupation_title: string;
  soc_code: string;
  job_category: string;
  education_required: string;
  median_annual_wage_usd: number;
  employment_2024: number;
  projected_growth_pct_2024_2034: number;
  growth_outlook: string;
  ai_exposure_llm_human: number;
  ai_exposure_llm_gpt4: number;
  ai_exposure_aioe: number;
  ai_exposure_level: 'Low' | 'Medium' | 'High';
  top_cognitive_ability: string;
  top_cognitive_family: string;
  distinctive_cognitive_strength: string;
  cognitive_demand_score: number;
  verbal_ability: number;
  reasoning_ability: number;
  quantitative_ability: number;
  memory_ability: number;
  perceptual_ability: number;
  spatial_ability: number;
  attention_ability: number;
  exposure_vs_median: string;
  growth_direction: string;
  four_futures_quadrant: string;
  tasks?: {
    name: string;
    type: 'automatable' | 'augmentable' | 'human_intensive';
    description: string;
  }[];
}
