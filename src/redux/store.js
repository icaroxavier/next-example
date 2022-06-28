import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import rootSaga from './root-saga'

import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  ...getDefaultMiddleware(),
  // logger,
  sagaMiddleware
]

const preloadedState = {}

const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState
})

store.sagaTask = sagaMiddleware.run(rootSaga)

export default store
