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
    // getCampanyByAccountApi: (lang: string) => {
    //     const URL = `/v3/profiles/me?lang=${lang}`
    //     return axiosClient.get(URL, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //         },
    //     })
    // },
    getAllRolesCompany: (lang: string) => {
        const URL = `/v3/company-roles?lang=${lang}`
        return axiosClient.get(URL)
    },
    getAllSizesCompany: (lang: string) => {
        const URL = `/v3/company-sizes?lang=${lang}`
        return axiosClient.get(URL)
    },
}

export default apiCompany
