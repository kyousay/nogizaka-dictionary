import { put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/login/loginConstants'
import * as LoginAction from '../actions/login/loginActions'
import * as userAction from '../actions/user/userActions'
import { loginUserFactory } from '../api/loginApiFactory'

function* createAcount(action : ReturnType<typeof LoginAction.createAcount>){
    const userData = action.payload;
    
    try{
        const api = loginUserFactory();
        yield put(userAction.changeLoading(true))
        const result = yield call(api, userData, '/login/create')
        yield put(userAction.changeLoading(false))
        yield alert(result.data);
    }catch(error) {
        yield alert(error);
        yield put(userAction.changeLoading(false))
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
        yield put(userAction.changeLoading(false))
    }
}


export default function* loginActions() {
    yield takeLatest (Action.LOGIN_CREATE_ACOUNT, createAcount)
    yield takeLatest (Action.LOGIN_USER_ACOUNT, loginAcount)
}