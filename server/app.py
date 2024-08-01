from fastapi import FastAPI, Depends

from auth.jwt_bearer import JWTBearer
from config.config import initiate_database

from routes.admin import router as AdminRouter
from routes.api import router as APIRouter

from fastapi.middleware.cors import CORSMiddleware

from data.ingest_data import process_sensor_data, process_health_data

app = FastAPI()

token_listener = JWTBearer()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def start_database():
    await initiate_database()
    # await process_sensor_data("./data/data_counts.csv")
    # await process_health_data("./data/data_system.csv")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}

app.include_router(AdminRouter, tags=["Administrator"], prefix="/admin")
app.include_router(APIRouter, tags=["API"],prefix="/api",dependencies=[Depends(token_listener)],)
