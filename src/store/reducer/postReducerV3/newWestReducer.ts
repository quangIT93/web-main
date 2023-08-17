import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: []
};

const postApiSlice = createSlice({
  name: 'postApi',
  initialState,
  reducers: {
    setPostNewestApi: (state, action) => {
      state.data = action.payload.data ?? [];
    },
    setPostNewestMoreApi: (state: any, action) => {
       state.data = [...state.data, ...action.payload.data]
    },
  },
});



export const { setPostNewestApi,setPostNewestMoreApi } = postApiSlice.actions;
export default postApiSlice.reducer;