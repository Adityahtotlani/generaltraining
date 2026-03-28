from fastapi import APIRouter, HTTPException
from app.data.formulas import FORMULAS, FORMULAS_BY_ID
from app.models.formula import Formula, FormulaCostBreakdown
from app.data.ingredients import INGREDIENTS_BY_ID

router = APIRouter(prefix="/formulas", tags=["formulas"])


@router.get("", summary="List all formulas")
def list_formulas() -> list[dict]:
    return [
        {
            "id": f["id"],
            "name": f["name"],
            "version": f["version"],
            "application_type": f["application_type"],
            "perfumer": f.get("perfumer"),
            "client": f.get("client"),
            "tags": f.get("tags", []),
        }
        for f in FORMULAS
    ]


@router.get("/{formula_id}", summary="Get full formula detail")
def get_formula(formula_id: str) -> Formula:
    formula = FORMULAS_BY_ID.get(formula_id)
    if not formula:
        raise HTTPException(status_code=404, detail=f"Formula {formula_id} not found")
    return Formula(**formula)


@router.get("/{formula_id}/cost", response_model=FormulaCostBreakdown,
            summary="Get cost breakdown for a formula")
def get_formula_cost(formula_id: str) -> FormulaCostBreakdown:
    formula = FORMULAS_BY_ID.get(formula_id)
    if not formula:
        raise HTTPException(status_code=404, detail=f"Formula {formula_id} not found")

    ingredient_costs = []
    total_cost = 0.0

    for fi in formula["ingredients"]:
        ing = INGREDIENTS_BY_ID.get(fi["ingredient_id"])
        if not ing:
            continue
        contribution = (fi["percentage"] / 100) * ing["cost_per_kg_usd"]
        total_cost += contribution
        ingredient_costs.append({
            "ingredient_id": ing["id"],
            "ingredient_name": ing["common_name"],
            "percentage": fi["percentage"],
            "cost_per_kg_usd": ing["cost_per_kg_usd"],
            "contribution_usd": round(contribution, 4),
            "contribution_pct_of_total": 0.0,  # filled below
        })

    # Fill contribution percentages
    for ic in ingredient_costs:
        ic["contribution_pct_of_total"] = round(
            (ic["contribution_usd"] / total_cost * 100) if total_cost > 0 else 0.0, 1
        )

    top_3 = sorted(ingredient_costs, key=lambda x: x["contribution_usd"], reverse=True)[:3]
    top_3_names = [t["ingredient_name"] for t in top_3]

    # Simple optimization suggestions
    suggestions = []
    for ic in ingredient_costs:
        ing = INGREDIENTS_BY_ID[ic["ingredient_id"]]
        if ic["contribution_pct_of_total"] > 30 and ing["sourcing_type"] == "natural":
            suggestions.append(
                f"Consider a synthetic/captive alternative to {ic['ingredient_name']} "
                f"(drives {ic['contribution_pct_of_total']}% of cost)."
            )
        if ic["contribution_pct_of_total"] > 20 and ing["regulatory_status"] == "restricted":
            suggestions.append(
                f"{ic['ingredient_name']} is both a major cost driver and IFRA-restricted — "
                f"a compliant substitute could improve both COGs and compliance simultaneously."
            )

    if not suggestions:
        suggestions.append("Formula cost is well distributed. No single ingredient drives >20% of cost.")

    return FormulaCostBreakdown(
        formula_id=formula["id"],
        formula_name=formula["name"],
        total_cost_per_kg_usd=round(total_cost, 2),
        ingredient_costs=ingredient_costs,
        top_3_cost_drivers=top_3_names,
        optimization_suggestions=suggestions,
    )
