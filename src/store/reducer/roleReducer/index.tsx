import { createSlice } from '@reduxjs/toolkit'

const changeRole = createSlice({
    name: 'changeRole',
    initialState: {
        role: 0,
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
    },
})

export const { setRole } = changeRole.actions
export default changeRole.reducer
