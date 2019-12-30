import * as ActionType from './userConstants'
import {userProfile} from '../../components/Organisms/Header/TopHeader'

export const upDateUserData = (data : userProfile) => ({
    type: ActionType.USER_UPDATE_USERDATA as typeof ActionType.USER_UPDATE_USERDATA,
    payload: {
        ...data
    }
})

export type LoginAction = 
    | ReturnType<typeof upDateUserData>