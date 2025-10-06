from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from DTO.User.UserScheme import UserResponse, UserCreate
from service.UserService import UserService
router = APIRouter()

    
@router.post("/register", response_model=UserResponse)
async def user_registration(user_data: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)
    new_user = service.register_user(username=user_data.username, password=user_data.password)
    return UserResponse.model_validate(new_user)