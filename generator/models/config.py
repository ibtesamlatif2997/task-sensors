from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr


class Config(Document):
    isGenerator: bool
    eventsFrequency: int
    bicycleProb: int
    carProb: int
    mobilityAidProb: int
    motorcycleProb: int
    pedestrianProb: int
    systemDowntimeProb: int

    class Config:
        json_schema_extra = {
            "example": {
                "isGenerator": True,
                "eventsFrequency": 5,
                "bicycleProb": 5,
                "carProb": 5,
                "mobilityAidProb": 5,
                "motorcycleProb": 5,
                "pedestrianProb": 5,
                "systemDowntimeProb": 5,
            }
        }

    class Settings:
        name = "config"
        
        
class ToggleData(BaseModel):
    isGenerator: bool

    class Config:
        json_schema_extra = {
            "example": {
                "isGenerator": True,
            }
        }
