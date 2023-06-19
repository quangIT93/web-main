import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axiosClient from './axiosClient'
// api/productApi.js

const searchApi = {
  getSearchByFilter: () => {
    const URL = `search/filter`

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
    only_company: number
  ) => {
    const URL = `searchsearch?q=viet&page=0&money_type=1&is_working_weekend=0&is_remotely=0&only_company=0`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default searchApi
