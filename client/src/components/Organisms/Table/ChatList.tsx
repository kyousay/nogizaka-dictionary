import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import { Member, membersState } from '../../../reducers/membersReducer'
import { userState } from '../../../reducers/userReducer'
import { RoomState } from '../../../reducers/talkReducer'
import styled from 'styled-components'

const UnOrderdList = Wrapper.withComponent('ul')

const ListItem = Wrapper.withComponent('li')

const ChatField = styled(Wrapper)`
    overflow-y: scroll;
    border: 1px solid #dfdfdf;
`

interface Props {
    room: RoomState
}

const ChatTable: React.FC<Props> = (props) => {
    const chats = props.room.chat

    return (
        <React.Fragment>
            <ChatField styled={{margin: '30px auto 0', bgColor: '#fff' as const, padding: '50px', max_width: '700px', height: '400px'}}>
            {   <UnOrderdList styled={{justify_content: "center", flex_wrap: "wrap", padding: '60px 40px 60px 40px' }}>
                    {chats.map((chat,index) => {
                        return(
                            <ListItem styled={{}} key={index}>
                            </ListItem>
                        )})
                    }
                </UnOrderdList>
            }
            </ChatField>
        </React.Fragment>
    )
}

export default ChatTable