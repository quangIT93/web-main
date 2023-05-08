import { ActionType , PostTypes } from "../types"


const initialState = null;
export default (state = initialState, { type, payload }: PostTypes) => {
    switch (type) {
      case ActionType.SET_POST_ID:
        return payload.post;
      case ActionType.SET_POST_THEME_ID:
        return payload.postTheme
      default:
        return state;
    }
  };    