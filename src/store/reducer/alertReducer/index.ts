import { createSlice } from '@reduxjs/toolkit'

const showAlert = createSlice({
  name: 'alert',
  initialState: {
    alert: false,
  },
  reducers: {
    setAlertSave: (state, action) => {
      state.alert = action.payload
      },
      setAlertCancleSave: (state, action) => {
        state.alert = action.payload
      },
  },
})

export const { setAlertSave , setAlertCancleSave } = showAlert.actions
export default showAlert.reducer
