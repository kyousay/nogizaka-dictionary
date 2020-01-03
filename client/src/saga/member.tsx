import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/members/membersConstants'
import * as MembersAction from '../actions/members/membersActions'
import { MemberApiFactory } from '../api/MemberApiFactory'

function* addMembers(action : ReturnType<typeof MembersAction.addMembers>){
    const memberData = action.payload;
    
    try{
        const api = MemberApiFactory();
        const result = yield call(api, 'post', memberData, '/member/upload')
        const data : typeof memberData = result.data
        console.log(data)
    }catch(error) {
        yield alert(error)
    }
}

export default function* memberActions() {
    yield takeLatest (Action.MEMBERS_MEMBER_ADD, addMembers)
}