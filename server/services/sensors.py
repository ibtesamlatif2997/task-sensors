from typing import List, Union
from models.sensordata import SensorData

sensordata_collection = SensorData


async def get_filters_data():
  sensors = await SensorData.aggregate([
                  {
                    "$group": {
                      "_id": '$sensor_id'
                    }
                  },
                  { "$sort": { "_id": 1 } }
                ]).to_list()

  approach = await SensorData.aggregate([
                  {
                    "$group": {
                      "_id": '$approach'
                    }
                  },
                  { "$sort": { "_id": 1 } }
                ]).to_list()

  return {
    "sensors": sensors,
    "approach": approach
  }


async def get_hourly_counts(params):
  match = {
    "$match": {}
  }

  if(params and params["sensor_class"] != None ):
    match["$match"]["sensor_class"] = params["sensor_class"]
    
  if(params and params["approach"] != None):
    match["$match"]["approach"] = params["approach"]
    
  if(params and params["sensor_id"] != None):
    match["$match"]["sensor_id"] = params["sensor_id"]     

  results = await SensorData.aggregate([
                    match,
                  {
                    "$group": {
                      "_id": {
                        "hour": { "$hour": '$time' },
                        "approach": '$approach'
                      },
                      "count": { "$sum": 1 }
                    }
                  },
                  { "$sort": { "_id": 1 } }
                ]).to_list()

  return results
    
