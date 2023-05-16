
import axiosClient from './axiosClient'
// api/productApi.js
const categoriesApi = {
    getAllParentCategories: () => {
        const URL = `/categories/p`;
        return axiosClient.get(URL);
    },

}

export default categoriesApi;