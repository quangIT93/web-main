import { ActionType } from "../types";
import { AxiosResponse } from "axios"

export  const setProvince = (data:AxiosResponse) => ({
  type: ActionType.SET_PROVINCE,
  payload:{
    province:data,
  } 
});



