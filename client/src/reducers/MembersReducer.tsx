import { Reducer } from 'redux'
import image from '../style/img/宣材写真/1.jpg'
import { MembersAction } from '../actions/members/membersActions'
import * as ActionType from '../actions/members/membersConstants'


const initialState  = {
    members: [
        {
            img: image,
            name: ['秋元真夏','manatsu akimoto'],
            sailium: ['blue', 'red'],
            segment: '3期生',
            dateOfBirth : '1992年6月19日',
            blod: 'O型',
            height: '170',
            hash:['現役生']
        }
    ]
}

export type membersState = typeof initialState.members
export type MembersState = typeof initialState
export type Member = typeof initialState.members[0]

const MembersReducer : Reducer<MembersState, MembersAction> = (state : MembersState = initialState, action : MembersAction) => {
    switch(action.type) {
        default : 
            return state
    }
}

export default MembersReducer