import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import postApi from 'api/postApi'
import { RootState } from '..'
interface PostState {
  postLoading: boolean
  post: any
  error: string | null
}

const initialState: PostState = {
  postLoading: false,
  post: null,
  error: null,
}

interface IPostId {
  postId: number
}

export const getPostById = createAsyncThunk(
  'postById',
  async ({ postId }: IPostId, { getState, rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      // Gọi API để lấy thông tin profile với accessToken đã có

      if (accessToken) {
        const response = await postApi.getPostbyId(postId)

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

const postByIdSlice = createSlice({
  name: 'postById',
  initialState,
  reducers: {
    resetPostByIdState: (state) => {
      state.post = null
      state.error = null
      state.postLoading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPostById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.post = action.payload
        state.postLoading = true
        state.error = null
      }
    )

    builder.addCase(
      getPostById.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.post = null
        state.postLoading = false
        state.error = action.payload as string
      }
    )
  },
})

export const { resetPostByIdState } = postByIdSlice.actions
export default postByIdSlice.reducer
