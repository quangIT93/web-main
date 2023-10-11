import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [] as any
};

const locationApiSlice = createSlice({
  name: 'locationApi',
  initialState,
  reducers: {
    setLocationApi: (state, action) => {
      state.data = action.payload.data ?? [];
    },
  },
});



export const { setLocationApi } = locationApiSlice.actions;
export default locationApiSlice.reducer;