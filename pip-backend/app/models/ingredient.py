from pydantic import BaseModel
from typing import Optional
from enum import Enum


class RegulatoryStatus(str, Enum):
    COMPLIANT = "compliant"
    RESTRICTED = "restricted"
    BANNED = "banned"
    UNDER_REVIEW = "under_review"


class SourcingType(str, Enum):
    SYNTHETIC = "synthetic"
    NATURAL = "natural"
    NATURE_IDENTICAL = "nature_identical"
    BIOTECHNOLOGY = "biotechnology"


class Ingredient(BaseModel):
    id: str
    inci_name: str
    common_name: str
    cas_number: Optional[str] = None
    sourcing_type: SourcingType
    olfactive_descriptors: list[str]
    fragrance_family: str
    regulatory_status: RegulatoryStatus
    ifra_limit_pct: Optional[float] = None          # max % in leave-on product
    ifra_amendment: Optional[str] = None            # which amendment set the limit
    is_eu_allergen: bool = False
    eu_allergen_label_threshold_pct: Optional[float] = None
    cost_per_kg_usd: float
    biodegradability_score: float                   # 0-100
    carbon_footprint_kg_co2_per_kg: Optional[float] = None
    sourcing_ethics_score: float                    # 0-100
    sustainability_score: float                     # composite 0-100
    supplier: Optional[str] = None
    notes: Optional[str] = None


class IngredientSubstitutionRequest(BaseModel):
    ingredient_id: str
    reason: str                                     # "restricted" | "cost" | "sustainability"
    target_application: str                         # e.g. "fine_fragrance", "body_lotion"
    max_cost_per_kg_usd: Optional[float] = None
    min_sustainability_score: Optional[float] = None
    top_n: int = 5


class SubstitutionCandidate(BaseModel):
    ingredient: Ingredient
    olfactive_similarity_score: float               # 0-1
    cost_delta_pct: float                           # negative = cheaper
    regulatory_status: RegulatoryStatus
    sustainability_score: float
    recommendation_reason: str
