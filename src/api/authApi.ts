import axiosClient from './axiosClient'
// api/productApi.js
const signInEmailApi = {
  signInEmail: (email: string) => {
    const URL = `/v1/sign-in/email`
    return axiosClient.post(URL, { email }) // Truyền email vào body của request
  },

  verifyOtp: (email: String, otp: string) => {
    const URL = `/v1/sign-in/email/verify`
    return axiosClient.post(URL, { email, otp })
  },

  signInFacebook: (fbAccessToken: string) => {
    const URL = `/v1/sign-in/facebook`
    return axiosClient.post(URL, { fbAccessToken })
  },

  signInGoogle: (idToken: string) => {
    const URL = `/v1/sign-in/google`

    return axiosClient.post(URL, {
      idToken: idToken,
      isWeb: true,
    })
  },
  signOut: (refreshToken: string) => {
    const URL = `/v1/sign-out`
    return axiosClient.post(URL, { refreshToken: refreshToken })
  },
}

export default signInEmailApi
