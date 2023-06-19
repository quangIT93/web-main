import axiosClient from './axiosClient'
// api/productApi.js
const historyApplicator = {
  getAllSubmitedApplied: (threshold: number | null, limit: number, status: number) => {
    const URL = `/history/applicator/applications?${threshold ? `threshold=${threshold}` : ''}&limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyApplicator
