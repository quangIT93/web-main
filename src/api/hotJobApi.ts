import axiosClient from './axiosClient'
// api/productApi.js
const hotJobApi = {
  getHotJobTheme: (lang: string) => {
    const URL = `/v3/topics?version=web&lang=${lang}`
    return axiosClient.get(URL)
  },
  getHotJobById: (url: any, page: number, limit: number, lang: string, provinceId: string | null)=> {
    const URL = url + `&page=${page}&limit=${limit}&lang=${lang}${provinceId !== "0" ? `&provinceId=${provinceId}` : ``}`
    return axiosClient.get(URL)
  }
}

export default hotJobApi
