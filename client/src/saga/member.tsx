import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/members/membersConstants'
import * as MembersAction from '../actions/members/membersActions'
import * as userAction from '../actions/user/userActions'
import * as loginAction from '../actions/login/loginActions'
import { MemberApiFactory } from '../api/MemberApiFactory'

function* addMember(action : ReturnType<typeof MembersAction.addMember>){
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
        yield put(userAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield put(MembersAction.storageMembers({members: data.members}))
            alert(data.message)
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* updateMember(action : ReturnType<typeof MembersAction.updateMember>){
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
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield alert(data.message)
            yield put(MembersAction.storageMembers({members: data.members}))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* deleteMember(action: ReturnType<typeof MembersAction.deleteMember>) {
    const memberId = action.payload;
    try {
        const api = MemberApiFactory();
        const apiOption = {
            method: 'delete' as 'delete',
            data: {memberId},
            url: '/delete'
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
            yield alert(data.message)
            yield put(MembersAction.storageMembers({members: data.members}))
            yield put(userAction.setUserData({...data.user}))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
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

export default function* memberActions() {
    yield takeLatest (Action.MEMBERS_MEMBER_ADD, addMember)
    yield takeLatest (Action.MEMBERS_MEMBER_UPDATE, updateMember)
    yield takeLatest (Action.MEMBERS_MEMBER_DELETE, deleteMember)
    yield takeLatest (Action.MEMBERS_GET_ALLMEMBERS, getAllMembers)
}