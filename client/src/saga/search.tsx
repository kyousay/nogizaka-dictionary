import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/search/searchConstants'
import * as SearchAction from '../actions/search/searchActions'
import * as userAction from '../actions/user/userActions'
import * as loginAction from '../actions/login/loginActions'
import * as MembersAction from '../actions/members/membersActions'
import { searchApiFactory } from '../api/searchApiFactory'

function* searchSelect(action: ReturnType<typeof SearchAction.searchSelect>) {
    try{
        const api = searchApiFactory();
        const apiOption = {
            method: 'post' as 'post',
            url: `/select/?${action.payload.url}`
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield put(MembersAction.storageMembers({members: data.members}))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* searchWord(action: ReturnType<typeof SearchAction.searchWord>) {
    try{
        const api = searchApiFactory();
        const apiOption = {
            method: 'post' as 'post',
            url: `/freeword?word=${action.payload.word}`
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield put(MembersAction.storageMembers({members: data.result}))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

export default function* searchActions() {
    yield takeLatest(Action.SEARCH_MEMBERS_SELECT, searchSelect)
    yield takeLatest(Action.SEARCH_MEMBERS_WORD, searchWord)
}