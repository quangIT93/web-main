import axiosClient from './axiosClient'
// api/productApi.js

const applitedPostedApi = {
  getAllApplitedPostedApi: (page: number, lang: string) => {
    const URL = `/v1/history/all?page=${page}&lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default applitedPostedApi
