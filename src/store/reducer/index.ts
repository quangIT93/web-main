import { combineReducers } from "redux";
import postReducer from "./postReducer";
import provincesReducer from "./provincesReducer"


const reducers = combineReducers({
    post: postReducer,
    provice:provincesReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>