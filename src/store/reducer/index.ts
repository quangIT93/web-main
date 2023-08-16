
import { combineReducers } from 'redux'
import postReducer from './postReducer/postReducer'
import postNewestReducer from './postReducer/postNewest'
import provincesReducer from './provincesReducer'

import authReducer from './authReducer/signGmailReducer'
import profileUser from './profileReducer/profileReducer'

import getProfileReducer from './profileReducer/getProfileReducer'
import putProfileInfoPersonalReducer from './profileReducer/putProfileInfoPersonalReducer'
import alertProfileReducer from './profileReducer/alertProfileReducer'
import changeLanguageReducer from './changeLanguageReducer'

import alertReducer from './alertReducer'

import navbarSlice from './navbarReducer/navbarSlice'

import newWestReducer from './postReducerV3/newWestReducer'

const reducers = combineReducers({
  post: postReducer,
  provice: provincesReducer,
  postNewest: postNewestReducer,
  newWestReducer: newWestReducer,
  profileUser: profileUser,
  auth: authReducer,
  profile: getProfileReducer,
  putProfileInfoPersonal: putProfileInfoPersonalReducer,
  alertProfile: alertProfileReducer,
  changeLaguage: changeLanguageReducer,

  showAlert: alertReducer,

  //quản lý state navbar
  navbarState: navbarSlice,

})

export default reducers

export type RootState = ReturnType<typeof reducers>
