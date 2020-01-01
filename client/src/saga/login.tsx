import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/login/loginConstants'
import * as LoginAction from '../actions/login/loginActions'
import { loginUserFactory } from '../api/loginUserFactory'

function* createAcount(action : ReturnType<typeof LoginAction.createAcount>){
    const userData = action.payload;
    
    try{
        const api = loginUserFactory();
        const result = yield call(api, userData, '/login/create')
        yield alert(result.data);
    }catch(error) {
        yield alert(error);
    }
}

function* loginAcount(action : ReturnType<typeof LoginAction.loginAcount>) {
    const userData = action.payload;

    try {
        const api = loginUserFactory();
        const result = yield call(api, userData, '/login/authenticate');
        console.log(result);
        alert(result.data.message);
        if(result.data.success) {
            yield localStorage.setItem('ticket',result.data.token);
            yield put(LoginAction.setUserData({...result.data.user}))
            yield put(LoginAction.changeUserIsLogin({isLogin:true}))
        }
    }catch(error) {
        yield alert(error);
    }
}


export default function* loginActions() {
    yield takeLatest (Action.LOGIN_CREATE_ACOUNT, createAcount)
    yield takeLatest (Action.LOGIN_USER_ACOUNT, loginAcount)
}