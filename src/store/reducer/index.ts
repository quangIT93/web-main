import { combineReducers } from 'redux'
import postReducer from './postReducer/postReducer'
import postNewestReducer from './postReducer/postNewest'
import provincesReducer from './provincesReducer'

import authReducer from './authReducer/signGmailReducer'

import getProfileReducer from './profileReducer/getProfileReducer'
import putProfileInfoPersonalReducer from './profileReducer/putProfileInfoPersonalReducer'

const reducers = combineReducers({
  post: postReducer,
  provice: provincesReducer,
  postNewest: postNewestReducer,
  auth: authReducer,
  profile: getProfileReducer,
  putProfileInfoPersonal: putProfileInfoPersonalReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
