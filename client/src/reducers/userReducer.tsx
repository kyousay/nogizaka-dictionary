import { Reducer } from 'redux'
import { LoginAction } from '../actions/login/loginActions'
import * as ActionType from '../actions/login/loginConstants'

const initialState = {
    nickName: '',
    favoriteMembers: [{}],
    login: false,
}

export type userState = typeof initialState

const UserReducer : Reducer<userState, LoginAction> = (state : userState = initialState, action : LoginAction) => {
    switch(action.type) {
        case ActionType.SET_USERDATA : 
            return {
                ...state,
                ...action.payload
            }
        case ActionType.CHANGE_USER_ISLOGIN :
            return {
                ...state,
                login: action.payload.isLogin
            }
        default : 
            return state
    }
}

export default UserReducer