import axiosClient from './axiosClient'

const messageApi = {
  getChatMessage: (uid: string, pid: number) => {
    const URL = `/v1/chats/messages?uid=${uid}&pid=${pid}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getUserChated: () => {
    const URL = `/v1/chats/users`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getUnread: () => {
    const URL = `/v1/chats/unread`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}

export default messageApi
