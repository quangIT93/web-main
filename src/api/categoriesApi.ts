import axiosClient from './axiosClient'
// api/productApi.js
const categoriesApi = {
  getAllParentCategories: () => {
    const URL = `/categories/p`
    return axiosClient.get(URL)
  },

  getAllCategorise: () => {
    const URL = `/categories`
    return axiosClient.get(URL)
  },

  getAllChildCategories: (id: number) => {
    const URL = `/categories/c?pid=${id}`
    return axiosClient.get(URL)
  },
}

export default categoriesApi
