import axiosClient from './axiosClient'
// api/productApi.js
import { FormValues } from '../pages/Post'

const postApi = {
  createPost: (newPost: FormValues) => {
    const URL = `posts`
    return axiosClient.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ' Content-Type': 'multipart/form-data',
      },
    })
  },

  getById: (params: number) => {
    const URL = `posts/${params}`
    return axiosClient.get(URL)
  },

  getPostByThemeId: (
    themeId: number,
    limit: Number,
    threshold: Number | null
  ) => {
    const URL = `posts/theme?tid=${themeId}&limit=${limit}&threshold=${
      threshold ? threshold : ''
    }`
    return axiosClient.get(URL)
  },
  getPostNewest: (
    pcid?: Number | null,
    ccid?: number[] | null,
    dtid?: [] | null,
    limit?: Number,
    threshold?: Number
  ) => {
    const URL =
      `/v1/posts/newest?` +
      `${pcid ? `pcid=${pcid}` : ``}` +
      `${
        ccid
          ? `&${ccid?.map((n, index) => `ccid[${index}]=${n}`).join('&')}`
          : ``
      }` +
      `${
        dtid
          ? `&${dtid?.map((n, index) => `dtid[${index}]=${n}`).join('&')}`
          : ``
      }` +
      `&limit=${limit}${threshold ? `&threshold=${threshold}` : ``}`
    return axiosClient.get(URL)
  },
  updateStatusPost: (id: number, status: number) => {
    const URL = `/v1/posts/sta`
    return axiosClient.put(
      URL,
      { id, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },
  getPostRelated: (postId: number) => {
    const URL = `/v1/posts/related/${postId}`
    return axiosClient.get(URL)
  },
  getPostbyId: (params: number) => {
    const URL = `/v1/posts/${params}`
    return axiosClient.get(URL)
  },
  updatePostedInfo: (updatePost: FormValues) => {
    const URL = `/v1/posts/inf`

    return axiosClient.put(URL, updatePost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ' Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default postApi
