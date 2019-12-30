import 
    { 
        // all,  fork, 
        call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/user/userConstants'
import * as userAction from '../actions/user/userActions'
import { userDataFactory } from '../api/userDataFactory'

function* upDateUserData(action : ReturnType<typeof userAction.upDateUserData>){
    const userData = action.payload;
    
    try{
        const api = userDataFactory();
        const result = yield call(api, userData, '/user/update')
        console.log(result)
    }catch(error) {
        yield alert(error)
    }
}

export default function* userActions() {
    yield takeLatest (Action.USER_UPDATE_USERDATA, upDateUserData)
}