import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import signInEmailApi from '../../../api/authApi'
import { AxiosError } from 'axios'

interface AuthState {
  isLoggedIn: boolean
  isverifyOtp: boolean
  accountId: string | null
  accessToken: string | null
  refreshToken: string | null
  error: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  isverifyOtp: false,
  accountId: null,
  accessToken: null,
  refreshToken: null,
  error: null,
}
export const signInEmail = createAsyncThunk(
  'sign-in/email',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await signInEmailApi.signInEmail(email)
      console.log('response', response)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message)
      } else {
        return rejectWithValue('An error occurred')
      }
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'sign-in/email/verify',
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await signInEmailApi.verifyOtp(email, otp)
      console.log('response.data', response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message)
      } else {
        return rejectWithValue('An error occurred')
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoggedIn = false
      state.isverifyOtp = false
      state.accountId = null
      state.accessToken = null
      state.refreshToken = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      signInEmail.fulfilled,
      (state, action: PayloadAction<unknown>) => {
        state.isLoggedIn = true
        state.error = null
      }
    )
    builder.addCase(
      signInEmail.rejected,
      (state, action: PayloadAction<unknown, string>) => {
        state.isLoggedIn = false
        state.error = action.payload as string
      }
    )
    builder.addCase(
      verifyOtp.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoggedIn = true
        state.isverifyOtp = true
        state.accountId = action.payload.accountId
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.error = null
      }
    )
    builder.addCase(
      verifyOtp.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.accountId = null
        state.accessToken = null
        state.refreshToken = null
        state.error = action.payload as string // Chuyển kiểu dữ liệu của action.payload thành string
      }
    )
  },
})

export const { resetAuthState } = authSlice.actions
export default authSlice.reducer
