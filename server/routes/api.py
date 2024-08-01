from fastapi import APIRouter, Body
from typing import Union

from services.sensors import get_hourly_counts, get_filters_data


router = APIRouter()

@router.get("/filters", response_description="Get hourly count")
async def get_filters():
    return await get_filters_data()


@router.get("/counts", response_description="Get hourly count")
async def get_hourly_stats(sensor_class: Union[str, None] = None, 
                      approach: Union[str, None] = None , 
                      sensor_id: Union[str, None] = None):
    params = {
        "sensor_class": sensor_class,
        "approach": approach,
        "sensor_id": sensor_id
    }
    return await get_hourly_counts(params)


@router.get("/pedestrian_counts", response_description="Get hourly count")
async def get_hourly_stats(sensor_class: Union[str, None] = None, 
                      approach: Union[str, None] = None , 
                      sensor_id: Union[str, None] = None):
    params = {
        "sensor_class": "pedestrian",
        "approach": approach,
        "sensor_id": sensor_id
    }
    return await get_hourly_counts(params)
