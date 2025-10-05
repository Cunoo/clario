from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from pathlib import Path
from dotenv import load_dotenv


current_file = Path(__file__)

clario_path = current_file.parents[3]
#print(clario_path)


env_path = clario_path / ".env"
load_dotenv(dotenv_path=env_path)


# Get values from environment
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


required_vars = [DB_USERNAME, DB_HOST, DB_PORT, DB_NAME]
if any(v is None for v in required_vars):
    raise ValueError("One or more database environment variables are missing!")


# Build DATABASE_URL dynamically
if DB_PASSWORD:
    DATABASE_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
else:
    DATABASE_URL = f"postgresql://{DB_USERNAME}@{DB_HOST}:{DB_PORT}/{DB_NAME}"



engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autoflush=False, bind=engine, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
