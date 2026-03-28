from pydantic import BaseModel
from typing import Optional


# ScentMove® emotion categories (DSM-Firmenich's verified lexicon)
SCENTMOVE_EMOTIONS = [
    "joy",
    "calm",
    "focus",
    "confidence",
    "sensuality",
    "nostalgia",
    "energy",
    "connection",
    "wonder",
]

FRAGRANCE_FAMILIES = [
    "floral",
    "oriental",
    "woody",
    "fresh",
    "fougere",
    "chypre",
    "gourmand",
    "aquatic",
    "green",
    "citrus",
    "aromatic",
    "powdery",
]


class BriefTranslationRequest(BaseModel):
    brief_text: str                             # free-form consumer/client brief
    target_emotions: list[str] = []             # from SCENTMOVE_EMOTIONS
    target_application: str = "fine_fragrance"
    target_gender_positioning: Optional[str] = None  # "feminine","masculine","unisex"
    price_tier: Optional[str] = None           # "mass","prestige","luxury","ultra_luxury"
    cultural_context: Optional[str] = None     # e.g. "Middle East", "East Asia"
    sustainability_priority: bool = False


class OlfactiveDirection(BaseModel):
    fragrance_family: str
    sub_family: Optional[str] = None
    character_summary: str
    key_accords: list[str]
    suggested_top_notes: list[str]
    suggested_heart_notes: list[str]
    suggested_base_notes: list[str]
    emotion_mapping: dict[str, str]             # emotion → olfactive rationale
    inspiration_references: list[str]           # existing fragrance references
    perfumer_starting_point: str                # actionable brief for the perfumer
    confidence_score: float                     # 0-1


class BriefTranslationResponse(BaseModel):
    original_brief: str
    olfactive_direction: OlfactiveDirection
    alternative_directions: list[OlfactiveDirection] = []
    notes: Optional[str] = None
