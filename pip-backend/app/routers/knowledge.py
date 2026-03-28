from fastapi import APIRouter, HTTPException
from app.models.knowledge import (
    KnowledgeEntry, KnowledgeSearchRequest, KnowledgeCreateRequest
)
from app.services.knowledge_base import search_knowledge, create_knowledge_entry, get_entry

router = APIRouter(prefix="/knowledge", tags=["knowledge"])


@router.post("/search", response_model=list[KnowledgeEntry],
             summary="Search the perfumer knowledge base")
def search(request: KnowledgeSearchRequest) -> list[KnowledgeEntry]:
    return search_knowledge(request)


@router.post("", response_model=KnowledgeEntry,
             summary="Add a new entry to the knowledge base")
def create(request: KnowledgeCreateRequest) -> KnowledgeEntry:
    return create_knowledge_entry(request)


@router.get("/{entry_id}", response_model=KnowledgeEntry,
            summary="Get a specific knowledge entry")
def get(entry_id: str) -> KnowledgeEntry:
    entry = get_entry(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail=f"Entry {entry_id} not found")
    return entry
