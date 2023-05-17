import { ActionType } from "../../types";
import { AxiosResponse } from "axios"

export  const setPost = (data:AxiosResponse) => ({
  type: ActionType.SET_POST_ID,
  payload:{
    post:data,
  } 
});

export  const setPostByTheme = (data:AxiosResponse) => ({
  type: ActionType.SET_POST_THEME,
  payload:{
    postTheme:data,
  } 
});

