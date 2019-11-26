import { membersState } from '../../reducers/MembersReducer'
import * as ActionType from './membersConstants'

export const addMembers = (members : membersState) => ({
    type: ActionType.ADD as typeof ActionType.ADD,
    payload: { ...members }
})

export type MembersAction = 
    |ReturnType<typeof addMembers>