import axiosClient from './axiosClient'
// api/productApi.js
const signInEmailApi = {
  signInEmail: (email: String) => {
    const URL = `sign-in/email`
    return axiosClient.post(URL, { email: email })
  },

  verifyOtp: (email: String, otp: string) => {
    const URL = `sign-in/email/verify`
    return axiosClient.post(URL, { email, otp })
  },
}

export default signInEmailApi
