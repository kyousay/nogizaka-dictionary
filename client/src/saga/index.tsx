import { all, fork } from 'redux-saga/effects'
import loginActions from './login'

export function* watchAllActions() {
    yield fork(loginActions)
}

export default function* rootSaga() {
    yield all([fork(watchAllActions)])
} 