import axiosClient from './axiosClient'
// api/productApi.js

const applitedPostedApi = {
  getAllApplitedPostedApi: (page: number) => {
    const URL = `/v1/history/all?page=${page}`
    return axiosClient.get(URL)
  },
}

export default applitedPostedApi
