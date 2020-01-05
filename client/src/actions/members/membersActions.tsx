import { MemberState as addMemberState } from '../../components/Organisms/Form/AdminForm'
import { MemberState as updateMemberState } from '../../components/Organisms/Form/UpdateForm'
import { MembersState} from '../../reducers/membersReducer'
import * as ActionType from './membersConstants'

export const addMember = (member : addMemberState) => ({
    type: ActionType.MEMBERS_MEMBER_ADD as typeof ActionType.MEMBERS_MEMBER_ADD,
    payload: {...member} 
})

export const updateMember = (member : updateMemberState) => ({
    type: ActionType.MEMBERS_MEMBER_UPDATE as typeof ActionType.MEMBERS_MEMBER_UPDATE,
    payload: {...member}
})

export const deleteMember = (memberId: string) => ({
    type: ActionType.MEMBERS_MEMBER_DELETE as typeof ActionType.MEMBERS_MEMBER_DELETE,
    payload: memberId
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
    |ReturnType<typeof addMember>
    |ReturnType<typeof updateMember>
    |ReturnType<typeof deleteMember>
    |ReturnType<typeof getAllMembers>
    |ReturnType<typeof storageMembers>