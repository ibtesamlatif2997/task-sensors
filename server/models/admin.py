from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr


class Admin(Document):
    fullname: str
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "Ibtesam Latif",
                "email": "ibtesam@gmail.com",
                "password": "12345",
            }
        }

    class Settings:
        name = "admin"


class AdminSignIn(HTTPBasicCredentials):
    class Config:
        json_schema_extra = {
            "example": {"username": "ibtesam@gmail.com", "password": "12345"}
        }


class AdminData(BaseModel):
    fullname: str
    email: EmailStr

    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "Ibtesam Latif",
                "email": "ibtesam@gmail.com",
            }
        }
