from fastapi import FastAPI, Depends

from auth.jwt_bearer import JWTBearer
from config.config import initiate_database
from routes.routes import router as ConfigRouter
from fastapi.middleware.cors import CORSMiddleware
from services.dataGenerator import sensor_data_generator

from fastapi_utilities import repeat_every

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
    # await sensor_data_generator()


@app.on_event("startup")
@repeat_every(seconds=60)
async def cronjob():
    await sensor_data_generator()


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}

app.include_router(ConfigRouter, tags=["CONFIG"], prefix="/config", dependencies=[Depends(token_listener)],)
