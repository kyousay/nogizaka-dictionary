import { all, call, fork, put, takeLatest} from 'redux-saga/effects'
import * as Action from '../actions/login/loginConstants'
import { LoginAction } from '../actions/login/loginActions'

function* createAcount(action : LoginAction){
    yield console.log(action);
}

function* loginAcount(action : LoginAction) {
    yield console.log(action);
}


export default function* loginActions() {
    yield takeLatest (Action.CREATE_ACOUNT, createAcount)
    yield takeLatest (Action.LOGIN_ACOUNT, loginAcount)
}