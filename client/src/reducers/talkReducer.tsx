import { Reducer } from 'redux'
import * as ActionType from '../actions/talk/talkConstants'
import {TalkAction} from '../actions/talk/talkActions'

export interface chatState {
    userName: string
    Date: string
}

export interface TalkRoomState {
    id: string
    roomName: string,
    description: string,
    image: string,
    talk: chatState[],
}

export const initialState = {
    rooms: [] as TalkRoomState[],
    room: {
        id: '',
        roomName: '',
        description: '',
        image: '',
        talk: [] as chatState[],
    }
}

export type TalkState = typeof initialState

const TalkReducer : Reducer<TalkState, TalkAction> = (state : TalkState = initialState, action: TalkAction) => {
    switch(action.type) {
        case ActionType.TALK_SET_ROOMS :
            return {
                ...state,
                rooms: action.payload
            }
        case ActionType.TALK_SET_ROOM :
            return {
                ...state,
                room: action.payload
            }
        default: 
            return state
    }
}

export default TalkReducer