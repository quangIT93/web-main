import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import profileApi from '../../../api/profileApi'
import { RootState } from '..'

interface IInfoPersonal {
  name: string
  birthday: number
  gender: number
  address: number
  introduction: string
}

interface ProfileState {
  data: IInfoPersonal | null
  error: string | null
}

const initialState: ProfileState = {
  data: null,
  error: null,
}

export const putProfileInfoPersonal = createAsyncThunk(
  'profile/getProfile',
  async (
    { name, birthday, gender, address, introduction }: IInfoPersonal,
    { getState, rejectWithValue }
  ) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      // Gọi API để lấy thông tin profile với accessToken đã có

      if (accessToken) {
        const response = await profileApi.putProfilePersonal({
          name,
          birthday,
          gender,
          address,
          introduction,
        })

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
  name: 'putProfilePersonal',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.data = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      putProfileInfoPersonal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload
        state.error = null
      }
    )

    builder.addCase(
      putProfileInfoPersonal.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.data = null
        state.error = action.payload as string
      }
    )
  },
})

export const { resetProfileState } = profileSlice.actions
export default profileSlice.reducer
