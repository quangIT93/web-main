import axiosClient from './axiosClient'
// api/productApi.js
const profileApi = {
  getProfile: () => {
    const URL = `profiles/s`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }) // Truyền email vào body của request
  },
}

export default profileApi
