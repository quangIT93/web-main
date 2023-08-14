import axiosClient from './axiosClient'
// api/productApi.js
const languageApi = {
    getLanguage: (lang: string) => {
        const URL = `/v3/site/languages?lang=${lang}`
        return axiosClient.get(URL)
    },
}

export default languageApi
