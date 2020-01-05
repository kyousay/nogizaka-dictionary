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
    console.log(userData)
    
    try{
        const api = userDataFactory();
        yield put(userAction.changeLoading(true))
        const result = yield call(api, userData, '/user/update')
        const data : typeof userData = result.data
        const props = {
            nickName: data.nickName,
            message: data.message,
            rank: data.rank
        }
        console.log(props);
        console.log(data);
        yield put(userAction.setUserData({...props}))
        yield put(userAction.changeLoading(false))
    }catch(error) {
        yield alert(error)
    }
}

export default function* userActions() {
    yield takeLatest (Action.USER_UPDATE_USERDATA, upDateUserData)
}