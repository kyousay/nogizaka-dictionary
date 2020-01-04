import { Reducer } from 'redux'
import { MembersAction } from '../actions/members/membersActions'
import * as ActionType from '../actions/members/membersConstants'


const initialState  = {
    members: [
        {
            _id: '',
            image: '',
            name: ['',''],
            sailium: ['', ''],
            segment: '',
            dateOfBirth : '',
            blod: '',
            height: '',
            hash:['']
        }
    ]
}

export type membersState = typeof initialState.members
export type MembersState = typeof initialState
export type Member = typeof initialState.members[0]

const MembersReducer : Reducer<MembersState, MembersAction> = (state : MembersState = initialState, action : MembersAction) => {
    switch(action.type) {
        case ActionType.MEMBERS_STORAGE_MEMBERS : 
            return {
                ...state,
                members: action.payload.members
            }
        default : 
            return state
    }
}

export default MembersReducer