import React, { useEffect, useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DropdownData } from '../types/types';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';


export default function Dropdown({ data, label, value, type }: { data: DropdownData[], label: string, value: string, type: string }) {
    // const filters = useSelector((state:any) => state.filters)
    const dispatch = useDispatch()
    const selectChange = (event: SelectChangeEvent) => {
        const data: any = {};
        data[type] = event.target.value;
        dispatch(setFilters(data))
    }

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                style={{ width: '100px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={selectChange}
            >
                {data.map(element => {
                    return <MenuItem value={element._id}>{element._id}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}