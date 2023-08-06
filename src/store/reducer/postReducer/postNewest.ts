// import { PostNewest } from '#components/Home/NewJobs';
import { ActionType , PostTypes } from "../../types"
// import { AxiosResponse } from "axios"

const initialState: any = {
  data: {
    posts: []
  }
}
const postNewest = (state = initialState, { type, payload }: PostTypes) => {
    switch (type) {
      case ActionType.SET_POST_NEWEST:
        return payload.postNewest;
      case ActionType.GET_POST_NEWEST_MORE:
        state.data.posts.push(...payload.postNewestMore.data.posts)
        return state;
      default:
        return state;
    }
};  
  
export default postNewest