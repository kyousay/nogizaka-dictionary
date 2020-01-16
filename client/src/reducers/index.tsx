import { combineReducers } from 'redux'
import MembersReducer, { MembersState } from './membersReducer'
import userReducer, {userState} from './userReducer'
import talkReducer, {TalkState} from './talkReducer'


export type StateValue = MembersState & userState
export interface State {
    members: MembersState
    user: userState
    talk: TalkState
}

const rootReducer = combineReducers({
    members: MembersReducer,
    user: userReducer,
    talk: talkReducer,
})

export default rootReducer