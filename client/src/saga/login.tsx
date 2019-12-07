import 
    { 
        // all,  fork, put, 
        call, takeLatest} 
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
        alert(result.data.message);

        //jwt認証テスト
        // const apiTest = loginUserFactory({headers: {Authorization : `${result.data.token}`}});
        // const result2 = yield call(apiTest, result.data, '/login/test');
        // console.log(result2);
    }catch(error) {
        yield alert(error);
    }
}


export default function* loginActions() {
    yield takeLatest (Action.CREATE_ACOUNT, createAcount)
    yield takeLatest (Action.LOGIN_ACOUNT, loginAcount)
}