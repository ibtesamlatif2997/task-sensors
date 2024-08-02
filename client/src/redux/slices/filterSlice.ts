import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        sensor: null,
        date: null,
        datetime: null,
        approach: null
    },
    reducers: {
        setFilters: (state, action) => {
            if (action.payload && action.payload.date) {
                return {
                    ...state,
                    ...action.payload,
                    date: moment(action.payload.date["$d"]).format('YYYY-MM-DD')
                }
            }
            else {
                return {
                    ...state,
                    ...action.payload
                }
            }

        }
    },
})

// Action creators are generated for each case reducer function
export const { setFilters } = filterSlice.actions

export default filterSlice.reducer