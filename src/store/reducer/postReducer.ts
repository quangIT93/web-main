import { ActionType , PostTypes } from "../types"
import { AxiosResponse } from "axios"

const initialState ={
  data:{}
};
export default (state = initialState, { type, payload }: PostTypes) => {
    switch (type) {
      case ActionType.SET_POST_ID:
        return payload.post;
      case ActionType.SET_POST_THEME:
        return payload.postTheme
      default:
        return state;
    }
  };    