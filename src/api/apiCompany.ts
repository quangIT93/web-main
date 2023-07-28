import axiosClient from './axiosClient'
// api/productApi.js
import { FormCompanyValues } from 'pages/Company'


const apiCompany = {
    createCampany: (newCompany: FormCompanyValues) => {
        const URL = `/v3/companies`
        return axiosClient.post(
            URL,
            newCompany,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    updateCampany: (companyId: number, updateCompany: FormCompanyValues) => {
        const URL = `/v3/companies/${companyId}`

        return axiosClient.patch(
            URL,
            updateCompany,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    ' Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    getCampanyByAccountApi: () => {
        const URL = `/v3/profiles/me`
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
