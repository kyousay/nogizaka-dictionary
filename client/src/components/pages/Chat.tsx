import React from 'react'
// import io from 'socket.io-client'
import ChatHeader from '../../cotainers/Organisms/Header/ChatHeader'
import ChatList from '../../cotainers/Pages/Chat/ChatList'
import ChatForm from '../../cotainers/Organisms/Form/ChatForm'

const Chat = () => {
    return(
        <React.Fragment>
            <ChatHeader />
            <ChatList />
            <ChatForm />
        </React.Fragment>
    )
}

export default Chat