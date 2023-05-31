import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axiosClient from './axiosClient'
// api/productApi.js

interface IInfoPersonal {
  name: string
  birthday: number
  gender: number
  address: number
  introduction: string
}
const profileApi = {
  getProfile: () => {
    const URL = `profiles/s`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }) // Truyền email vào body của request
  },

  postAvatar: (images: any) => {
    const URL = `profiles/avt`
    return axiosClient.put(
      URL,
      { images },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          ' Content-Type': 'multipart/form-data',
        },
      }
    ) // Truyền email vào body của request
  },

  putProfilePersonal: (infoPersonal: IInfoPersonal) => {
    const URL = `profiles/per`
    return axiosClient.put(
      URL,
      { infoPersonal },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          ' Content-Type': 'multipart/form-data',
        },
      }
    ) // Truyền email vào body của request
  },
}

export default profileApi
