import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/user/userConstants'
import * as loginAction from '../actions/login/loginActions'
import * as userAction from '../actions/user/userActions'
import { userDataFactory } from '../api/userApiFactory'

function* upDateUserData(action : ReturnType<typeof userAction.upDateUserData>){
    const userData = action.payload;
    
    try{
        const api = userDataFactory();
        const apiOption = {
            method: 'put' as 'put',
            data: userData,
            url: '/update'
        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api,apiOption)
        const data  = result.data
        const props = {
            nickName: data.nickName,
            message: data.message,
            rank: data.rank,
        }
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield put(userAction.setUserData({...props}))
            yield put(userAction.changeLoading(false))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* favoriteMember(action: ReturnType<typeof userAction.favoriteMember>) {
    try{
        const api = userDataFactory();
        const apiOption = {
            method: 'put' as 'put',
            data: {id: action.payload.id},
            url: '/favorite'

        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield put(loginAction.setUserData(data))
            yield put(userAction.changeLoading(false))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

function* unfavoriteMember(action: ReturnType<typeof userAction.favoriteMember>) {
    try{
        const api = userDataFactory();
        const apiOption = {
            method: 'put' as 'put',
            data: {id: action.payload.id},
            url: '/unfavorite'

        }
        yield put(userAction.changeLoading(true))
        const result = yield call(api, apiOption)
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
            yield put(loginAction.changeUserIsLogin({isLogin: false}))
        } else {
            yield put(loginAction.setUserData(data))
            yield put(userAction.changeLoading(false))
        }
    }catch(error) {
        yield alert(error)
        yield put(userAction.changeLoading(false))
    }
}

export default function* userActions() {
    yield takeLatest (Action.USER_UPDATE_USERDATA, upDateUserData)
    yield takeLatest (Action.USER_FAVORITE_MEMBER, favoriteMember)
    yield takeLatest (Action.USER_UNFAVORITE_MEMBER, unfavoriteMember)
}