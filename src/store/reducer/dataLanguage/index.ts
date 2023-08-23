import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import languageApi from 'api/languageApi'
// import { RootState } from '..'
interface ProfileState {
  languages: any
  error: string | null
}

const initialState: ProfileState = {
    languages: null,
  error: null,
}

export const getLanguages = createAsyncThunk(
  'getLanguage',
  async (selectedLanguage: string, { getState, rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      // Gọi API để lấy thông tin profile với accessToken đã có
    //   const languageRedux = JSON.parse(JSON.parse(localStorage.getItem("persist:root") as string)?.changeLaguage)["language"]
        console.log("selectedLanguage", selectedLanguage);
        
      if (accessToken) {
        const response = await languageApi.getLanguage(
            selectedLanguage ?
            Number(selectedLanguage) === 1 ?
              "vi" :
              "en" :
            // languageRedux && 
            "vi"
            )
            console.log("selectedLanguage", selectedLanguage);
          console.log("response: " + response);
          

        return response.data
      }
    } catch (error) {
        // if (error instanceof AxiosError) {
          
            console.log("error: " + error);
            
    //     return rejectWithValue(error.response?.data?.message)
    //   } else {
    //     return rejectWithValue('An error occurred')
    //   }
    }
  }
)

const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    resetLanguageState: (state) => {
      state.languages = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLanguages.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.languages = action.payload
        state.error = null
      }
    )

    builder.addCase(
      getLanguages.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.languages = null
        state.error = action.payload as string
      }
    )
  },
})

export const { resetLanguageState } = languageSlice.actions
export default languageSlice.reducer
