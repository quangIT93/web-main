
import axiosClient from './axiosClient'
// api/productApi.js
const postApi = {
    getById: (params: number) => {
        const URL = `posts/${params}`;
        return axiosClient.get(URL);
    },

    getPostByThemeId: (themeId: number, limit:Number,threshold:Number) => {
        const URL = `posts/theme?tid=${themeId}&limit=${limit}&threshold=${threshold}`;
        return axiosClient.get(URL);
    },


}

export default postApi;