import axiosClient from './axiosClient'
// api/productApi.js

const apiDescriptTemplate = {
    getJobDescriptTemplate: (
        limit: number,
        page: number,
        categoryId: number | null,
        title: string | null,
        lang: string
    ) => {
        const URL = `/v3/category-description-templates?limit=${limit}&page=${page}&lang=${lang}` +
            `${categoryId ? `&childCategoryId=${categoryId}` : ``}` +
            `${title !== null ? `&title=${title}` : ``}`
        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
    },
    getJobDescriptTemplateById: (
        id: number,
        lang: string
    ) => {
        const URL = `/v3/category-description-templates/${id}?lang=${lang}`
        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
    },
    getCompanyDescriptTemplate: (
        limit: number,
        page: number,
        categoryId: number | null,
        title: string | null,
        lang: string
    ) => {
        const URL = `/v3/company-description-templates?limit=${limit}&page=${page}&lang=${lang}` +
            `${categoryId ? `&parentCategoryId=${categoryId}` : ``}` +
            `${title !== null ? `&title=${title}` : ``}`
        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
    },
    getCompanyDescriptTemplateById: (
        id: number,
        lang: string
    ) => {
        const URL = `/v3/company-description-templates/${id}?lang=${lang}`
        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
    },
}

export default apiDescriptTemplate
