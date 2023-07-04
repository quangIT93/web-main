import axiosClient from './axiosClient'

const notificationKeywordApi = {
  getNotificationKeyword: () => {
    const URL = `/v1/notification/keyword`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default notificationKeywordApi
