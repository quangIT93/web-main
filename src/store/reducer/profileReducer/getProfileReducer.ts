import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import profileApi from '../../../api/profileApi'
// import { RootState } from '..'
interface ProfileState {
  profile: any
  error: string | null
}

const initialState: ProfileState = {
  profile: null,
  error: null,
}

export const getProfile = createAsyncThunk(
  'profiles/s',
  async (_, { getState, rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      // Gọi API để lấy thông tin profile với accessToken đã có
      const languageRedux = JSON.parse(JSON.parse(localStorage.getItem("persist:root") as string)?.changeLaguage)["language"]

      if (accessToken) {
        const response = await profileApi.getProfile(
          languageRedux ?
            languageRedux == 1 ?
              "vi" :
              "en" :
            // languageRedux && 
            "vi"
        )

        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message)
      } else {
        return rejectWithValue('An error occurred')
      }
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.profile = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.profile = action.payload
        state.error = null
      }
    )

    builder.addCase(
      getProfile.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.profile = null
        state.error = action.payload as string
      }
    )
  },
})

export const { resetProfileState } = profileSlice.actions
export default profileSlice.reducer
