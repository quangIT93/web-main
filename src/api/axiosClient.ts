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
    if (response && response.data) {
      return response.data
    }

    const accessToken = window.localStorage.getItem('accessToken') || ''

    response.headers.Authorization = `Bearer ${accessToken}`
    return response
  },
  (error) => {
    let originalRequest = error.config;
    let refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken && error.response.status===403 || error.response.status===401){
        axios.post(`${BASE_URL}/reset-access-token`,{
          refreshToken: refreshToken,
        }).then(response => {
          console.log("axios",response)

          if(response.status === 200){
            localStorage.setItem(
              'accessToken',
              response.data.data.accessToken
          );
          originalRequest.headers[
            'Authorization'
        ] = `Bearer ${response.data.data.accessToken}`;

        return axios(originalRequest);
          }
        }).catch((error) => {
          // localStorage.clear();
          // window.location.reload();
          console.log("dfsd")
      });
    }

    throw error
  }
)

export default axiosClient
