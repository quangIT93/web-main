import axiosClient from './axiosClient'
// api/productApi.js

const bannersApi = {
  getBannersApi: (lang: string, order: string | null ) => {
    const URL = `/v1/banners/ena?v=2${order ? `&order=${order}`: ""}&lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default bannersApi
