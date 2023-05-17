import { ActionType } from "../../types";
import { AxiosResponse } from "axios"

export  const setPostNewest = (data:AxiosResponse) => ({
  type: ActionType.SET_POST_NEWEST,
  payload:{
    postNewest:data,
  } 
});


