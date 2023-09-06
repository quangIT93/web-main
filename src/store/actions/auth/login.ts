import {
  AuthActionType
  // , LoginPayload
} from '../../types'
import { AxiosResponse } from 'axios'

export const ActionSignInEmail = (data: AxiosResponse) => {
  return {
    type: AuthActionType.LOGIN,
    payload: {
      data,
    },
  }
}

export const ActionVerifyOtp = (data: AxiosResponse) => {
  return {
    type: AuthActionType.VERIFY,
    payload: {
      data,
    },
  }
}
