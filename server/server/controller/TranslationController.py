from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from DTO.TranslationScheme import TranslationRequest, TranslationResponse
import httpx
router = APIRouter()
AI_SERVICE_URL = "http://127.0.0.1:8100"
@router.post("/translateText", response_model=TranslationResponse)
async def translate_text(payload: TranslationRequest) -> TranslationResponse:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/translateText",
                json=payload.model_dump(),
                timeout=30.0,
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    