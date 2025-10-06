from pydantic import BaseModel, constr

class UserCreate(BaseModel):
    username: constr(min_length=1) # type: ignore
    password: constr(min_length=1) # type: ignore


class UserResponse(BaseModel):
    id: int
    username: str

    model_config = {
        "from_attributes": True  # nahrádza orm_mode=True
    }