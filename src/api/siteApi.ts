import axiosClient from './axiosClient'
// site api
const siteApi = {
    getSalaryType: () => {
        const URL = `/salary-types`
        return axiosClient.get(URL)
    },
    getJobType: () => {
        const URL = `/job-types`
        return axiosClient.get(URL)
    },
}

export default siteApi
