from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller.UserController import router as userController

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=True, # type: ignore
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(userController, prefix="/registration")