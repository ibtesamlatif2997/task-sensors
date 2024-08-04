

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
    probability: {
        bicycle: number,
        car: number,
        mobility_aid: number,
        motorcycle: number,
        pedestrian: number,
    }
    systemDowntimeProb: number
}