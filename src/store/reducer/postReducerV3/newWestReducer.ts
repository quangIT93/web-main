import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: []
};

const postApiSlice = createSlice({
  name: 'postApi',
  initialState,
  reducers: {
    setPostNewestApiV3: (state, action) => {
      state.data = action.payload.data ?? [];
    },
    setPostNewestMoreApiV3: (state: any, action) => {
       state.data = [...state.data, ...action.payload.data]
    },
  },
});



export const { setPostNewestApiV3,setPostNewestMoreApiV3 } = postApiSlice.actions;
export default postApiSlice.reducer;