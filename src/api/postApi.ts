import axiosClient from './axiosClient'
// api/productApi.js
import { FormValues } from '../pages/Post'

const postApi = {
  createPost: (newPost: FormValues) => {
    const URL = `v1/posts`
    return axiosClient.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createPostV3: (newPost: FormValues) => {
    const URL = `v3/posts`
    return axiosClient.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getPost: (lang: string) => {
    const URL = `v1/posts?limit=10?lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getById: (params: number, lang: string) => { 
    const URL = `v1/posts/${params}?lang=${lang}`
    return axiosClient.get(URL)
  },


  getPostByThemeId: (
    themeId: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string
  ) => {
    const URL = `v1/posts/theme?${themeId ? `tid=${themeId}&` : `tid=1&`}limit=${limit}&lang=${lang}&threshold=${threshold}`
    return axiosClient.get(URL
      // ,
      // {
      //   headers: {
      //     'Cache-Control': 'private, max-age=300'
      //   },
      // }
    )
  },
  getPostNewest: (
    pcid: number | null,
    ccid: number[] | null,
    dtid: [] | null,
    limit: number | null,
    threshold: number | null,
    lang: string
  ) => {
    const URL =
      `/v1/posts/newest?` +
      `${pcid ? `pcid=${pcid}` : ``}` +
      `${ccid
        ? `&${ccid?.map((n, index) => `ccid[${index}]=${n}`).join('&')}`
        : ``
      }` +
      `${dtid
        ? `&${dtid?.map((n, index) => `dtid[${index}]=${n}`).join('&')}`
        : ``
      }` +
      `&limit=${limit}${threshold ? `&threshold=${threshold}` : ``}` +
      `&lang=${lang}`
    return axiosClient.get(URL
      // , {
      // headers: {
      //   'Cache-Control': 'private, max-age=300'
      // },
      // }
    )
  },
  getPostNewestV3: (
    childrenCategoryId: any[] | null,
    parentCategoryId: number | null,
    districtIds: any[] | null,
    provinceId: number | null,
    limit: number | null,
    threshold: number | null,
    lang: string
  ) => {

    
    const URL =
      `/v3/posts/newest?` +
      `${childrenCategoryId
        ? `${childrenCategoryId?.map((n, index) => `childrenCategoryId[${index}]=${n}`).join('&')}`
        : ``
      }` +
      `${parentCategoryId && parentCategoryId !== 1 ? `&parentCategoryId=${parentCategoryId}&` : ``}` +
      `${districtIds
        ? `${districtIds?.map((n: any, index) => `districtIds=${n?.id}`).join('&')}&`
        : ``
      }` +
      `${provinceId ? `provinceId=${provinceId}&` : ``}` +
      `limit=${limit}${threshold ? `&threshold=${threshold}` : ``}` +
      `&lang=${lang}`
    return axiosClient.get(URL
      // , {
      // headers: {
      //   'Cache-Control': 'private, max-age=300'
      // },
      // }
    )
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
  getPostRelated: (postId: number, lang: string) => {
    const URL = `/v1/posts/related/${postId}?lang=${lang}`
    return axiosClient.get(URL)
  },
  getPostbyId: (params: number, lang: string) => {
    const URL = `/v1/posts/${params}?lang=${lang}`
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

  getPostV3: (id: number, lang: string) => {
    const URL = `v3/posts/${id}?lang=${lang}`
    return axiosClient.get(URL)
  }
}

export default postApi
