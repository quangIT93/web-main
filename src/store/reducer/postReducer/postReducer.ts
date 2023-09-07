import { ActionType , PostTypes } from "../../types"
// import { AxiosResponse } from "axios"

const initialState: any = {
  data: {
    posts: [],
    is_over: false
  }
}
const postReducer = (state = initialState, { type, payload }: PostTypes) => {
    switch (type) {
      case ActionType.SET_POST_ID:
        return payload.post;
      case ActionType.SET_POST_THEME:
        return payload.postTheme
      case ActionType.GET_POST_THEME_MORE:
        if (!payload.postThemeMore.data.is_over) {
          state.data.posts.push(...payload.postThemeMore.data.posts)
        } else {       
          state.data.is_over = true
        }
        return state;
      default:
        return state;
    }
}; 
  
export default postReducer