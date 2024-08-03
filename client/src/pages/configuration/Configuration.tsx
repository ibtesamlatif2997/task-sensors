import React, { useEffect, useState } from 'react';
import { Button, Switch, TextField, Typography } from '@mui/material';
import { DropdownData, ConfigData } from '../../types/types';
import { APIService } from '../../services/api.service';
import { GeneratorService } from '../../services/generator.service';

export default function Configuration() {
    const [classTypes, setClassTypes] = useState<DropdownData[]>([]);
    const [configData, setConfigData] = useState<ConfigData | any>({
        probability: {}
    });

    async function getFilters() {
        const data = await APIService.getFilters();
        setClassTypes(data.sensor_class)
        getConfig();
    }

    async function getConfig() {
        const data = await GeneratorService.get();
        setConfigData(data)
    }

    useEffect(() => {
        getFilters()
    }, [])

    function handleChange(params: any) {
        setConfigData({
            ...configData,
            ...params
        })
    }

    async function applyFilters() {

    }

    return (
        <div>
            <div>
                <div style={{ float: "left" }}>
                    <Typography variant="h6">
                        Generator ON/OFF
                    </Typography>
                </div>
                <div style={{ width: "100%", float: "right" }}>
                    <Switch checked={configData.isGenerator} onChange={(events) => { handleChange({ isGenerator: events.target.value }) }} />
                </div>
            </div>
            <div>
                <div style={{ float: "left" }}>
                    <Typography variant="h6">
                        Set events
                    </Typography>
                </div>
                <div style={{ width: "100%", float: "right" }}>
                    <div>
                        <TextField value={configData.eventsFrequency} onChange={(events) => { handleChange({ eventsFrequency: events.target.value }) }} type="number" label="Events per minute" variant="standard" />
                    </div>
                </div>
            </div>
            <div>
                <div style={{ float: "left" }}>
                    <Typography variant="h6">
                        Set probability
                    </Typography>
                </div>
                <div style={{ width: "100%", float: "right" }}>
                    {classTypes.map(element => {
                        return <div><TextField value={configData.probability[element._id]} type="number" label={element._id} variant="standard" /></div>
                    })}
                </div>
            </div>

            <div>
                <div style={{ float: "left" }}>
                    <Typography variant="h6">
                        Set probability of system downtime
                    </Typography>
                </div>
                <div style={{ width: "100%", float: "right" }}>
                    <div>
                        <TextField value={configData.systemDowntimeProb} onChange={(events) => { handleChange({ systemDowntimeProb: events.target.value }) }} type="number" label="System down time" variant="standard" />
                    </div>
                </div>
            </div>

            <div>
                <div style={{ float: "right" }}>
                    <Button variant="contained" onClick={applyFilters}>Apply</Button>
                </div>
            </div>

        </div>
    )

}