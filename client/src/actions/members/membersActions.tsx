import { MemberState } from '../../components/Organisms/Form/AdminForm'
import { MembersState } from '../../reducers/membersReducer'
import * as ActionType from './membersConstants'

export const addMembers = (members : MemberState) => ({
    type: ActionType.MEMBERS_MEMBER_ADD as typeof ActionType.MEMBERS_MEMBER_ADD,
    payload: {...members} 
})

export const getAllMembers = () => ({
    type: ActionType.MEMBERS_GET_ALLMEMBERS as typeof ActionType.MEMBERS_GET_ALLMEMBERS,
})

export const storageMembers = (members: MembersState) => ({
    type: ActionType.MEMBERS_STORAGE_MEMBERS as typeof ActionType.MEMBERS_STORAGE_MEMBERS,
    payload: {
        ...members
    }
})

export type MembersAction = 
    |ReturnType<typeof addMembers>
    |ReturnType<typeof getAllMembers>
    |ReturnType<typeof storageMembers>