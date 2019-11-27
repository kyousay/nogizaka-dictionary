import { combineReducers } from 'redux'
import MembersReducer, { MembersState } from './MembersReducer'
import userReducer, {userState} from './userReducer'


export type StateValue = MembersState & userState
export interface State {
    members: MembersState
    user: userState
}

const rootReducer = combineReducers({
    members: MembersReducer,
    user: userReducer
})

export default rootReducer