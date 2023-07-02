import { combineReducers } from 'redux'
import postReducer from './postReducer/postReducer'
import postNewestReducer from './postReducer/postNewest'
import provincesReducer from './provincesReducer'

import authReducer from './authReducer/signGmailReducer'
import profileUser from './profileReducer/profileReducer'

import getProfileReducer from './profileReducer/getProfileReducer'
import putProfileInfoPersonalReducer from './profileReducer/putProfileInfoPersonalReducer'
import alertProfileReducer from './profileReducer/alertProfileReducer'

import navbarSlice from './navbarReducer/navbarSlice'

const reducers = combineReducers({
  post: postReducer,
  provice: provincesReducer,
  postNewest: postNewestReducer,
  profileUser: profileUser,
  auth: authReducer,
  profile: getProfileReducer,
  putProfileInfoPersonal: putProfileInfoPersonalReducer,
  alertProfile: alertProfileReducer,
  //quản lý state navbar
  navbarState: navbarSlice,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
