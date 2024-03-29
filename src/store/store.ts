import thunk from 'redux-thunk'
import reducers from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import {
  // persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'changeLaguage',
    'changeRole',
    'checkPost',
    'dataProfileInformationV3',
    'dataProfileInformationMoreV3',
    'dataProfileCompanyV3',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
// export const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(thunk)
// )

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})
