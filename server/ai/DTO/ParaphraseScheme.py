from pydantic import BaseModel


class ParaphraseRequest(BaseModel):
    input_text: str
    number_of_sequencies: int
    lang: str

class ParaphraseResponse(BaseModel):
    input_text: str
    output_texts: list[str]
    number_of_sequencies: int
