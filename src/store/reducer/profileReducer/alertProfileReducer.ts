import { createSlice } from '@reduxjs/toolkit'

const alertProfile = createSlice({
  name: 'alert',
  initialState: {
    alert: false,
    alertSuccess: false,
    alertLackInfo: false,
    alertEditInfo: false,
  },
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setAlertSuccess: (state, action) => {
      state.alertSuccess = action.payload
    },
    setAlertLackInfo: (state, action) => {
      state.alertLackInfo = action.payload
    },
    setAlertEditInfo: (state, action) => {
      state.alertEditInfo = action.payload
    },
  },
})

export const { setAlert,setAlertSuccess,setAlertLackInfo,setAlertEditInfo } = alertProfile.actions
export default alertProfile.reducer
