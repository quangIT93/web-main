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
  putStatusNotification: (id: number, status: number) => {
    const URL = `/v1/notification/keyword/update-status`

    return axiosClient.put(URL,  { id, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
  }

}
export default notificationKeywordApi
