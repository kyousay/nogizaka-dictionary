import { all, fork } from 'redux-saga/effects'
import loginActions from './login'
import userActions from './user'

export function* watchAllActions() {
    yield fork(loginActions)
    yield fork(userActions)
}

export default function* rootSaga() {
    yield all([fork(watchAllActions)])
} 