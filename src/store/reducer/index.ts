import { combineReducers } from "redux";
import postReducer from "./postReducer/postReducer";
import postNewestReducer from "./postReducer/postNewest"
import provincesReducer from "./provincesReducer"


const reducers = combineReducers({
    post: postReducer,
    provice:provincesReducer,
    postNewest: postNewestReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>