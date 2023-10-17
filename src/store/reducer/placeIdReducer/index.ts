import { createSlice } from '@reduxjs/toolkit'

const changePlaceId = createSlice({
    name: 'changePlaceId',
    initialState: {
        placeId: 0,
    },
    reducers: {
        setPalceId: (state, action) => {
            state.placeId = action.payload
        },
    },
})

export const { setPalceId } = changePlaceId.actions
export default changePlaceId.reducer
