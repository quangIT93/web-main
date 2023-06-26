import thunk from 'redux-thunk'
import reducers from './reducer'
import { configureStore } from '@reduxjs/toolkit'

// export const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(thunk)
// )

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
})
