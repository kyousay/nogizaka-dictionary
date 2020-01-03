import { all, fork } from 'redux-saga/effects'
import loginActions from './login'
import userActions from './user'
import memberActions from './member'

export function* watchAllActions() {
    yield fork(loginActions)
    yield fork(userActions)
    yield fork(memberActions)
}

export default function* rootSaga() {
    yield all([fork(watchAllActions)])
} 