import axiosClient from './axiosClient'
// api/productApi.js

const bannersApi = {
  getBannersApi: () => {
    const URL = `/v1/banners/ena?v=2`
    return axiosClient.get(URL)
  },
}

export default bannersApi
