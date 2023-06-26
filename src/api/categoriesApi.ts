import axiosClient from './axiosClient'
// api/productApi.js
const categoriesApi = {
  getAllParentCategories: () => {
    const URL = `/v1/categories/p`
    return axiosClient.get(URL)
  },

  getAllCategorise: () => {
    const URL = `/v1/categories`
    return axiosClient.get(URL)
  },

  getAllChildCategories: (id: number) => {
    const URL = `/v1/categories/c?pid=${id}`
    return axiosClient.get(URL)
  },
}

export default categoriesApi
