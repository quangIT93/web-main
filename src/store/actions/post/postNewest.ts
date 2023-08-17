import { ActionType } from "../../types";
import { AxiosResponse } from "axios"

export  const setPostNewest = (data:AxiosResponse) => ({
  type: ActionType.SET_POST_NEWEST,
  payload:{
    postNewest:data,
  } 
});

export  const setPostNewestv3 = (data:AxiosResponse) => ({
  type: ActionType.SET_POST_NEWESTV3,
  payload:{
    postNewestV3:data,
  } 
});

export  const setPostNewestMore = (data:AxiosResponse) => ({
  type: ActionType.GET_POST_NEWEST_MORE,
  payload:{
    postNewestMore:data,
  } 
});

export  const setPostNewestMoreV3 = (data:AxiosResponse) => ({
  type: ActionType.GET_POST_NEWEST_MOREV3,
  payload:{
    setPostNewestMoreV3:data,
  } 
});



