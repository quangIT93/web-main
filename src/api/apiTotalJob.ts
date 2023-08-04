import axiosClient from './axiosClient'
// api/productApi.js

const apiTotalJob = {
  getTotalJob: () => {
    const URL = `/v3/site/jobs`
    return axiosClient.get(URL)
  },
}

export default apiTotalJob
