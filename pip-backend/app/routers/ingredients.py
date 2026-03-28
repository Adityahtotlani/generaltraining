from fastapi import APIRouter, HTTPException, Query
from app.data.ingredients import INGREDIENTS, INGREDIENTS_BY_ID
from app.models.ingredient import Ingredient, IngredientSubstitutionRequest, SubstitutionCandidate
from app.services.substitution import find_substitutes

router = APIRouter(prefix="/ingredients", tags=["ingredients"])


@router.get("", summary="List all ingredients in the library")
def list_ingredients(
    regulatory_status: str | None = Query(None, description="Filter by status: compliant|restricted|banned"),
    fragrance_family: str | None = Query(None),
    sourcing_type: str | None = Query(None),
) -> list[Ingredient]:
    results = INGREDIENTS
    if regulatory_status:
        results = [i for i in results if i["regulatory_status"] == regulatory_status]
    if fragrance_family:
        results = [i for i in results if i["fragrance_family"] == fragrance_family]
    if sourcing_type:
        results = [i for i in results if i["sourcing_type"] == sourcing_type]
    return [Ingredient(**i) for i in results]


@router.get("/{ingredient_id}", summary="Get ingredient detail")
def get_ingredient(ingredient_id: str) -> Ingredient:
    ing = INGREDIENTS_BY_ID.get(ingredient_id)
    if not ing:
        raise HTTPException(status_code=404, detail=f"Ingredient {ingredient_id} not found")
    return Ingredient(**ing)


@router.post("/{ingredient_id}/substitutes", response_model=list[SubstitutionCandidate],
             summary="Find substitutes for an ingredient")
def get_substitutes(ingredient_id: str, request: IngredientSubstitutionRequest) -> list[SubstitutionCandidate]:
    try:
        return find_substitutes(
            ingredient_id=ingredient_id,
            reason=request.reason,
            target_application=request.target_application,
            max_cost_per_kg_usd=request.max_cost_per_kg_usd,
            min_sustainability_score=request.min_sustainability_score,
            top_n=request.top_n,
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
