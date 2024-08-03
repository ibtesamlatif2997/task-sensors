from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr



class Probability(BaseModel):
    bicycle: int
    car: int
    mobility_aid: int
    motorcycle: int
    pedestrian: int


class Config(Document):
    isGenerator: bool
    eventsFrequency: int
    probability: Probability
    systemDowntimeProb: int

    class Config:
        json_schema_extra = {
            "example": {
                "isGenerator": True,
                "eventsFrequency": 5,
                "probability": {
                    "bicycle": 5,
                    "car": 5,
                    "mobility_aid": 5,
                    "motorcycle": 5,
                    "pedestrian": 5,
                },
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
