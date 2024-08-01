import React, { useEffect, useState } from 'react';

import { APIService } from '../../services/api.service';

import Graph from '../../components/Graph';
import { Button, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dropdown from '../../components/Dropdown';
import { DropdownData } from '../../types/types';
import { useSelector } from 'react-redux';

// import Datagrid from '../components/Datagrid';



export default function Dashboard() {
    const [hourlyData, setHourlyData] = useState<any>([]);
    const [pedistrianData, setPedistrianData] = useState<any>([]);
    const [sensorFilters, setSensorFilters] = useState<DropdownData[]>([]);
    const [approachFilters, setApproachFilters] = useState<DropdownData[]>([]);

    const filters = useSelector((state:any) => state.filters)

    useEffect(() => {
        getHourlyData();
        getPedistrianData();
        getFilters();
    }, [])
    console.log("filters:", filters);

    useEffect(() => {
        console.log("filters:", filters);

    }, [filters])

    async function getHourlyData() {
        const data = await APIService.getHourlyData(filters);
        setHourlyData(data)
    }

    async function getPedistrianData() {
        const data = await APIService.getPedestrianCounts(filters);
        setPedistrianData(data)
    }

    async function getFilters() {
        const data = await APIService.getFilters();
        setSensorFilters(data.sensors)
        setApproachFilters(data.approach)
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: "5px", marginBottom:"50px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                </LocalizationProvider>
                <Dropdown data={sensorFilters} label="Sensors" type="sensors"></Dropdown>
                <Dropdown data={approachFilters} label="Approaches" type="approach"></Dropdown>
                <Button variant="contained">Apply</Button>
            </div>
            <Container>

                {hourlyData.length > 0 && <Graph data={hourlyData}></Graph>}
                {pedistrianData.length > 0 && <Graph data={pedistrianData}></Graph>}
            </Container>
        </>
    )
}