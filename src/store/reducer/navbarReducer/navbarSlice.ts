import { createSlice } from '@reduxjs/toolkit'

interface INavbarState {
  valueSearchInput: string | undefined
}

const initialState: INavbarState = {
  valueSearchInput: undefined,
}

const navbarSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setValueSearchInput: (state, action) => {
      state.valueSearchInput = action.payload
    },
  },
})

export const { setValueSearchInput } = navbarSlice.actions

export default navbarSlice.reducer
