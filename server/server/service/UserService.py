from sqlalchemy.orm import Session
from repository.UserRepository import UserRepository
from fastapi import HTTPException, status
from entity.User import User
class UserService:
    
    def __init__(self, db):
        self.repo = UserRepository(db)
        
    def register_user(self, username:str, password:str) -> User:
        existing_user = self.repo.get_by_username(username)
        if existing_user:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail="Username already exists"
            )
        new_user = User(username=username, password=password)
        self.repo.add(new_user)
        self.repo.commit()
        self.repo.refresh(new_user)
        return new_user
        