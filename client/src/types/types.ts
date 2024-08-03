

export type DropdownData = {
    _id: string | number
}

export type Password = {
    username: string,
    password: string
}

export type ConfigData = {
    isGenerator: boolean,
    eventsFrequency: number,
    bicycleProb: number,
    carProb: number,
    mobilityAidProb: number,
    motorcycleProb: number,
    pedestrianProb: number,
    systemDowntimeProb: number
}