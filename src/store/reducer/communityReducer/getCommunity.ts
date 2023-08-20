import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: []
};

const postApiSlice = createSlice({
  name: 'postApi',
  initialState,
  reducers: {
    getCommunity: (state, action) => {
      state.data = action.payload.data ?? [];
    },
    // setPostNewestMoreApi: (state: any, action) => {
    //    state.data = [...state.data, ...action.payload.data]
    // },
  },
});



export const { getCommunity } = postApiSlice.actions;
export default postApiSlice.reducer;