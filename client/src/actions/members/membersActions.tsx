import { MemberState as addMemberState } from '../../components/Organisms/Form/AdminForm'
import { MemberState as updateMemberState } from '../../components/Organisms/Form/UpdateForm'
import { MembersState} from '../../reducers/membersReducer'
import * as ActionType from './membersConstants'

export const addMembers = (member : addMemberState) => ({
    type: ActionType.MEMBERS_MEMBER_ADD as typeof ActionType.MEMBERS_MEMBER_ADD,
    payload: {...member} 
})

export const updateMembers = (member : updateMemberState) => ({
    type: ActionType.MEMBERS_MEMBER_UPDATE as typeof ActionType.MEMBERS_MEMBER_UPDATE,
    payload: {...member}
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
    |ReturnType<typeof updateMembers>
    |ReturnType<typeof getAllMembers>
    |ReturnType<typeof storageMembers>