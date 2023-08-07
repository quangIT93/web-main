import axiosClient from './axiosClient'

const messageApi = {
  getChatMessage: (uid: string, pid: number, lang: string) => {
    const URL = `/v1/chats/messages?uid=${uid}&pid=${pid}&lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getUserChated: (lang: string) => {
    const URL = `/v1/chats/users?lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getUnread: (lang: string) => {
    const URL = `/v1/chats/unread?lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}

export default messageApi
