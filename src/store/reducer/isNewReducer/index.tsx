import { createSlice } from '@reduxjs/toolkit';

const isNewUser = createSlice({
  name: 'isNewUser',
  initialState: {
    newUser: false,
  },
  reducers: {
    setIsNew: (state, action) => {
      state.newUser = action.payload;
    },
  },
});

export const { setIsNew } = isNewUser.actions;
export default isNewUser.reducer;
