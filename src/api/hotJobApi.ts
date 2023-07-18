import axiosClient from './axiosClient'
// api/productApi.js
const hotJobApi = {
  getHotJobTheme: () => {
    const URL = `/v3/topics`
    return axiosClient.get(URL)
  },
  getHotJobById: (id : number)=> {
    const URL = `/v3/posts/topic/${id}`
    return axiosClient.get(URL)
  }
}

export default hotJobApi
