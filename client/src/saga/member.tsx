import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/members/membersConstants'
import * as MembersAction from '../actions/members/membersActions'
import * as userAction from '../actions/user/userActions'
import { MemberApiFactory } from '../api/MemberApiFactory'

function* addMembers(action : ReturnType<typeof MembersAction.addMembers>){
    const memberData = action.payload;
    
    try{
        const api = MemberApiFactory();
        const apiOption = {
            method: 'post' as 'post', 
            data: memberData, 
            url: '/upload'
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(true))
        const data = result.data
        alert(data.message)
    }catch(error) {
        yield alert(error)
    }
}

function* updateMembers(action : ReturnType<typeof MembersAction.updateMembers>){
    const memberData = action.payload
    try{
        const api = MemberApiFactory();
        const apiOption = {
            method: 'put' as 'put',
            data: memberData,
            url: '/update'
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        const data = result.data
        yield alert(data.message)
        yield put(MembersAction.storageMembers({members: data.members}))
    }catch(error) {
        yield alert(error)
    }
}

function* getAllMembers(){
    try{
        const api = MemberApiFactory();
        const apiOption = {
            method: 'get' as 'get',
            url: '/members'
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        const data = result.data
        yield put(MembersAction.storageMembers({members: data.members}))
    }catch(error) {
        yield alert(error)
    }
}

export default function* memberActions() {
    yield takeLatest (Action.MEMBERS_MEMBER_ADD, addMembers)
    yield takeLatest (Action.MEMBERS_MEMBER_UPDATE, updateMembers)
    yield takeLatest (Action.MEMBERS_GET_ALLMEMBERS, getAllMembers)
}