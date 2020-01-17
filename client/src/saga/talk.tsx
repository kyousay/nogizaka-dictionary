import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/talk/talkConstants'
import * as talkAction from '../actions/talk/talkActions'
import * as userAction from '../actions/user/userActions'
import { talkApiFactory } from '../api/talkApiFactiory'

function* createTalkRoom(action : ReturnType<typeof talkAction.createTalkRoom>){
    console.log(action.payload.data)
    try{
        const api = talkApiFactory();
        const apiOption = {
            method: 'post' as 'post',
            url: "/create",
            data: action.payload.data
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        console.log(result)
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

export default function* talkActions() {
    yield takeLatest (Action.TALK_CREATE_ROOM, createTalkRoom)
}