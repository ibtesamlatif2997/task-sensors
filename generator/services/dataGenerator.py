from datetime import datetime
import random

from models.config import Config
from models.sensordata import SensorData
from models.sensorhealth import SensorHealth

total_events = 0
events_counter = {}
sensors = [0, 1]
approach = ["EB", "NB", "SB", "WB"]
classes = []

async def sensor_data_generator():
    global total_events
    global events_counter
    global sensors
    global approach
    global classes

    bulk_data = []

    config = await Config.find_one()
    config = config.__dict__

    if(total_events == 0):
        classes = list(map(lambda x: x, dict(config["probability"]).keys()))

    if(config["isGenerator"]):
        for iterator in range(config["eventsFrequency"]):
            print(total_events)
            if(total_events == 100):
                events_counter = {}
                total_events = 0
                classes = list(map(lambda x: x, dict(config["probability"]).keys()))
                print(classes)

            total_events += 1

            if(len(classes) == 0):
                continue

            class_name = get_class_with_probability(config, classes)

            if(class_name == ""):
                continue

            my_data = SensorData(time=datetime.now(), 
                                 sensor_class=class_name, 
                                 sensor_id=sensors[random.randint(0, 1)], 
                                 approach=approach[random.randint(0, 3)])
            bulk_data.append(my_data)

        await SensorData.insert_many(bulk_data)
        bulk_data.clear()


def get_class_with_probability(config, classes):
    global events_counter

    print(">>> classes", classes)
    if(len(classes) == 0):
        return ""

    class_name = classes[random.randint(0, len(classes)-1)]

    if class_name in events_counter:
        events_counter[class_name] += 1
    else:
        events_counter[class_name] = 1 

    if(events_counter[class_name] > config["probability"].__dict__[class_name]):
        classes.remove(class_name)
        return get_class_with_probability(config, classes)

    return class_name