import axiosClient from './axiosClient'
// api/productApi.js
const appplicationApi = {
  updateApplication: (id: number, status: number) => {
    const URL = `application/update`

    return axiosClient.put(
      URL,
      { id, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    ) // Truyền email vào body của request
  },
}
export default appplicationApi
