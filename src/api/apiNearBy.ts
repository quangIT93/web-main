import axiosClient from './axiosClient'
// api/productApi.js
const nearByApi = {
  getNearByJob: (
    pvId: number,
    limit: Number,
    threshold: Number | null
  ) => {
    const URL = `/v1/posts/nearby?pvid=${pvId}&limit=${limit}&threshold=${threshold ? threshold : ''}`
    return axiosClient.get(URL)
  },
}

export default nearByApi
