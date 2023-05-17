import { ActionType , PostTypes } from "../../types"
import { AxiosResponse } from "axios"

const initialState ={
  data:{}
};
export default (state = initialState, { type, payload }: PostTypes) => {
    switch (type) {
      case ActionType.SET_POST_NEWEST:
        return payload.postNewest;
      default:
        return state;
    }
  };    