from fastapi import APIRouter, Depends, HTTPException
from models.Paraphrase import Paraphrase
from DTO.ParaphraseScheme import ParaphraseRequest, ParaphraseResponse
from models.Translation import Translation
router = APIRouter()
parahrazer = Paraphrase()
translation = Translation()
@router.post("/paraphraseText", response_model=ParaphraseResponse)
async def translate_text(payload: ParaphraseRequest) -> ParaphraseResponse:
    input_for_parahrase = payload.input_text
    
    if payload.lang != 'en':
        translated = await translation.translate_language(
            src_lang=payload.lang, src_text=input_for_parahrase,
            destination_lang="en"
        )
        input_for_parahrase = translated["translated_text"]
    try:    
        result = await parahrazer.get_paraphrase(
            input_text=input_for_parahrase,
            sequences=payload.number_of_sequencies,
        )
        if payload.lang != "en":
            translated_outputs = []
            for paraphrase in result["output_texts"]:
                translated = await translation.translate_language(
                src_lang="en", src_text=paraphrase,
                destination_lang=payload.lang
                )
                translated_outputs.append(translated["translated_text"])
            result["output_texts"] = translated_outputs
            #result["number_of_senquencies"] = payload.number_of_senquencies
        return result # type: ignore
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))