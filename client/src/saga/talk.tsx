import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/talk/talkConstants'
import * as talkAction from '../actions/talk/talkActions'
import * as userAction from '../actions/user/userActions'
import { userDataFactory } from '../api/userDataFactory'

function* createTalkRoom(action : ReturnType<typeof talkAction.createTalkRoom>){
    const userData = action.payload;
    console.log(action.payload)
}

export default function* talkActions() {
    yield takeLatest (Action.TALK_CREATE_ROOM, createTalkRoom)
}