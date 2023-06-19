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

  getSearchByQueryV2: (
    q: string,
    page: number,
    money_type: number,
    is_working_weekend: number,
    is_remotely: number,
    only_company: number,
    salary_min: number,
    salary_max: number,
    start_date: number,
    end_date: number,
    jobTypeId: number[],
    category_ids: number[],
    district_ids: string[],
    salary_type: number
  ) => {
    const URL =
      `/v2/searchsearch?` +
      `${q ? `q=${1}` : ``}` +
      `${page ? `page=${page}` : ``}` +
      `${money_type ? `money_type=${money_type}` : ``}` +
      `${
        is_working_weekend ? `is_working_weekend=${is_working_weekend}` : ``
      }` +
      `${is_remotely ? `is_remotely=${is_remotely}` : ``}` +
      `${only_company ? `only_company=${only_company}` : ``}` +
      `${salary_min ? `salary_min=${salary_min}` : ``}` +
      `${salary_max ? `salary_max=${salary_max}` : ``}` +
      `${start_date ? `start_date=${start_date}` : ``}` +
      `${end_date ? `end_date=${end_date}` : ``}` +
      `${jobTypeId ? `jobTypeId=${jobTypeId}` : ``}` +
      `${district_ids ? `district_ids=${district_ids}` : ``}` +
      `${category_ids ? `category_ids=${category_ids}` : ``}` +
      `${salary_type ? `salary_type=${salary_type}` : ``}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default searchApi
