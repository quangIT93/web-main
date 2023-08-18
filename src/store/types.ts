// import { PostNewestV3 } from './../components/Home/NewJobs/index';
import { AxiosResponse } from 'axios'
export enum ActionType {
  SET_POST_ID = 'set_post_id',
  SET_POST_THEME = 'set_post_theme',
  GET_POST_THEME_MORE = 'get_post_post_themes_more',
  SET_PROVINCE = 'set_province',
  SET_DISTRICTS = 'set_districts',
  SET_POST_NEWEST = 'set_post_newest',
  SET_POST_NEWESTV3 = 'set_post_newestV3',
  GET_POST_NEWEST_MORE = 'get_post_newest_more',
  GET_POST_NEWEST_MOREV3 = 'get_post_newest_moreV3',
  GET_PROFILE_USER = 'get_profile_user',

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
    postTheme: any
    postThemeMore: any
    postNewest: any
    postNewestMore: any
  }
}

export interface PostTypesV3 {
  type: string
  payload: {
    postNewestV3: any
    postNewestMoreV3: any
  }
}

export interface LocationTypes {
  type: string
  payload: {
    province: AxiosResponse
    distrisct: AxiosResponse
  }
}

export interface ProfileType {
  type: string
  payload: {
    profile: any
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
