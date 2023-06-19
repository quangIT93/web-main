import axiosClient from './axiosClient'
// api/productApi.js
const themesApi = {
  getThemesEnable: () => {
    const URL = `/v1/themes/enabled`
    return axiosClient.get(URL)
  },
}

export default themesApi
