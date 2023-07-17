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
  },

  createKeywordNotification: (keyword: string, category_id: number | null,  district_id: string,) => {
    const URL = `/v1/notification/keyword`

    return axiosClient.post(URL, {
      keyword: keyword,
      category_id: category_id,
      category_status: 1,
      district_id: district_id,
      district_status: 1
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
 
        },
      })
  }

}
export default notificationKeywordApi
