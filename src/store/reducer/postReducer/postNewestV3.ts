// import { PostNewest } from '#components/Home/NewJobs';
import { ActionType , PostTypes,  PostTypesV3 } from "../../types"
// import { AxiosResponse } from "axios"

const initialState: any = {
  data: []
}
const postNewestV3 = (state = initialState, { type, payload }: PostTypesV3) => {
      console.log("payload", payload);
      console.log("state.data", state);
      console.log("initialState", initialState);
    switch (type) {
      case ActionType.SET_POST_NEWESTV3:
        return payload.postNewestV3.data;
      case ActionType.GET_POST_NEWEST_MOREV3:
        state.data.push(...payload.postNewestMoreV3.data)
        return state;
      default:
        return state;
    }
};  
  
export default postNewestV3