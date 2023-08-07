import axiosClient from './axiosClient'
// api/productApi.js

const apiTotalJob = {
  getTotalJob: (lang: string) => {
    const URL = `/v3/site/jobs?lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default apiTotalJob
