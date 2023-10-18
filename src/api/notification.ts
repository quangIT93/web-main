import axiosClient from './axiosClient'

const notificationApi = {
  getNotificationV2: (lang: string, limit: number, page: string) => {
    const URL = `/v1/notification/all?lang=${lang}&limit=${limit}&page=${page}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  getNotificationCountNew: (lang: string) => {
    const URL = `/v1/notification/new?lang=${lang}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  putProfileSkill: (notification_id: number, typeText: string) => {
    const URL = `/v1/notification/update`
    return axiosClient.put(
        URL,
        {
          notification_id,
          is_read: 1,
          typeText
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                // 'Content-Type': 'multipart/form-data',
            },
        }
    )
},
}
export default notificationApi
