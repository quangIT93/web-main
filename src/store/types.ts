import { AxiosResponse } from 'axios'
export enum ActionType {
  SET_POST_ID = 'set_post_id',
  SET_POST_THEME = 'set_post_theme',
  SET_PROVINCE = 'set_province',
  SET_DISTRICTS = 'set_districts',
  SET_POST_NEWEST = 'set_post_newest',
}

export enum AuthActionType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  VERIFY = 'verify',
}

export interface PostTypes {
  type: string
  payload: {
    post: AxiosResponse
    postTheme: AxiosResponse
    postNewest: AxiosResponse
  }
}

export interface LocationTypes {
  type: string
  payload: {
    province: AxiosResponse
    distrisct: AxiosResponse
  }
}

export interface LoginPayload {
  type: string
  payload: {
    data: AxiosResponse
  }
}

export interface VerifyOtpEmail {
  type: string
  payload: {
    data: AxiosResponse
  }
}
