import axiosClient from './axiosClient'
// api/productApi.js
const hotJobApi = {
  getHotJobTheme: (lang: string) => {
    const URL = `/v3/topics?version=web&lang=${lang}`
    return axiosClient.get(URL)
  },
  getHotJobById: (
    url: any,
    page: number,
    limit: number,
    lang: string,
    provinceId: string | null,
    sort_by: string | null,
    money_type: number | null,
    salary_min: any | null,
    salary_max: any | null,
  ) => {
    const URL = url + `page=${page}&limit=${limit}&lang=${lang}` +
      `${provinceId !== "0" ? `&provinceId=${provinceId}` : ``}` +
      `&sortBy=${sort_by}&moneyType=${money_type}` +
      `${salary_min === 0 && salary_max === 0 ?
        ``
        : `${salary_min !== 0 && salary_max === 0 ?
          `&salaryMin=${salary_min}`
          :
          `${salary_min === 0 && salary_max !== 0 ?
            `&salaryMax=${salary_max}`
            : `&salaryMin=${salary_min}&salaryMax=${salary_max}`
          }`
        }`
      }`
    return axiosClient.get(URL)
  }
}

export default hotJobApi
