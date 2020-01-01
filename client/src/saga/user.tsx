import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/user/userConstants'
import * as userAction from '../actions/user/userActions'
import { userDataFactory } from '../api/userDataFactory'

function* upDateUserData(action : ReturnType<typeof userAction.upDateUserData>){
    const userData = action.payload;
    
    try{
        const api = userDataFactory();
        const result = yield call(api, userData, '/user/update')
        const data : typeof userData = result.data
        const props = {
            nickName: data.nickName,
            message: data.message,
            rank: data.rank
        }
        yield put(userAction.setUserData({...props}))
    }catch(error) {
        yield alert(error)
    }
}

export default function* userActions() {
    yield takeLatest (Action.USER_UPDATE_USERDATA, upDateUserData)
}