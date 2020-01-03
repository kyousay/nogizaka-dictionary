import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

export const sagaMiddleWare = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(logger,sagaMiddleWare)
)

export const persistor = persistStore(store)
export default store