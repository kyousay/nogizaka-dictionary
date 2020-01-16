import { all, fork } from 'redux-saga/effects'
import loginActions from './login'
import userActions from './user'
import memberActions from './member'
import searchActions from './search'
import talkActions from './talk'

export function* watchAllActions() {
    yield fork(loginActions)
    yield fork(userActions)
    yield fork(memberActions)
    yield fork(searchActions)
    yield fork(talkActions)
}

export default function* rootSaga() {
    yield all([fork(watchAllActions)])
} 