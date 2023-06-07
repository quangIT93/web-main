import axiosClient from './axiosClient'
// api/productApi.js
const historyApplicator = {
  getAllSubmitedApplied: (threshold: number, limit: number) => {
    const URL = `/history/applicator/applications?=${threshold}&limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyApplicator
