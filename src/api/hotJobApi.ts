import axiosClient from './axiosClient'
// api/productApi.js
const hotJobApi = {
  getHotJobTheme: (lang: string) => {
    const URL = `/v3/topics?lang=${lang}`
    return axiosClient.get(URL)
  },
  getHotJobById: (url: any, page: number, limit: number, lang: string)=> {
    const URL = url + `&page=${page}&limit=${limit}&lang=${lang}`
    return axiosClient.get(URL)
  }
}

export default hotJobApi
