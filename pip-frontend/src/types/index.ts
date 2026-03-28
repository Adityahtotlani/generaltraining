export interface Ingredient {
  id: string
  inci_name: string
  common_name: string
  cas_number?: string
  sourcing_type: 'synthetic' | 'natural' | 'nature_identical' | 'biotechnology'
  olfactive_descriptors: string[]
  fragrance_family: string
  regulatory_status: 'compliant' | 'restricted' | 'banned' | 'under_review'
  ifra_limit_pct?: number
  ifra_amendment?: string
  is_eu_allergen: boolean
  eu_allergen_label_threshold_pct?: number
  cost_per_kg_usd: number
  biodegradability_score: number
  carbon_footprint_kg_co2_per_kg?: number
  sourcing_ethics_score: number
  sustainability_score: number
  supplier?: string
  notes?: string
}

export interface ComplianceFlag {
  ingredient_id: string
  ingredient_name: string
  issue_type: string
  current_pct: number
  limit_pct?: number
  amendment?: string
  severity: 'critical' | 'warning' | 'info'
  remediation: string
}

export interface FormulaComplianceReport {
  formula_id: string
  formula_name: string
  application_type: string
  overall_status: 'compliant' | 'warnings' | 'non_compliant'
  flags: ComplianceFlag[]
  total_cost_per_kg_usd: number
  sustainability_score: number
  checked_at: string
}

export interface FormulaSummary {
  id: string
  name: string
  version: string
  application_type: string
  perfumer?: string
  client?: string
  tags: string[]
}

export interface FormulaIngredient {
  ingredient_id: string
  percentage: number
}

export interface Formula extends FormulaSummary {
  brief_description?: string
  created_at: string
  updated_at: string
  ingredients: FormulaIngredient[]
  notes?: string
}

export interface SubstitutionCandidate {
  ingredient: Ingredient
  olfactive_similarity_score: number
  cost_delta_pct: number
  regulatory_status: string
  sustainability_score: number
  recommendation_reason: string
}

export interface OlfactiveDirection {
  fragrance_family: string
  sub_family?: string
  character_summary: string
  key_accords: string[]
  suggested_top_notes: string[]
  suggested_heart_notes: string[]
  suggested_base_notes: string[]
  emotion_mapping: Record<string, string>
  inspiration_references: string[]
  perfumer_starting_point: string
  confidence_score: number
}

export interface BriefTranslationResponse {
  original_brief: string
  olfactive_direction: OlfactiveDirection
  alternative_directions: OlfactiveDirection[]
  notes?: string
}

export interface KnowledgeEntry {
  id: string
  title: string
  entry_type: string
  author: string
  content: string
  related_ingredients: string[]
  related_formulas: string[]
  olfactive_descriptors: string[]
  application_types: string[]
  emotion_tags: string[]
  created_at: string
  updated_at: string
  tags: string[]
}

export interface LibraryScanResult {
  formula_id: string
  formula_name: string
  overall_status: string
  critical_flags: number
  warning_flags: number
  info_flags: number
  sustainability_score: number
  total_cost_per_kg_usd: number
}
