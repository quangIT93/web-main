import axiosClient from './axiosClient'
// api/productApi.js
const historyApplicator = {
  getAllSubmitedApplied: (threshold: number, limit: number, status: number) => {
    const URL = `/history/applicator/applications?=${threshold}&limit=${limit}&status=${status}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyApplicator
