import axiosClient from './axiosClient'

const appplicationApi = {
  updateApplication: (id: number, status: number) => {
    const URL = `/v1/application/update`

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
    const URL = `/v1/application/create`
    return axiosClient.post(URL, { postId })
  },
}
export default appplicationApi
