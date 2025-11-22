from fastapi import APIRouter, Depends, HTTPException
from models.Paraphrase import Paraphrase
from DTO.ParaphraseScheme import ParaphraseRequest, ParaphraseResponse

router = APIRouter()
parahrazer = Paraphrase()
@router.post("/paraphrazeText", response_model=ParaphraseResponse)
async def translate_text(payload: ParaphraseRequest) -> ParaphraseResponse:
    try:
        result = await parahrazer.get_paraphrase(
            input_text=payload.input_text,
            sequences=payload.number_of_senquencies,
        )
        return result # type: ignore
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))