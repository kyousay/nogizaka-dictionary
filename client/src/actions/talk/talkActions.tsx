import * as ActionType from './talkConstants'
import { RoomState } from '../../components/Organisms/Header/TalkHeader'
import { TalkRoomState } from '../../reducers/talkReducer'

export const createTalkRoom = (data: RoomState) => ({
    type: ActionType.TALK_CREATE_ROOM as typeof ActionType.TALK_CREATE_ROOM,
    payload: {
        data
    }
})

export const setTalkRooms = (data: TalkRoomState[]) => ({
    type: ActionType.TALK_SET_ROOMS as typeof ActionType.TALK_SET_ROOMS,
    payload: data
})

export const setTalkRoom = (data: TalkRoomState) => ({
    type: ActionType.TALK_SET_ROOM as typeof ActionType.TALK_SET_ROOM,
    payload: {
        ...data
    }
})


export type TalkAction = 
    | ReturnType<typeof createTalkRoom>
    | ReturnType<typeof setTalkRooms>
    | ReturnType<typeof setTalkRoom>
    