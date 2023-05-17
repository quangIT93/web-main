import { AxiosResponse } from "axios"
export enum ActionType {
    SET_POST_ID = "set_post_id",
    SET_POST_THEME = "set_post_theme",
    SET_PROVINCE = "set_province",
    SET_DISTRICTS = "set_districts",
    SET_POST_NEWEST= "set_post_newest"
}

export interface PostTypes {
    type: string,
    payload:{
      post:AxiosResponse,
      postTheme:AxiosResponse  
      postNewest:AxiosResponse
    } 
  }

  export interface LocationTypes {
    type: string,
    payload:{
      province:AxiosResponse,
      distrisct:AxiosResponse    
    } 
  }