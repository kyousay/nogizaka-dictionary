import { Reducer } from 'redux'
import * as ActionType from '../actions/talk/talkConstants'
import {TalkAction} from '../actions/talk/talkActions'

export interface chatState {
    userId: string
    userName: string
    chat: string
    date: string
}

export interface TalkRoomState {
    _id: string
    roomName: string,
    description: string,
    image: string,
    isRock: boolean
}

export const initialState = {
    rooms: [] as TalkRoomState[],
    room: {
        _id: '',
        roomName: '',
        description: '',
        image: '',
        chat: [] as chatState[],
    },
    isSetRoom: false
}

export type RoomState = typeof initialState.room

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
        case ActionType.TALK_CHANGE_ISSETROOM :
            return {
                ...state,
                isSetRoom: action.payload.isSetRoom
            }
        case ActionType.TALK_SET_CHAT : 
            return {
                ...state,
                room: {
                    ...state.room,
                    chat: action.payload.chat
                }
            }
        default: 
            return state
    }
}

export default TalkReducer