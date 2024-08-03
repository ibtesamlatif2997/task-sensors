from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext

from models.config import ToggleData, Config

from services.service import update_config, toggle_config

router = APIRouter()


@router.post("", response_description="Get filters data")
async def update_config_router(params: Config = Body(...)):
    return await update_config(params)


@router.post("/toggle", response_description="Get filters data")
async def set_toggle_onOff(params: ToggleData = Body(...)):
    return await toggle_config(params)
