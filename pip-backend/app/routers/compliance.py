from fastapi import APIRouter, HTTPException
from app.services.compliance import check_formula_compliance, scan_all_formulas
from app.models.formula import FormulaComplianceReport

router = APIRouter(prefix="/compliance", tags=["compliance"])


@router.get("/scan", summary="Scan all formulas for compliance issues")
def scan_library() -> list[dict]:
    return scan_all_formulas()


@router.get("/{formula_id}", response_model=FormulaComplianceReport,
            summary="Check compliance for a specific formula")
def check_formula(formula_id: str) -> FormulaComplianceReport:
    try:
        return check_formula_compliance(formula_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
