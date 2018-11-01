import { NativeModules } from 'react-native'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true)
}

// For RN < 0.43
// if (__DEV__) {
//   NativeModules.DevMenu.debugRemotely(true)
// }

import rootSaga from './saga'

// ---
// REDUCERS
// ---

import userReducer from './modules/User'
import matchReducer from './modules/Match'
import chatReducer from './modules/Chat'
import systemReducer from './modules/System'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  const rootReducer = combineReducers({
    user: userReducer,
    match: matchReducer,
    chat: chatReducer,
    system: systemReducer
  })

  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : []

  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), ...enhancers))
  sagaMiddleware.run(rootSaga)
  return store
}
