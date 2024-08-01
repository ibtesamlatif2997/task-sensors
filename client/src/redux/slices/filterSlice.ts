import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        sensors: null,
        date: "",
        approach: ""
    },
    reducers: {
        setFilters: (state, action) => {
            return {
                ...state,
                sensors: action.payload.sensors
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setFilters } = filterSlice.actions

export default filterSlice.reducer