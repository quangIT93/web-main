import axiosClient from './axiosClient'
// api/productApi.js
const locationApi = {
  getAllLocation: () => {
    const URL = `/v1/locations`
    return axiosClient.get(URL)
  },

  getAllProvinces: () => {
    const URL = `/v1/locations/p`
    return axiosClient.get(URL)
  },

  getDistrictsById: (idProvince: number) => {
    const URL = `/v1/locations/d?pid=${idProvince}`
    return axiosClient.get(URL)
  },

  getWardsId: (idWard: string, lang: string | null) => {
    const URL = `/v1/locations/w?did=${idWard}&lang${lang ? lang : 'vi'}`
    return axiosClient.get(URL)
  },
}

export default locationApi
