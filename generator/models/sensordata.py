from beanie import Document, Indexed
from pydantic import BaseModel
from datetime import datetime


class SensorData(Document):
    time: Indexed(datetime)
    sensor_class: Indexed(str)
    sensor_id: Indexed(int)
    approach: Indexed(str)

    class Config:
        json_schema_extra = {
            "example": {
                "time": "2024-07-17 00:00:37.662000+00:00",
                "sensor_class": "car",
                "sensor_id": 1,
                "approach": "NB",
            }
        }

    class Settings:
        name = "sensordata"
