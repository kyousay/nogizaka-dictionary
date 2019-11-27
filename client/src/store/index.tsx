import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

 export const sagaMiddleWare = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(logger,sagaMiddleWare)
)

export default store