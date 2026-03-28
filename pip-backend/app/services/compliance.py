"""
Formula compliance checking against IFRA amendments and EU allergen regulations.
"""
from datetime import datetime
from app.data.ingredients import INGREDIENTS_BY_ID
from app.data.formulas import FORMULAS_BY_ID
from app.models.formula import FormulaComplianceReport, ComplianceFlag


def check_formula_compliance(formula_id: str) -> FormulaComplianceReport:
    formula = FORMULAS_BY_ID.get(formula_id)
    if not formula:
        raise ValueError(f"Formula {formula_id} not found")

    flags: list[ComplianceFlag] = []
    total_cost = 0.0
    sustainability_scores = []

    for fi in formula["ingredients"]:
        ing = INGREDIENTS_BY_ID.get(fi["ingredient_id"])
        if not ing:
            continue

        pct = fi["percentage"]
        cost_contribution = (pct / 100) * ing["cost_per_kg_usd"]
        total_cost += cost_contribution
        sustainability_scores.append(ing["sustainability_score"])

        # Check banned ingredients
        if ing["regulatory_status"] == "banned":
            flags.append(ComplianceFlag(
                ingredient_id=ing["id"],
                ingredient_name=ing["common_name"],
                issue_type="banned",
                current_pct=pct,
                limit_pct=0.0,
                amendment=ing.get("ifra_amendment"),
                severity="critical",
                remediation=f"Remove {ing['common_name']} entirely. It is banned under IFRA. "
                            f"See knowledge base for substitution guidance.",
            ))

        # Check IFRA concentration limits
        elif ing["regulatory_status"] == "restricted" and ing.get("ifra_limit_pct") is not None:
            limit = ing["ifra_limit_pct"]
            if pct > limit:
                flags.append(ComplianceFlag(
                    ingredient_id=ing["id"],
                    ingredient_name=ing["common_name"],
                    issue_type="ifra_exceeded",
                    current_pct=pct,
                    limit_pct=limit,
                    amendment=ing.get("ifra_amendment"),
                    severity="critical" if pct > limit * 2 else "warning",
                    remediation=(
                        f"Reduce {ing['common_name']} from {pct}% to max {limit}% "
                        f"({ing.get('ifra_amendment', 'IFRA')} limit for this application). "
                        f"Consider a compliant substitute to compensate for olfactive loss."
                    ),
                ))

        # Check EU allergen labeling
        if ing.get("is_eu_allergen") and ing.get("eu_allergen_label_threshold_pct") is not None:
            threshold = ing["eu_allergen_label_threshold_pct"]
            if pct > threshold:
                flags.append(ComplianceFlag(
                    ingredient_id=ing["id"],
                    ingredient_name=ing["common_name"],
                    issue_type="eu_allergen_declaration_required",
                    current_pct=pct,
                    limit_pct=threshold,
                    amendment="EU CLP Regulation 2026",
                    severity="info",
                    remediation=(
                        f"{ing['common_name']} must be declared on product labeling "
                        f"(present at {pct}%, threshold is {threshold}%). "
                        f"Ensure label/SDS reflects this allergen."
                    ),
                ))

    overall_status = "compliant"
    if any(f.severity == "critical" for f in flags):
        overall_status = "non_compliant"
    elif flags:
        overall_status = "warnings"

    avg_sustainability = (
        sum(sustainability_scores) / len(sustainability_scores)
        if sustainability_scores else 0.0
    )

    return FormulaComplianceReport(
        formula_id=formula["id"],
        formula_name=formula["name"],
        application_type=formula["application_type"],
        overall_status=overall_status,
        flags=flags,
        total_cost_per_kg_usd=round(total_cost, 2),
        sustainability_score=round(avg_sustainability, 1),
        checked_at=datetime.utcnow().isoformat() + "Z",
    )


def scan_all_formulas() -> list[dict]:
    """Return a summary compliance scan across all formulas in the library."""
    results = []
    for formula_id in FORMULAS_BY_ID:
        report = check_formula_compliance(formula_id)
        results.append({
            "formula_id": report.formula_id,
            "formula_name": report.formula_name,
            "overall_status": report.overall_status,
            "critical_flags": sum(1 for f in report.flags if f.severity == "critical"),
            "warning_flags": sum(1 for f in report.flags if f.severity == "warning"),
            "info_flags": sum(1 for f in report.flags if f.severity == "info"),
            "sustainability_score": report.sustainability_score,
            "total_cost_per_kg_usd": report.total_cost_per_kg_usd,
        })
    return results
