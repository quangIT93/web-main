import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [] as any
};

const profileMeCompanyReducerV3ApiSlice = createSlice({
  name: 'proifileApi',
  initialState,
  reducers: {
    setProfileMeCompanyV3: (state, action) => {
      state.data = action.payload.data ?? [];
    },
  },
});



export const { setProfileMeCompanyV3 } = profileMeCompanyReducerV3ApiSlice.actions;
export default profileMeCompanyReducerV3ApiSlice.reducer;