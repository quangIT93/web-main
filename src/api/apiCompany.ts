import axiosClient from './axiosClient'
// api/productApi.js
import { FormValues } from 'pages/Company'

const apiCompany = {
    createCampany: (newCompany: FormValues) => {
        const URL = `/v3/companies`
        return axiosClient.post(URL, newCompany, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    getCampanyByAccountApi: () => {
        const URL = `/v3/companies/account`
        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
    },
    getAllRolesCompany: () => {
        const URL = `/v3/company-roles`
        return axiosClient.get(URL)
    },
    getAllSizesCompany: () => {
        const URL = `/v3/company-sizes`
        return axiosClient.get(URL)
    },
}

export default apiCompany
