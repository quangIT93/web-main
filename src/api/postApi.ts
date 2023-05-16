
import axiosClient from './axiosClient'
// api/productApi.js
const postApi = {
    getById: (params: number) => {
        const URL = `posts/${params}`;
        return axiosClient.get(URL);
    },

    getPostByThemeId: (themeId: number, limit:Number,threshold:Number|null) => {
        const URL = `posts/theme?tid=${themeId}&limit=${limit}&threshold=${threshold? threshold:""}`;
        return axiosClient.get(URL);
    },
    getPostNewest: (pcid:Number, ccid?:[]|null,dtid?:[]|null,limit?:Number,threshold?:Number) => {
        
     const URL = `posts/newest?
        ${pcid?`pcid=${pcid}`:""}
        &${ccid?`ccid=${ccid}` :""}
        &${dtid? `ccid=${dtid}`:""}
        &limit=${limit}
        &threshold=${threshold ? threshold :""}`;
        return axiosClient.get(URL);
    },


}

export default postApi;