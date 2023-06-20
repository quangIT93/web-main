import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axiosClient from './axiosClient'
// api/productApi.js

const searchApi = {
  getSearchByFilter: () => {
    const URL = `/v1/search/filter`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getSuggestKeyWord: (limit: number) => {
    const URL = `/v1/search/suggest?limit=${limit}`

    return axiosClient.get(URL)
  },

  getHistoryKeyWord: (limit: number) => {
    const URL = `/v1/search/history?limit=${limit}`
    return axiosClient.get(URL)
  },


  getSearchByQueryV2: (
    q: string | null,
    page: number | null,
    money_type: number | null,
    is_working_weekend: number | null,
    is_remotely: number | null,
    only_company: number | null,
    salary_min: number | null,
    salary_max: number | null,
    start_date: number | null,
    end_date: number | null,
    jobTypeId: number[] | null,
    category_ids: number[] | null,
    district_ids: string[] | null,
    salary_type: number | null
  ) => {
    const URL =
      `/v2/search?` +
      `${q ? `q=${q}` : ``}` +
      `${page ? `&page=${page}` : ``}` +
      `${money_type ? `&money_type=${money_type}` : ``}` +
      `${is_working_weekend ? `&is_working_weekend=${is_working_weekend}` : ``
      }` +
      `${is_remotely ? `&is_remotely=${is_remotely}` : ``}` +
      `${only_company ? `&only_company=${only_company}` : ``}` +
      `${salary_min ? `&salary_min=${salary_min}` : ``}` +
      `${salary_max ? `&salary_max=${salary_max}` : ``}` +
      `${start_date ? `&start_date=${start_date}` : ``}` +
      `${end_date ? `&end_date=${end_date}` : ``}` +
      `${jobTypeId ? `&jobTypeId=${jobTypeId}` : ``}` +
      `${district_ids ? `&district_ids=${district_ids}` : ``}` +
      `${category_ids ? `&category_ids=${category_ids}` : ``}` +
      `${salary_type ? `&salary_type=${salary_type}` : ``}`

    return axiosClient.get(URL,)
  },
}
export default searchApi
