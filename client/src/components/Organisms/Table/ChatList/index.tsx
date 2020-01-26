import React from 'react'
import Wrapper from '../../../Atoms/Wrapper'
import Message from '../../../Molecules/Message'
import { RoomState } from '../../../../reducers/talkReducer'
import styled from 'styled-components'
import { userState } from '../../../../reducers/userReducer'

const UnOrderdList = Wrapper.withComponent('ul')

const ChatField = styled(Wrapper)`
    overflow-y: scroll;
`

const userMessage = {
    bgColor: '#FFEEFF',
    max_width: '80%',
    margin: '0 0 0 auto'
} as const

const otherMessage = {
    bgColor: '#fff',
    max_width: '80%',
    margin: '0 0 0'
} as const

interface Props {
    user: userState
    room: RoomState
}

const ChatTable: React.FC<Props> = (props) => {
    const chats = props.room.chat

    return (
        <React.Fragment>
            <ChatField id={"js-chatField"} styled={{max_height: '100vh'}}>
            {   <UnOrderdList id={"js-chatList"} styled={{padding: '100px 40px 100px 40px', max_width: '670px', margin: '0 auto'}}>
                    {chats.map((chat,index) => {
                        const isUser = props.user.userId === chat.userId
                        const style = isUser ? userMessage : otherMessage
                        const align = isUser ? 'right' : 'left'
                        
                        return(
                            <Wrapper as="li" styled={{display: 'flex', justify_content: align, margin: '10px 0 0 0'} as const} key={index}>
                                <Message chat={chat} style={style}/>
                            </Wrapper>
                        )})
                    }
                </UnOrderdList>
            }
            </ChatField>
        </React.Fragment>
    )
}

export default ChatTable