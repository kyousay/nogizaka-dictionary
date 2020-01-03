import { MemberState } from '../../components/Organisms/Form/AdminForm'
import * as ActionType from './membersConstants'

export const addMembers = (members : MemberState) => ({
    type: ActionType.MEMBERS_MEMBER_ADD as typeof ActionType.MEMBERS_MEMBER_ADD,
    payload: {...members} 
})

export type MembersAction = 
    |ReturnType<typeof addMembers>