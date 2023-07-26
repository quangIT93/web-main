import axiosClient from './axiosClient'
// api/productApi.js
const locationApi = {

    getCompany: () => {
        const URL = `/v3/companies`
        return axiosClient.get(URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
    },
    
    getCompanyAccount: () => {
        const URL = `/v3/companies`
        return axiosClient.get(URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
      },
}

export default locationApi