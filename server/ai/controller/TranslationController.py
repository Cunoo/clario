from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.Translation import Translation
from DTO.TranslationScheme import TranslationResponse, TranslationRequest


router = APIRouter()
translator = Translation()
@router.post("/translateText", response_model=TranslationResponse)
async def translate_text(payload: TranslationRequest) -> TranslationResponse:
    try:
        result = await translator.translate_language(
            src_lang=payload.src_lang,
            src_text=payload.src_text,
            destination_lang=payload.destination_lang,
        )
        return result # type: ignore
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))