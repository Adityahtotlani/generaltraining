"""
Ingredient substitution engine — finds ranked alternatives by olfactive similarity,
cost delta, regulatory status, and sustainability.
"""
import numpy as np
from app.data.ingredients import INGREDIENTS, INGREDIENTS_BY_ID
from app.models.ingredient import SubstitutionCandidate, Ingredient


def _descriptor_vector(descriptors: list[str], vocabulary: list[str]) -> np.ndarray:
    """Binary bag-of-words vector over the shared descriptor vocabulary."""
    vec = np.zeros(len(vocabulary))
    for d in descriptors:
        if d in vocabulary:
            vec[vocabulary.index(d)] = 1.0
    return vec


def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(a, b) / (norm_a * norm_b))


def find_substitutes(
    ingredient_id: str,
    reason: str,
    target_application: str,
    max_cost_per_kg_usd: float | None = None,
    min_sustainability_score: float | None = None,
    top_n: int = 5,
) -> list[SubstitutionCandidate]:
    source = INGREDIENTS_BY_ID.get(ingredient_id)
    if not source:
        raise ValueError(f"Ingredient {ingredient_id} not found")

    # Build shared vocabulary from all descriptors in the library
    vocabulary: list[str] = sorted(
        {d for ing in INGREDIENTS for d in ing["olfactive_descriptors"]}
    )

    source_vec = _descriptor_vector(source["olfactive_descriptors"], vocabulary)

    candidates: list[SubstitutionCandidate] = []

    for ing in INGREDIENTS:
        if ing["id"] == ingredient_id:
            continue
        if ing["regulatory_status"] == "banned":
            continue

        # Apply filters
        if max_cost_per_kg_usd and ing["cost_per_kg_usd"] > max_cost_per_kg_usd:
            continue
        if min_sustainability_score and ing["sustainability_score"] < min_sustainability_score:
            continue

        candidate_vec = _descriptor_vector(ing["olfactive_descriptors"], vocabulary)
        similarity = _cosine_similarity(source_vec, candidate_vec)

        if similarity < 0.1:
            continue  # Too dissimilar to be a useful substitute

        cost_delta_pct = ((ing["cost_per_kg_usd"] - source["cost_per_kg_usd"])
                          / source["cost_per_kg_usd"]) * 100

        # Build recommendation reason
        reasons = []
        if ing["regulatory_status"] == "compliant":
            reasons.append("fully IFRA compliant")
        if ing["sustainability_score"] > source["sustainability_score"]:
            delta_sus = ing["sustainability_score"] - source["sustainability_score"]
            reasons.append(f"+{delta_sus:.0f}pt sustainability improvement")
        if cost_delta_pct < -10:
            reasons.append(f"{abs(cost_delta_pct):.0f}% lower cost")
        if ing.get("supplier") and "captive" in (ing.get("notes") or "").lower():
            reasons.append("DSM-Firmenich captive molecule (IP protected)")
        if not reasons:
            reasons.append("olfactively similar profile")

        candidates.append(SubstitutionCandidate(
            ingredient=Ingredient(**ing),
            olfactive_similarity_score=round(similarity, 3),
            cost_delta_pct=round(cost_delta_pct, 1),
            regulatory_status=ing["regulatory_status"],
            sustainability_score=ing["sustainability_score"],
            recommendation_reason="; ".join(reasons),
        ))

    # Sort: prioritise similarity, then sustainability
    candidates.sort(
        key=lambda c: (c.olfactive_similarity_score * 0.6 + c.sustainability_score / 100 * 0.4),
        reverse=True,
    )

    return candidates[:top_n]
