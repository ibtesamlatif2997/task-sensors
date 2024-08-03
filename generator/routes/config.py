from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext

from auth.jwt_handler import sign_jwt
from services.admin import add_admin
from generator.models.config import Admin
from schemas.admin import AdminData, AdminSignIn

router = APIRouter()


