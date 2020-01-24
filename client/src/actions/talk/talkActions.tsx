import * as ActionType from './talkConstants'
import { RoomState as RoomCreateState } from '../../components/Organisms/Header/TalkHeader'
import { TalkRoomState, chatState } from '../../reducers/talkReducer'

export type RoomState = Omit<TalkRoomState, 'isRock'> & {chat: chatState[]} 
export type RoomParam = Pick<TalkRoomState, 'isRock' | '_id'> & {password?: string}

export const getAllTalkRooms = () => ({
    type: ActionType.TALK_GET_ALLROOMS
})

export const getTalkRoom = (roomParam : RoomParam) => ({
    type: ActionType.TALK_GET_ROOM,
    payload: {
        ...roomParam
    }
})

export const createTalkRoom = (data: RoomCreateState) => ({
    type: ActionType.TALK_CREATE_ROOM,
    payload: {
        data
    }
})

export const setTalkRooms = (data: TalkRoomState[]) => ({
    type: ActionType.TALK_SET_ROOMS,
    payload: data
})

export const setTalkRoom = (data: RoomState) => ({
    type: ActionType.TALK_SET_ROOM,
    payload: {
        ...data
    }
})

export const changeIsSetRoom = (isSetRoom: boolean) => ({
    type: ActionType.TALK_CHANGE_ISSETROOM,
    payload: {
        isSetRoom
    }
})

export const setChat = (data: chatState[]) => ({
    type: ActionType.TALK_SET_CHAT,
    payload: {
        chat: data
    }
})

export type TalkAction = 
    | ReturnType<typeof getAllTalkRooms>
    | ReturnType<typeof getTalkRoom>
    | ReturnType<typeof createTalkRoom>
    | ReturnType<typeof setTalkRooms>
    | ReturnType<typeof setTalkRoom>
    | ReturnType<typeof changeIsSetRoom>
    | ReturnType<typeof setChat>
    