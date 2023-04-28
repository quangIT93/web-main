
import axiosClient from './axiosClient'
// api/productApi.js
const postApi = {
    getById: (params: number) => {
        const URL = `posts/${params}`;
        return axiosClient.get(URL);
    },


}

export default postApi;