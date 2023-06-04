import { createSlice } from '@reduxjs/toolkit'

const alertProfile = createSlice({
  name: 'alert',
  initialState: {
    alert: false,
  },
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload
    },
  },
})

export const { setAlert } = alertProfile.actions
export default alertProfile.reducer
