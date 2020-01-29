import React, {useEffect} from 'react'
import TalkHeader from '../../../cotainers/Organisms/Header/TalkHeader'
import TalkRoomList from '../../../cotainers/Organisms/Table/TalkRoomList'
import { userState } from '../../../reducers/userReducer'
import { Helmet } from 'react-helmet'
import useReactRouter from 'use-react-router'
import { TalkState, TalkRoomState } from '../../../reducers/talkReducer'
import socket from '../../../websocket'

interface Props {
    user: userState
    talk: TalkState
    isStorageToken: (props: {isLogin: boolean}) => void
    getAllTalkRooms: () => void
    setTalkRooms: (rooms: TalkRoomState[]) => void
}

const Talk: React.FC<Props> = (props) => {
    const {history} = useReactRouter()
    const getAllTalkRooms = props.getAllTalkRooms
    useEffect(() => {
        const isSetRoom = props.talk.isSetRoom
        const isLogin = props.user.login
        const isStorageTokenFnc = props.isStorageToken 
        const setTalkRooms = props.setTalkRooms
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(isLogin !== true || isStorageToken !== true) {
            isStorageTokenFnc({isLogin:isStorageToken})
            history.push('/login')
        } else {
            getAllTalkRooms()
            socket.on("createRoom", (data: TalkRoomState[]) => {
                setTalkRooms(data)
            })
        }
        if(isSetRoom){
            history.push('/chat')
        }
    },[history, getAllTalkRooms, props.user.login, props.isStorageToken, props.talk.isSetRoom, props.setTalkRooms])
    return(
        <>
            <Helmet>
                <title>
                    Nogizaka-Dictinary ~TalkRoomPage~
                </title>
            </Helmet>

            <TalkHeader />
            <TalkRoomList />
        </>
    )
}

export default Talk