"""
Perfumer knowledge base — search and create entries.
"""
from datetime import datetime
from app.data.knowledge import KNOWLEDGE_ENTRIES, KNOWLEDGE_BY_ID
from app.models.knowledge import KnowledgeEntry, KnowledgeSearchRequest, KnowledgeCreateRequest
import uuid


def search_knowledge(request: KnowledgeSearchRequest) -> list[KnowledgeEntry]:
    query_lower = request.query.lower()
    results = []

    for entry in KNOWLEDGE_ENTRIES:
        score = 0

        # Text match in title and content
        if query_lower in entry["title"].lower():
            score += 3
        if query_lower in entry["content"].lower():
            score += 2

        # Filter by type
        if request.entry_types and entry["entry_type"] not in request.entry_types:
            continue

        # Filter by author
        if request.author and request.author.lower() not in entry["author"].lower():
            continue

        # Boost for olfactive descriptor overlap
        for desc in request.olfactive_descriptors:
            if desc in entry["olfactive_descriptors"]:
                score += 1

        # Boost for emotion tag overlap
        for emotion in request.emotion_tags:
            if emotion in entry["emotion_tags"]:
                score += 1

        # Boost for application type overlap
        for app_type in request.application_types:
            if app_type in entry["application_types"]:
                score += 1

        # Include if query matches or no query (return all)
        if query_lower == "" or score > 0:
            results.append((score, entry))

    results.sort(key=lambda x: x[0], reverse=True)
    return [KnowledgeEntry(**e) for _, e in results[: request.top_n]]


def create_knowledge_entry(request: KnowledgeCreateRequest) -> KnowledgeEntry:
    now = datetime.utcnow().isoformat() + "Z"
    entry_id = f"kb_{uuid.uuid4().hex[:8]}"

    entry = {
        "id": entry_id,
        "title": request.title,
        "entry_type": request.entry_type,
        "author": request.author,
        "content": request.content,
        "related_ingredients": request.related_ingredients,
        "related_formulas": request.related_formulas,
        "olfactive_descriptors": request.olfactive_descriptors,
        "application_types": request.application_types,
        "emotion_tags": request.emotion_tags,
        "created_at": now,
        "updated_at": now,
        "tags": request.tags,
    }

    # In production this would persist to PostgreSQL
    KNOWLEDGE_ENTRIES.append(entry)
    KNOWLEDGE_BY_ID[entry_id] = entry

    return KnowledgeEntry(**entry)


def get_entry(entry_id: str) -> KnowledgeEntry | None:
    entry = KNOWLEDGE_BY_ID.get(entry_id)
    return KnowledgeEntry(**entry) if entry else None
