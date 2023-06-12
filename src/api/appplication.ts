import axiosClient from './axiosClient'

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
    )
  },
  applyAplication: (postId: Number) => {
    const URL = `application/create`
    return axiosClient.post(
      URL, { postId }
    )
  },
}
export default appplicationApi
