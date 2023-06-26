import axiosClient from './axiosClient'
// site api
const siteApi = {
  getSalaryType: () => {
    const URL = `/v1/salary-types`
    return axiosClient.get(URL)
  },
  getJobType: () => {
    const URL = `/v1/job-types`
    return axiosClient.get(URL)
  },
}

export default siteApi
