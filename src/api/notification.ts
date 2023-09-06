import axiosClient from './axiosClient'

const notificationApi = {
  getNotificationV2: (lang: string) => {
    const URL = `/v1/notification/all?lang=${lang}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default notificationApi
