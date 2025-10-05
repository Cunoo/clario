from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
router = APIRouter()


class UserController:
    
    
    
    @router.get("/register")
    async def user_registration(self, db: Session = Depends(get_db)):
        return {"message": "test"}