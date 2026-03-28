from pydantic import BaseModel
from typing import Optional


class KnowledgeEntry(BaseModel):
    id: str
    title: str
    entry_type: str                 # "formula_note", "ingredient_insight", "technique", "trend"
    author: str                     # perfumer or FDM name
    content: str
    related_ingredients: list[str] = []
    related_formulas: list[str] = []
    olfactive_descriptors: list[str] = []
    application_types: list[str] = []
    emotion_tags: list[str] = []
    created_at: str
    updated_at: str
    tags: list[str] = []


class KnowledgeSearchRequest(BaseModel):
    query: str
    entry_types: list[str] = []
    olfactive_descriptors: list[str] = []
    emotion_tags: list[str] = []
    application_types: list[str] = []
    author: Optional[str] = None
    top_n: int = 10


class KnowledgeCreateRequest(BaseModel):
    title: str
    entry_type: str
    author: str
    content: str
    related_ingredients: list[str] = []
    related_formulas: list[str] = []
    olfactive_descriptors: list[str] = []
    application_types: list[str] = []
    emotion_tags: list[str] = []
    tags: list[str] = []
