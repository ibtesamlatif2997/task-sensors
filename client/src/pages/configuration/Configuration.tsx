import React, { useEffect, useState } from 'react';
import { Button, Switch, TextField, Typography } from '@mui/material';
import { DropdownData } from '../../types/types';
import { APIService } from '../../services/api.service';


export default function Configuration() {
    const [classTypes, setClassTypes] = useState<DropdownData[]>([]);

    async function getFilters() {
        const data = await APIService.getFilters();
        setClassTypes(data.sensor_class)
    }

    useEffect(() => {
        getFilters()
    }, [])

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
                    <Switch defaultChecked />
                </div>
            </div>
            <div>
                <div style={{ float: "left" }}>
                    <Typography variant="h6">
                        Set events per
                    </Typography>
                </div>
                <div style={{ width: "100%", float: "right" }}>
                    <TextField id="standard-basic" label="Events per minute" variant="standard" />
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
                        return <div><TextField label={element._id} variant="standard" /></div>
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
                    <TextField id="standard-basic" label="System down time" variant="standard" />
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