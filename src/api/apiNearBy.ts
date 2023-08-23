import axiosClient from './axiosClient'
// api/productApi.js
const nearByApi = {
  getNearByJob: (
    pvId: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string
  ) => {
    const URL = `/v1/posts/nearby?${pvId ? `pvid=${pvId}&`: `pvid=${79}&`}limit=${limit}&threshold=${threshold ? threshold : ''}&lang=${lang}`
    return axiosClient.get(URL,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
  })
  },
}

export default nearByApi
