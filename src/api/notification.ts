import axiosClient from './axiosClient'

const notificationApi = {
  getNotificationV2: () => {
    const URL = `/v2/notification/all`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default notificationApi
