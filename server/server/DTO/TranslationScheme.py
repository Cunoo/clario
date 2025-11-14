from pydantic import BaseModel

class TranslationRequest(BaseModel):
    src_lang: str
    src_text: str
    destination_lang: str

class TranslationResponse(BaseModel):
    source_text: str
    source_lang: str
    translated_text: str
    target_lang: str
