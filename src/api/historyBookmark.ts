import axiosClient from './axiosClient'
// api/productApi.js
const historyBookmark = {
  getAllBookmark: (threshold: number, limit: number) => {
    const URL = `/v1/posts/bookmark?threshold=${threshold}&limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyBookmark
