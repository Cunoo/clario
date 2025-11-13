from sqlalchemy.orm import Session
from entity.User import User

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def add(self, user: User):
        self.db.add(user) # add user to session, not yet saed in DB

    def commit(self):
        self.db.commit() # save into DB

    def refresh(self, user: User):
        self.db.refresh(user) # reloads the object from the database

    def get_by_username(self, username: str):
        return self.db.query(User).filter(User.username == username).first()
