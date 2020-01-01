import * as ActionType from './loginConstants'
import { userState } from '../../reducers/userReducer'

export interface DataType {
    email: string
    password: string
}

export interface UserIsLogin {
    isLogin: boolean
}

export const createAcount = (data : DataType) => ({
    type: ActionType.LOGIN_CREATE_ACOUNT as typeof ActionType.LOGIN_CREATE_ACOUNT,
    payload: {
        ...data
    }
})

export const loginAcount = (data: DataType) => ({
    type: ActionType.LOGIN_USER_ACOUNT as typeof ActionType.LOGIN_USER_ACOUNT,
    payload: {
        ...data
    }
})

export const setUserData = (data : userState) => ({
    type: ActionType.LOGIN_SET_USERDATA as typeof ActionType.LOGIN_SET_USERDATA,
    payload: {
        ...data
    }
})

export const changeUserIsLogin = (isLogin : Pick<UserIsLogin,'isLogin'>) => ({
    type: ActionType.LOGIN_CHANGE_USER_ISLOGIN as typeof ActionType.LOGIN_CHANGE_USER_ISLOGIN,
    payload: isLogin
})

export type LoginAction =
    |ReturnType<typeof createAcount>
    |ReturnType<typeof loginAcount>
    |ReturnType<typeof setUserData>
    |ReturnType<typeof changeUserIsLogin>