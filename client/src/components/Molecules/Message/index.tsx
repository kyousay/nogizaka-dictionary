import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'
import { Paragragh } from '../../Atoms/Paragragh'
import { chatState } from '../../../reducers/talkReducer'
import styled from 'styled-components'

const MessageContent = styled(Paragragh)`
    word-break: break-word;
    line-height: 1.4;
`

const DateTxt = styled(Txt)`
    vertical-align: sub;
`

const MessageWrapper = styled(Wrapper)`
    border-radius: 10px;
`

interface Props {
    chat: chatState
    style: {
        bgColor: '#FFEEFF' | '#fff'
    }
}

const Message: React.FC<Props> = props => (
    <MessageWrapper styled={{display: 'inline-block', padding: '10px 20px', ...props.style}}>
        <Wrapper styled={{display: 'flex' as const}}>
            <Txt styled={{font_size: '1.4rem', font_weight: 'bold'} as const}>{props.chat.userName}</Txt>
            <Wrapper styled={{margin: '0 0 0 10px'}}>
                <DateTxt styled={{font_size: '1.0rem' as const, color: '#797979'}}>{props.chat.date}</DateTxt>
            </Wrapper>
        </Wrapper>
        <Wrapper styled={{margin: '10px 0 0 0'}}>
            <MessageContent styled={{font_size: '1.4rem', color: '#000000'}}>{props.chat.chat}</MessageContent>
        </Wrapper>
    </MessageWrapper>
)

export default Message