// import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
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

interface IInfoEducationCreate {
  companyName: string
  major: string
  startDate: number
  endDate: number
  extraInformation: string
}

interface IInfoEducationUpdate {
  educationId?: number | null
  companyName: string
  major: string
  startDate: number
  endDate: number
  extraInformation: string
}

const profileApi = {
  getProfile: (lang: string) => {
    const URL = `/v1/profiles/s?lang=${lang}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }) // Truyền email vào body của request
  },

  postAvatar: (images: any) => {
    const URL = `/v1/profiles/avt`
    return axiosClient.put(URL, images, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ' Content-Type': 'multipart/form-data',
      },
    }) // Truyền email vào body của request
  },

  putProfilePersonal: (infoPersonal: IInfoPersonal) => {
    const URL = `/v1/profiles/per`
    return axiosClient.put(URL, infoPersonal, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }) // Truyền email vào body của request
  },

  updateContact: (infoContact: InfoContact) => {
    const URL = `/v1/profiles/con`
    return axiosClient.put(URL, infoContact, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  updateProfileLocation: (locationIds: string[]) => {
    const URL = `/v1/profiles/loc`
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
    const URL = `/v1/profiles/cat`
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
  updateProfileEducation: (infoEducation: IInfoEducationUpdate) => {
    const URL = `/v1/profiles/edu/u`
    return axiosClient.put(URL, infoEducation, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  createProfileEducation: (infoEducation: IInfoEducationCreate) => {
    const URL = `/v1/profiles/edu/c`
    return axiosClient.put(URL, infoEducation, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  deleteProfileEducation: (educationId?: number | null) => {
    const URL = `/v1/profiles/edu/d`
    return axiosClient.put(
      URL,
      { educationId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },

  updateProfileExperience: (infoExperience: any) => {
    const URL = `/v1/profiles/exp/u`
    return axiosClient.put(URL, infoExperience, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  createProfileExperience: (infoEducation: any) => {
    const URL = `/v1/profiles/exp/c`
    return axiosClient.put(URL, infoEducation, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  deleteProfileExperience: (experienceId?: number | null) => {
    const URL = `/v1/profiles/exp/d`
    return axiosClient.put(
      URL,
      { experienceId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },

  createCV: (file: any) => {
    const URL = `/v1/profiles/cv`
    return axiosClient.post(URL, file, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  deleteCV: () => {
    const URL = `/v1/profiles/cv`
    return axiosClient.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  updateCV: (file: any) => {
    const URL = `/v1/profiles/cv`
    return axiosClient.put(URL, file, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default profileApi
