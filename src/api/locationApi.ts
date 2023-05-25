import axiosClient from './axiosClient'
// api/productApi.js
const locationApi = {
  getAllLocation: () => {
    const URL = `locations`
    return axiosClient.get(URL)
  },

  getAllProvinces: () => {
    const URL = `locations/p`
    return axiosClient.get(URL)
  },

  getDistrictsById: (idProvince: number) => {
    const URL = `locations/d?pid=${idProvince}`
    return axiosClient.get(URL)
  },
}

export default locationApi
