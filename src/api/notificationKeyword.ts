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
  getNotificationKeywordV3: () => {
    const URL = `/v3/keyword-notifications`

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
  putPlatform: (emailStatus: number, pushStatus: number) => {
    const URL = `/v1/notification/update-platform`

    return axiosClient.put(URL,  { emailStatus, pushStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
  },

  deleteKeyword: (keywordNotificationIds: number[]) => {
    const URL = `/v1/notification/keyword/delete`

    return axiosClient.delete(URL, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        data: { keywordNotificationIds },
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
  },

  createKeywordNotificationV3: (keyword: string, category_id: number[],  district_id: string[]) => {
    const URL = `/v3/keyword-notifications`

    return axiosClient.post(URL, {
      keyword: keyword,
      categoriesId: category_id,
      // category_status: 1,
      districtsId: district_id,
      // district_status: 1
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
 
        },
      })
  }

}
export default notificationKeywordApi
