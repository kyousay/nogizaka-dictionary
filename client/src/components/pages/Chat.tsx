import React, { useEffect } from 'react'
import socket from '../../websocket'
import ChatHeader from '../../cotainers/Organisms/Header/ChatHeader'
import ChatList from '../../cotainers/Pages/Chat/ChatList'
import ChatForm from '../../cotainers/Organisms/Form/ChatForm'
import useReactRouter from 'use-react-router'
import { TalkState, chatState } from '../../reducers/talkReducer'

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
        const scrollList = document.getElementById('js-chatList')
        const scrollField = document.getElementById('js-chatField')

        if(!isSetRoom) {
            history.push("/talk")
            socket.emit("leaveRoom")
        } else {
            socket.emit('joinRoom', {data: roomId})
            socket.on("return chat", (data: {content: chatState[]}) => {
                const chatData = data.content
                setChat(chatData)
            })
        }

        if(scrollList !== null && scrollField !== null) {
            const screenHeight = window.screen.height
            const scrollHeight = scrollList.clientHeight
            const scrollQty = scrollHeight > screenHeight ? scrollHeight - screenHeight : 0
            scrollField.scrollTop = scrollQty
        }
    },[props.talk.isSetRoom, props.talk.room._id, props.setChat, history])

    return(
        <React.Fragment>
            <ChatHeader />
            <ChatList />
            <ChatForm />
        </React.Fragment>
    )
}

export default Chat