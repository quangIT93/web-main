import axiosClient from './axiosClient'
// api/productApi.js

const candidateSearch = {
  getAcademicTypes: (lang: string) => {
    const URL = `/v3/academic-types?lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default candidateSearch
