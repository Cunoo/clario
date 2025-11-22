from pydantic import BaseModel


class ParaphraseRequest(BaseModel):
    input_text: str
    output_text: str
    number_of_senquencies: int

class ParaphraseResponse(BaseModel):
    input_text: str
    output_text: str
    number_of_senquencies: int
 