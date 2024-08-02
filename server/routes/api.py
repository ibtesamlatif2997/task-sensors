from fastapi import APIRouter, Body
from typing import Union

from services.sensors import get_hourly_counts, get_filters_data


router = APIRouter()

@router.get("/filters", response_description="Get filters data")
async def get_filters():
    return await get_filters_data()


@router.get("/counts", response_description="Get hourly count")
async def get_hourly_stats(sensor_class: Union[str, None] = None, 
                      approach: Union[str, None] = None , 
                      sensor: Union[str, None] = None,
                      date: Union[str, None] = None):
    params = {
        "sensor_class": sensor_class,
        "approach": approach,
        "sensor_id": sensor,
        "date": date
    }
    return await get_hourly_counts(params)


@router.get("/pedestrian_counts", response_description="Get pedestrian hourly count")
async def get_hourly_stats(sensor_class: Union[str, None] = None, 
                      approach: Union[str, None] = None , 
                      sensor: Union[str, None] = None,
                      date: Union[str, None] = None):
    params = {
        "sensor_class": "pedestrian",
        "approach": approach,
        "sensor_id": sensor,
        "date": date
    }
    return await get_hourly_counts(params)


@router.get("/hourly_data", response_description="Get hourly, class count")
async def get_hourly_stats(sensor_class: Union[str, None] = None, 
                      approach: Union[str, None] = None , 
                      sensor: Union[str, None] = None,
                      date: Union[str, None] = None):
    params = {
        "sensor_class": sensor_class,
        "approach": approach,
        "sensor_id": sensor,
        "date": date,
        "aggregate_class": True
    }
    
    stats = await get_hourly_counts(params)
    data = []
    for stat in stats:
        data.append({
            "hour": stat["_id"]["hour"],
            "class": f"{stat['_id']['sensor_class']}-{stat['_id']['approach']}",
            "count": stat['count']
        })
    
    return data
