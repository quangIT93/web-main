import axiosClient from './axiosClient'
// api/productApi.js
const hotJobApi = {
  getHotJobTheme: () => {
    const URL = `/v3/topics`
    return axiosClient.get(URL)
  },
  getHotJobById: (url: any, page: number, limit: number)=> {
    const URL = url + `&page=${page}&limit=${limit}`
    return axiosClient.get(URL)
  }
}

export default hotJobApi
