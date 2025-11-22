from fastapi import APIRouter, Depends, HTTPException
from db.session import get_db
from DTO.ParaphraseScheme import ParaphraseRequest, ParaphraseResponse
import httpx
from settings import api_list
router = APIRouter()

AI_SERVICE_URL = api_list.AI_SERVICE_URL
@router.post("/paraphrase", response_model=ParaphraseResponse)
async def translate_text(payload: ParaphraseRequest) -> ParaphraseResponse:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/paraphrazeText",
                json=payload.model_dump(),
                timeout=30.0,
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI paraphrase service error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    