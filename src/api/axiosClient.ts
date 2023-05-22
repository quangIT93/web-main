// api/axiosClient.js
import axios from 'axios'
import queryString from 'query-string'
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_URL_HIJOB
    : process.env.PUBLIC_URL

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response && response.data) {
      return response.data
    }

    const accessToken = window.localStorage.getItem('accessToken') || ''
    console.log('accessToken', accessToken)
    response.headers.Authorization = `Bearer ${accessToken}`
    return response
  },
  (error) => {
    // Handle errors
    throw error
  }
)

export default axiosClient
