import axiosClient from './axiosClient'
// api/productApi.js

const typeUser = {
  putTypeUser: (type: number) => {
    const URL = `/v3/users/type`
    return axiosClient.put(URL,  { type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
  },
}

export default typeUser
