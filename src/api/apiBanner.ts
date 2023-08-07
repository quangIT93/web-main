import axiosClient from './axiosClient'
// api/productApi.js

const bannersApi = {
  getBannersApi: (lang: string) => {
    const URL = `/v1/banners/ena?v=2&lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default bannersApi
