import pandas as pd
from models.sensordata import SensorData
from models.sensorhealth import SensorHealth
from models.admin import Admin
from passlib.context import CryptContext

hash_helper = CryptContext(schemes=["bcrypt"])

async def process_sensor_data(file):
    print("processing sensor data")
    for chunk in pd.read_csv(file, 
                usecols=['time', 'class', "sensor_id", "approach"], chunksize=100):
        results = chunk.to_dict(orient='records')

        bulk_data = []
        print("inserting number of records:", len(results))

        for rec in results:
            my_data = SensorData(time=rec["time"], 
                                 sensor_class=rec["class"], 
                                 sensor_id=rec["sensor_id"], 
                                 approach=rec["approach"])

            bulk_data.append(my_data)

        await SensorData.insert_many(bulk_data)
        bulk_data.clear()


async def process_health_data(file):
    print("processing sensor data")
    for chunk in pd.read_csv(file, 
                usecols=['time', 'sensorId', "dataCaptureRate", "online", "fault"], chunksize=100):
        results = chunk.to_dict(orient='records')

        print("results count", len(results))
        bulk_data = []

        for rec in results:
            health_data = SensorHealth(time=rec["time"], 
                                 sensor_id=rec["sensorId"],
                                 data_capture_rate=rec["dataCaptureRate"],
                                 online=rec["online"],
                                 fault=rec["fault"])

            bulk_data.append(health_data)

        await SensorHealth.insert_many(bulk_data)
        bulk_data.clear()


async def add_user():
    existing = await Admin.find_one(Admin.email=="ibtesam@gmail.com")

    if(not existing):
        admin = Admin(email="ibtesam@gmail.com", fullname="Ibtesam Latif", password=hash_helper.encrypt("12345"))
        await admin.create()