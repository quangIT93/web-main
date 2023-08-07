import { createSlice } from '@reduxjs/toolkit'

const changeLaguage = createSlice({
    name: 'changeLaguage',
    initialState: {
        language: Number,
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { setLanguage } = changeLaguage.actions
export default changeLaguage.reducer
