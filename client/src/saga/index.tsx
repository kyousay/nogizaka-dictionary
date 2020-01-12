import { all, fork } from 'redux-saga/effects'
import loginActions from './login'
import userActions from './user'
import memberActions from './member'
import searchActions from './search'

export function* watchAllActions() {
    yield fork(loginActions)
    yield fork(userActions)
    yield fork(memberActions)
    yield fork(searchActions)
}

export default function* rootSaga() {
    yield all([fork(watchAllActions)])
} 