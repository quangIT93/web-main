import axiosClient from './axiosClient'
// api/productApi.js
const themesApi = {
  getThemesEnable: (lang: string) => {
    const URL = `/v1/themes/enabled?lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default themesApi
