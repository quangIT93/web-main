
import { combineReducers } from 'redux'
import postReducer from './postReducer/postReducer'
import postNewestReducer from './postReducer/postNewest'


import authReducer from './authReducer/signGmailReducer'
import profileUser from './profileReducer/profileReducer'

import getProfileReducer from './profileReducer/getProfileReducer'
// import putProfileInfoPersonalReducer from './profileReducer/putProfileInfoPersonalReducer'
import alertProfileReducer from './profileReducer/alertProfileReducer'
import changeLanguageReducer from './changeLanguageReducer'

import alertReducer from './alertReducer'

import navbarSlice from './navbarReducer/navbarSlice'

import newWestReducerV3 from './postReducerV3/newWestReducer'

import dataLanguage from './dataLanguage'

const reducers = combineReducers({
  post: postReducer,
  postNewest: postNewestReducer,
  newWestReducerV3: newWestReducerV3,
  profileUser: profileUser,
  auth: authReducer,
  profile: getProfileReducer,
  // putProfileInfoPersonal: putProfileInfoPersonalReducer,
  alertProfile: alertProfileReducer,
  changeLaguage: changeLanguageReducer,

  showAlert: alertReducer,

  //quản lý state navbar
  navbarState: navbarSlice,

  dataLanguage: dataLanguage

})

export default reducers

export type RootState = ReturnType<typeof reducers>
