
import axiosClient from './axiosClient'
// api/productApi.js
const themesApi = {
    getThemesEnable: () => {
        const URL = `/themes/enabled`;
        return axiosClient.get(URL);
    },

 


}

export default themesApi;