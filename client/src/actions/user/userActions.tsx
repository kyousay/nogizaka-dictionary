import * as ActionType from './userConstants'
import {userProfile} from '../../components/Organisms/Header/TopHeader'

export const upDateUserData = (data : userProfile) => ({
    type: ActionType.USER_UPDATE_USERDATA as typeof ActionType.USER_UPDATE_USERDATA,
    payload: {
        ...data
    }
})

export const setUserData = (data : userProfile) => ({
    type: ActionType.USER_SET_USERDATA as typeof ActionType.USER_SET_USERDATA,
    payload: {
        ...data
    }
})

export const changeLoading = (isLoading: boolean) => ({
    type: ActionType.USER_CHANGE_LOADING as typeof ActionType.USER_CHANGE_LOADING,
    payload: {
        loading: isLoading
    }
})

export type UserAction = 
    | ReturnType<typeof upDateUserData>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof changeLoading>