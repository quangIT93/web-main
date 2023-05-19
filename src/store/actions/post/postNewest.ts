import { ActionType } from "../../types";
import { AxiosResponse } from "axios"

export  const setPostNewest = (data:AxiosResponse) => ({
  type: ActionType.SET_POST_NEWEST,
  payload:{
    postNewest:data,
  } 
});

export  const setPostNewestMore = (data:AxiosResponse) => ({
  type: ActionType.GET_POST_NEWEST_MORE,
  payload:{
    postNewestMore:data,
  } 
});


