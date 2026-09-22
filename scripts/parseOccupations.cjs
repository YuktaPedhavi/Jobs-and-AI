const fs = require('fs');

const csv = fs.readFileSync('02_DATA/derived/occupation_exposure_enriched.csv', 'utf8');
const lines = csv.trim().split('\n');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const items = [];
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  const vals = parseCSVLine(lines[i]);
  const obj = {
    occupation_title: vals[0].replace(/^"|"$/g, ''),
    soc_code: vals[1],
    job_category: vals[2],
    education_required: vals[3].replace(/^"|"$/g, ''),
    median_annual_wage_usd: parseFloat(vals[4]) || 0,
    employment_2024: parseFloat(vals[5]) || 0,
    projected_growth_pct_2024_2034: parseFloat(vals[6]) || 0,
    growth_outlook: vals[7],
    ai_exposure_llm_human: parseFloat(vals[8]) || 0,
    ai_exposure_llm_gpt4: parseFloat(vals[9]) || 0,
    ai_exposure_aioe: parseFloat(vals[10]) || 0,
    ai_exposure_level: vals[11],
    top_cognitive_ability: vals[12],
    top_cognitive_family: vals[13],
    distinctive_cognitive_strength: vals[14],
    cognitive_demand_score: parseFloat(vals[15]) || 0,
    verbal_ability: parseFloat(vals[16]) || 0,
    reasoning_ability: parseFloat(vals[17]) || 0,
    quantitative_ability: parseFloat(vals[18]) || 0,
    memory_ability: parseFloat(vals[19]) || 0,
    perceptual_ability: parseFloat(vals[20]) || 0,
    spatial_ability: parseFloat(vals[21]) || 0,
    attention_ability: parseFloat(vals[22]) || 0,
    exposure_vs_median: vals[23],
    growth_direction: vals[24],
    four_futures_quadrant: vals[25],
    human_gpt4_gap: parseFloat(vals[26]) || 0,
    abs_human_gpt4_gap: parseFloat(vals[27]) || 0
  };
  items.push(obj);
}

const content = `export interface Occupation271 {
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
  ai_exposure_level: string;
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
  human_gpt4_gap: number;
  abs_human_gpt4_gap: number;
}

export const occupations271: Occupation271[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync('src/data/occupations271.ts', content);
console.log('Successfully generated src/data/occupations271.ts with ' + items.length + ' occupations.');
