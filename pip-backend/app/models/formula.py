from pydantic import BaseModel, field_validator
from typing import Optional
from enum import Enum


class ApplicationType(str, Enum):
    FINE_FRAGRANCE = "fine_fragrance"
    EAU_DE_TOILETTE = "eau_de_toilette"
    BODY_LOTION = "body_lotion"
    SHOWER_GEL = "shower_gel"
    SHAMPOO = "shampoo"
    LAUNDRY = "laundry"
    CANDLE = "candle"
    DIFFUSER = "diffuser"


class ComplianceFlag(BaseModel):
    ingredient_id: str
    ingredient_name: str
    issue_type: str                 # "ifra_exceeded", "eu_allergen_unlabeled", "banned"
    current_pct: float
    limit_pct: Optional[float]
    amendment: Optional[str]
    severity: str                   # "critical", "warning", "info"
    remediation: str


class FormulaIngredient(BaseModel):
    ingredient_id: str
    percentage: float               # 0-100, sum of all must equal 100

    @field_validator("percentage")
    @classmethod
    def validate_percentage(cls, v: float) -> float:
        if not 0 < v <= 100:
            raise ValueError("Percentage must be between 0 and 100")
        return round(v, 4)


class Formula(BaseModel):
    id: str
    name: str
    version: str = "1.0"
    application_type: ApplicationType
    brief_description: Optional[str] = None
    perfumer: Optional[str] = None
    client: Optional[str] = None
    created_at: str
    updated_at: str
    ingredients: list[FormulaIngredient]
    notes: Optional[str] = None
    tags: list[str] = []


class FormulaComplianceReport(BaseModel):
    formula_id: str
    formula_name: str
    application_type: ApplicationType
    overall_status: str             # "compliant", "warnings", "non_compliant"
    flags: list[ComplianceFlag]
    total_cost_per_kg_usd: float
    sustainability_score: float
    checked_at: str


class FormulaCostBreakdown(BaseModel):
    formula_id: str
    formula_name: str
    total_cost_per_kg_usd: float
    ingredient_costs: list[dict]    # [{ingredient, pct, cost_per_kg, contribution_usd}]
    top_3_cost_drivers: list[str]
    optimization_suggestions: list[str]
