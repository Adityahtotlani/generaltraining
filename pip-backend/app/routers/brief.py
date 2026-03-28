from fastapi import APIRouter, HTTPException
from app.models.brief import BriefTranslationRequest, BriefTranslationResponse
from app.services.brief_translator import translate_brief

router = APIRouter(prefix="/brief", tags=["brief"])


@router.post("/translate", response_model=BriefTranslationResponse,
             summary="Translate a consumer/client brief into olfactive direction")
def translate(request: BriefTranslationRequest) -> BriefTranslationResponse:
    try:
        return translate_brief(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Brief translation failed: {str(e)}")
