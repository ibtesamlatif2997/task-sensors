from beanie import Document, Indexed
from pydantic import BaseModel
from datetime import datetime


class SensorHealth(Document):
    time: Indexed(datetime)
    sensor_id: Indexed(int)
    data_capture_rate: int
    online: Indexed(int)
    fault: Indexed(int)

    class Config:
        json_schema_extra = {
            "example": {
                "time": "2024-07-17 00:00:37.662000+00:00",
                "sensor_id": 0,
                "data_capture_rate": 100,
                "online": True,
                "fault": False,
            }
        }

    class Settings:
        name = "sensorhealth"
