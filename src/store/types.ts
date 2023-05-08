import { AxiosResponse } from "axios"
export enum ActionType {
    SET_POST_ID = "set_post_id",
    SET_POST_THEME_ID = "set_post_theme_id",
    SET_PROVINCE = "set_province",
    SET_DISTRICTS = "set_districts"
}

export interface PostTypes {
    type: string,
    payload:{
      post:AxiosResponse,
      postTheme:AxiosResponse  
    } 
  }

  export interface LocationTypes {
    type: string,
    payload:{
      province:AxiosResponse,
      distrisct:AxiosResponse    
    } 
  }