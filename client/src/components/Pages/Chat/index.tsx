import React, { useEffect } from 'react'
import socket from '../../../websocket'
import ChatHeader from '../../../cotainers/organisms/Header/ChatHeader'
import ChatSpHeader from '../../../cotainers/organisms/Header/ChatHeader/sp'
import ChatList from '../../../cotainers/organisms/Table/ChatList'
import ChatForm from '../../../cotainers/organisms/Form/ChatForm'
import ChatSpForm from '../../../cotainers/organisms/Form/ChatForm/sp'
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