import axiosClient from './axiosClient'
// api/productApi.js
const locationApi = {
  getAllProvinces: () => {
    const URL = `locations/p`
    return axiosClient.get(URL)
  },
}

export default locationApi
