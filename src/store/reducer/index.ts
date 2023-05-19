import { combineReducers } from 'redux'
import postReducer from './postReducer/postReducer'
import postNewestReducer from './postReducer/postNewest'
import provincesReducer from './provincesReducer'

import authReducer from './authReducer/loginReducer'

const reducers = combineReducers({
  post: postReducer,
  provice: provincesReducer,
  postNewest: postNewestReducer,
  auth: authReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
