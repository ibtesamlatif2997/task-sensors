import React, { useEffect, useState } from 'react';

import { APIService } from '../../services/api.service';

import Graph from '../../components/Graph';
import { Button, Container, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dropdown from '../../components/Dropdown';
import { DropdownData } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../redux/slices/filterSlice';

import Datagrid from '../../components/Datagrid';


export default function Dashboard() {
    const dispatch = useDispatch()

    const [hourlyData, setHourlyData] = useState<any>([]);
    const [hourlyClassData, setHourlyClassData] = useState<any>([]);
    const [pedistrianData, setPedistrianData] = useState<any>([]);
    const [sensorFilters, setSensorFilters] = useState<DropdownData[]>([]);
    const [approachFilters, setApproachFilters] = useState<DropdownData[]>([]);

    let filters = useSelector((state: any) => state.filters)

    useEffect(() => {
        getHourlyData();
        getPedistrianData();
        getHourlyDataByClass();
        getFilters();

        setInterval(() => {
            applyFilters();
        }, 3000)
    }, [])

    async function getHourlyData() {
        const data = await APIService.getHourlyData(filters);
        setHourlyData(data)
    }

    async function getPedistrianData() {
        const data = await APIService.getPedestrianCounts(filters);
        setPedistrianData(data)
    }

    async function getHourlyDataByClass() {
        const data = await APIService.getHourlyDataByClass(filters);
        setHourlyClassData(data)
    }

    async function getFilters() {
        const data = await APIService.getFilters();
        setSensorFilters(data.sensors)
        setApproachFilters(data.approach)
    }

    function applyFilters() {
        getHourlyData();
        getPedistrianData();
        getHourlyDataByClass();
    }

    function resetFilters() {
        filters = {
            sensor: null,
            date: null,
            datetime: null,
            approach: null
        }
        dispatch(setFilters(filters));
        applyFilters();
    }

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: "space-between", margin: "5px", height: "40px", marginBottom: "50px", width: "70%" }}>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={filters.datetime} onChange={(newValue) => dispatch(setFilters({ date: newValue }))} />
                        </LocalizationProvider>
                    </FormControl>
                    <Dropdown data={sensorFilters} value={filters.sensor} label="Sensors" type="sensor"></Dropdown>
                    <Dropdown data={approachFilters} value={filters.approach} label="Approaches" type="approach"></Dropdown>
                    <FormControl>
                        <Button variant="outlined" color="error" onClick={resetFilters}>Reset</Button>
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" color="success" onClick={applyFilters}>Apply</Button>
                    </FormControl>
                </div>
                <div>
                    <Graph data={hourlyData}></Graph>
                    <Graph data={pedistrianData}></Graph>
                    <div>
                        {hourlyClassData.length > 0 && <Datagrid data={hourlyClassData}></Datagrid>}
                    </div>
                </div>
            </div>
        </>
    )
}