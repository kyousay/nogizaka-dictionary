import React from 'react'
import ChatHeader from '../../cotainers/Organisms/Header/ChatHeader'
import ChatList from '../../cotainers/Pages/Chat/ChatList'
import ChatForm from '../../components/Organisms/Form/ChatForm'

const Chat = () => (
        <React.Fragment>
            <ChatHeader />
            <ChatList />
            <ChatForm />
        </React.Fragment>
)

export default Chat