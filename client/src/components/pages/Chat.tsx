import React, { useEffect } from 'react'
import ChatHeader from '../../cotainers/Organisms/Header/ChatHeader'
import ChatList from '../../cotainers/Pages/Chat/ChatList'
import ChatForm from '../../cotainers/Organisms/Form/ChatForm'
import useReactRouter from 'use-react-router'
import { TalkState } from '../../reducers/talkReducer'

interface Props {
    talk: TalkState
}

const Chat: React.FC<Props> = props => {
    const {history} = useReactRouter()

    useEffect(() => {
        const isSetRoom = props.talk.isSetRoom
        if(!isSetRoom) {
            history.push("/talk")
        }
    },[props.talk.isSetRoom, history])

    return(
        <React.Fragment>
            <ChatHeader />
            <ChatList />
            <ChatForm />
        </React.Fragment>
    )
}

export default Chat