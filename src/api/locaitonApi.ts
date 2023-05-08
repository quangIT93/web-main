
import axiosClient from './axiosClient'
// api/productApi.js
const locationApi = {
    getAllProvines: (lang:String) => {
        const URL = `/locations/p?lang=${lang}`;
        return axiosClient.get(URL);
    },

    getDistrictsByProvinesId: (pid:Number, lang:String) => {
        const URL = `/locations/p?pid=${pid}?lang=${lang}`;
        return axiosClient.get(URL);
    },


}

export default locationApi;