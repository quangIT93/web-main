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

interface InfoContact {
  phone: string
  email: string
  facebook: string
  linkedin: string
}

interface IInfoEducation {
  educationId: number | null
  companyName: string
  major: string
  startDate: number
  endDate: number
  extraInformation: string
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
    return axiosClient.put(URL, images, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ' Content-Type': 'multipart/form-data',
      },
    }) // Truyền email vào body của request
  },

  putProfilePersonal: (infoPersonal: IInfoPersonal) => {
    const URL = `profiles/per`
    return axiosClient.put(URL, infoPersonal, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }) // Truyền email vào body của request
  },

  updateContact: (infoContact: InfoContact) => {
    const URL = `profiles/con`
    return axiosClient.put(URL, infoContact, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  updateProfileLocation: (locationIds: string[]) => {
    const URL = `profiles/loc`
    return axiosClient.put(
      URL,
      { locationIds },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },
  updateProfileCareer: (categoryIds: Number[]) => {
    console.log('cate', categoryIds)
    const URL = `profiles/cat`
    return axiosClient.put(
      URL,
      { categoryIds },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },
  updateProfileEducation: (infoEducation: IInfoEducation) => {
    const URL = `profiles/edu/u`
    return axiosClient.put(URL, infoEducation, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  updateProfileExperienceL: (infoExperience: any) => {
    const URL = `profiles/exp/u`
    return axiosClient.put(URL, infoExperience, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}

export default profileApi
