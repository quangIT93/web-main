
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

import roleReducer from './roleReducer'

import isNewReducer from './isNewReducer'

import profileReducerV3 from './profileReducerV3'

import profileMeInformationV3 from './profileMeInformationReducerV3'
import profileMeInformationMoreReducerV3 from './profileMeInformationMoreReducerV3'
import profileMeCompanyReducerV3 from './profileMeCompanyReducerV3'

import locationReducer from './locationReducer'

import placeIdReducer from './placeIdReducer'

import checkPost from './checkPost'

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
  changeRole: roleReducer,
  isNew: isNewReducer,
  showAlert: alertReducer,

  //quản lý state navbar
  navbarState: navbarSlice,

  dataLanguage: dataLanguage,
  dataLocation: locationReducer,
  dataProfileV4: profileReducerV3,
  dataProfileInformationV3: profileMeInformationV3,
  dataProfileInformationMoreV3: profileMeInformationMoreReducerV3,
  dataProfileCompanyV3: profileMeCompanyReducerV3,
  placeIdReducer: placeIdReducer,

  checkPost: checkPost,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
