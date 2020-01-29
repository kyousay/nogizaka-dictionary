import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/talk/talkConstants'
import * as talkAction from '../actions/talk/talkActions'
import * as loginAction from '../actions/login/loginActions'
import * as userAction from '../actions/user/userActions'
import { talkApiFactory } from '../api/talkApiFactiory'
import socket from '../websocket'

function* getAllTalkRooms(){
    try{
        const api = talkApiFactory();
        const apiOption = {
            method: 'get' as 'get',
            url: '/getTalkRooms'
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        if(result.data.error){
            alert(result.data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            if(result.data.isSuccess) {
                yield put(talkAction.setTalkRooms(result.data.data))
            } else {
                yield alert(result.data.message)
            }
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* getTalkRoom(action: ReturnType<typeof talkAction.getTalkRoom>){
    try{
        const api = talkApiFactory();
        const apiOption = {
            method: 'post' as 'post',
            url: "/getTalkRoom",
            data: action.payload
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(userAction.changeLoading(false))
        if(result.data.error){
            alert(result.data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            if(result.data.isSuccess) {
                yield put(talkAction.setTalkRoom(result.data.data))
                yield put(talkAction.changeIsSetRoom(true))
            } else {
                yield alert(result.data.message)
            }
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* createTalkRoom(action : ReturnType<typeof talkAction.createTalkRoom>){
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
        if(result.data.error){
            alert(result.data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            if(result.data.isSuccess) {
                yield put(talkAction.setTalkRooms(result.data.data))
                yield socket.emit("newRoom");
            } else {
                yield alert(result.data.message)
            }
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

export default function* talkActions() {
    yield takeLatest (Action.TALK_GET_ALLROOMS, getAllTalkRooms)
    yield takeLatest (Action.TALK_GET_ROOM, getTalkRoom)
    yield takeLatest (Action.TALK_CREATE_ROOM, createTalkRoom)
}