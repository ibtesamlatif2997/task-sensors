import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        sensors: "",
        date: "",
        approach: ""
    },
    reducers: {
        setFilters: (state, action) => {
            console.log("setFilters", action)
            return {
                ...state,
                ...action.payload
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setFilters } = filterSlice.actions

export default filterSlice.reducer