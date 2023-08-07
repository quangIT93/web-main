import axiosClient from './axiosClient'
// api/productApi.js
const categoriesApi = {
  getAllParentCategories: (lang: string) => {
    const URL = `/v1/categories/p?lang=${lang}`
    return axiosClient.get(URL)
  },

  getAllCategorise: (lang: string) => {
    const URL = `/v1/categories?lang=${lang}`
    return axiosClient.get(URL)
  },

  getAllChildCategories: (id: number, lang: string) => {
    const URL = `/v1/categories/c?pid=${id}&lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default categoriesApi
