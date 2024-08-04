import React, { useEffect, useState } from 'react';
import { Alert, Button, Switch, TextField, Typography } from '@mui/material';
import { DropdownData, ConfigData } from '../../types/types';
import { APIService } from '../../services/api.service';
import { GeneratorService } from '../../services/generator.service';

export default function Configuration() {
    const [classTypes, setClassTypes] = useState<DropdownData[]>([]);
    const [configData, setConfigData] = useState<ConfigData | any>({
        probability: {}
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


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

    function handleChange(key: string, value: any, type: string = "") {
        let params: any = {};

        if (key === "isGenerator") {
            params[key] = value;
        }
        else {
            params[key] = parseInt(value);
        }

        if (type !== "") {
            params.type = type;
        }

        console.log("params", params)
        let config: any;
        if (params.probability) {
            config = {
                probability: {
                    ...configData.probability
                }
            };
            config["probability"][params.type] = params.probability;
        }
        else {
            config = params
        }

        console.log("config", config)

        setConfigData({
            ...configData,
            ...config
        })
    }

    async function applyFilters() {
        try {
            const resp = await GeneratorService.create(configData);
            if (resp) {
                setSuccess("Config updated successfully")
            }
        }
        catch (error) {
            setError("Server error")
        }
    }

    return (
        <div>
            {error !== "" &&
                <Alert variant="outlined" severity={error ? "error" : "success"} onClose={() => { setError(""); setSuccess("") }}>
                    {error ? error : success}
                </Alert>
            }
            <div>
                <div style={{ float: "left" }}>
                    <Typography variant="h6">
                        Generator ON/OFF
                    </Typography>
                </div>
                <div style={{ width: "100%", float: "right" }}>
                    <Switch checked={configData.isGenerator} onChange={(events) => { handleChange("isGenerator", events.target.checked) }} />
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
                        <TextField
                            inputProps={{
                                min: 0
                            }}
                            value={configData.eventsFrequency} onChange={(events) => { handleChange("eventsFrequency", events.target.value) }}
                            type="number"
                            label="Events per minute"
                            variant="standard" />
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
                        return (
                            <div>
                                <TextField
                                    inputProps={{
                                        min: 0
                                    }}
                                    value={configData.probability[element._id]} onChange={(events) => { handleChange("probability", events.target.value, `${element._id}`) }}
                                    type="number"
                                    label={element._id + " %"}
                                    variant="standard" />
                            </div>
                        )
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
                        <TextField
                            inputProps={{
                                min: 0
                            }}
                            value={configData.systemDowntimeProb} onChange={(events) => { handleChange("systemDowntimeProb", events.target.value) }}
                            type="number"
                            label="System down time"
                            variant="standard" />
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