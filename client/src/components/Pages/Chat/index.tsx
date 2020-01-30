import React, { useEffect } from 'react'
import socket from '../../../websocket'
import ChatHeader from '../../../cotainers/Organisms/Header/ChatHeader'
import ChatSpHeader from '../../../cotainers/Organisms/Header/ChatHeader/sp'
import ChatList from '../../../cotainers/Organisms/Table/ChatList'
import ChatForm from '../../../cotainers/Organisms/Form/ChatForm'
import ChatSpForm from '../../../cotainers/Organisms/Form/ChatForm/sp'
import MediaQuery from 'react-responsive'
import { Helmet } from 'react-helmet'
import useReactRouter from 'use-react-router'
import { TalkState, chatState } from '../../../reducers/talkReducer'

interface Props {
    talk: TalkState
    setChat: (data: chatState[]) => void
}

const Chat: React.FC<Props> = props => {
    const {history} = useReactRouter()

    useEffect(() => {
        const isSetRoom = props.talk.isSetRoom
        const roomId = props.talk.room._id
        const setChat = props.setChat

        if(!isSetRoom) {
            history.push("/talk")
            socket.emit("leaveRoom")
        } else {
            socket.emit('joinRoom', {data: roomId})
            socket.on("return chat", (data: {content: chatState[]}) => {
                const chatData = data.content
                setChat(chatData)
                scrollBottom()
            })
            scrollBottom()
        }
    },[props.talk.isSetRoom, props.talk.room._id, props.setChat, history])

    const scrollBottom = () => {
        const scrollList = document.getElementById('js-chatList')
        const scrollField = document.getElementById('js-chatField')
        if(scrollList !== null && scrollField !== null) {
            scrollField.scrollTop = scrollList.scrollHeight
        }
    }

    return(
        <>
            <Helmet>
                <title>
                    Nogizaka-Dictinary ~ChatPage~ 
                </title>
            </Helmet>

            <MediaQuery minDeviceWidth={769}>
                <ChatHeader />
                <ChatList />
                <ChatForm />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={768}>
                <ChatSpHeader />
                <ChatList />
                <ChatSpForm />
            </MediaQuery>
        </>
    )
}

export default Chat