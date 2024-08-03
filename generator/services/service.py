from models.config import Config


async def toggle_config(params: Config)-> Config:
    config = await Config.find_one()
    if(config != None):
        config.isGenerator = params.isGenerator  
        return await config.save()

    else:
        return await params.create()


async def update_config(params: Config)-> Config:
    config = await Config.find_one()
    if(config != None):
        config.isGenerator = params.isGenerator
        config.bicycleProb = params.bicycleProb
        config.carProb = params.carProb
        config.eventsFrequency = params.eventsFrequency
        config.mobilityAidProb = params.mobilityAidProb
        config.motorcycleProb = params.motorcycleProb  
        config.pedestrianProb = params.pedestrianProb  
        config.systemDowntimeProb = params.systemDowntimeProb  
        return await config.save()

    else:
        return await params.create()