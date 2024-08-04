from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext

from models.config import ToggleData, Config

from services.service import update_config, toggle_config, get_config

router = APIRouter()


@router.post("", response_description="Get filters data")
async def update_config_router(params: Config = Body(...)):
    return await update_config(params)

@router.get("", response_description="Get filters data")
async def get_config_router():
    return await get_config()
