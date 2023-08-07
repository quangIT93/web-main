import axiosClient from './axiosClient'
// api/productApi.js
const nearByApi = {
  getNearByJob: (
    pvId: number,
    limit: Number,
    threshold: Number | null,
    lang: string
  ) => {
    const URL = `/v1/posts/nearby?pvid=${pvId}&limit=${limit}&threshold=${threshold ? threshold : ''}&lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default nearByApi
