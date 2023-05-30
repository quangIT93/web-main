import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axiosClient from './axiosClient'
// api/productApi.js
const profileApi = {
  getProfile: () => {
    const URL = `profiles/s`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }) // Truyền email vào body của request
  },

  postAvatar: (imageAvt: any) => {
    const URL = `profiles/avt`
    return axiosClient.post(
      URL,
      { imageAvt },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    ) // Truyền email vào body của request
  },
}

export default profileApi
