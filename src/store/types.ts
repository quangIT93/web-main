import { AxiosResponse } from "axios"
export enum ActionType {
    SET_POST_ID = "set_post_id",
    SET_POST_THEME = "set_post_theme",
    GET_POST_THEME_MORE= "get_post_post_themes_more",
    SET_PROVINCE = "set_province",
    SET_DISTRICTS = "set_districts",
    SET_POST_NEWEST= "set_post_newest",
    GET_POST_NEWEST_MORE= "get_post_newest_more",
}

export interface PostTypes {
    type: string,
    payload:{
      post:AxiosResponse,
      postTheme:any  
      postThemeMore:any  
      postNewest:any
      postNewestMore:any
    } 
  }

  export interface LocationTypes {
    type: string,
    payload:{
      province:AxiosResponse,
      distrisct:AxiosResponse    
    } 
  }