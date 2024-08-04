from models.config import Config, ToggleData, Probability


async def get_config():
    config = await Config.find_one()
    return config


async def toggle_config(params: ToggleData)-> Config:
    config = await Config.find_one()
    if(config != None):
        config.isGenerator = params.isGenerator  
        return await config.save()

    else:
        configData = Config(isGenerator=params.isGenerator)
        configData.save()

async def update_config(params: Config)-> Config:
    config = await Config.find_one()
    if(config != None):
        config.isGenerator = params.isGenerator
        config.probability = params.probability
        config.eventsFrequency = params.eventsFrequency
        config.systemDowntimeProb = params.systemDowntimeProb  
        return await config.save()

    else:
        return await params.create()


async def initiate_config():
    config = Config(eventsFrequency=5, isGenerator=True, systemDowntimeProb=5, probability=Probability(bicycle=20, car=20, mobility_aid=20, motorcycle=20, pedestrian=20))
    
    await update_config(config)