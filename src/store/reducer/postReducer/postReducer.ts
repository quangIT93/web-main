import { ActionType , PostTypes } from "../../types"
import { AxiosResponse } from "axios"

const initialState: any = {
  data: {
    posts: []
  }
}
const postReducer = (state = initialState, { type, payload }: PostTypes) => {
    switch (type) {
      case ActionType.SET_POST_ID:
        return payload.post;
      case ActionType.SET_POST_THEME:
        return payload.postTheme
      case ActionType.GET_POST_THEME_MORE:
        state.data.posts.push(...payload.postThemeMore.data.posts)
        return state;
      default:
        return state;
    }
}; 
  
export default postReducer