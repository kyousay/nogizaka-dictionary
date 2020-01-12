import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/search/searchConstants'
import * as SearchAction from '../actions/search/searchActions'
import * as userAction from '../actions/user/userActions'
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
        console.log(data)
        // if(data.members.length > 0) {
            yield put(MembersAction.storageMembers({members: data.members}))
        // } 
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

export default function* searchActions() {
    yield takeLatest(Action.MEMBERS_SEARCH_SELECT, searchSelect)
}