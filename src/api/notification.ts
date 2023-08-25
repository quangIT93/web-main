import axiosClient from './axiosClient'

const notificationApi = {
  getNotificationV2: (lang: string) => {
    const URL = `/v2/notification/all?lang=${lang}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default notificationApi
