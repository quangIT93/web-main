import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [] as any
};

const profileMeInformationReducerV3ApiSlice = createSlice({
  name: 'proifileApi',
  initialState,
  reducers: {
    setProfileMeInformationMoreV3: (state, action) => {
      state.data = action.payload.data ?? [];
    },
  },
});



export const { setProfileMeInformationMoreV3 } = profileMeInformationReducerV3ApiSlice.actions;
export default profileMeInformationReducerV3ApiSlice.reducer;