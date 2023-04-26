
import axiosClient from './axiosClient'
// api/productApi.js
const postApi = {
    getById: (params: number) => {
        console.log("number", params)
        const URL = `/places//all/getPlace`;
        return axiosClient.get(URL);
    },






}

export default postApi;