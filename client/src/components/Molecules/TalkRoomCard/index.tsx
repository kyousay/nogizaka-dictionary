import React from 'react'
import styled from 'styled-components'
import {Paragragh} from '../../Atoms/Paragragh'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import Txt from '../../Atoms/Txt'
import { TalkRoomState } from '../../../reducers/talkReducer';

const Box = styled(Wrapper)`
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`

const Description = styled(Txt)`
    display: block;
    overflow-y: scroll;
    word-break: break-word;
    min-height: 40px;
    padding: 5px 10px;
`

const wrapperStyle = {
    position: 'relative',
    width: '120px',
    margin: '20px 16px',
    bgColor: '#fff' as '#fff',
}

interface Props {
    room: TalkRoomState
    iconImage?: string
}

const TalkRoomCard: React.FC<Props> = props => (
        <Box styled={{...wrapperStyle}}>
            {
                props.iconImage?
                    <Wrapper styled={{position: 'absolute', right: '5px', top: '3px'}} >
                        <Img styled={{width: '20px', height: '20px'}} src={props.iconImage}/>
                    </Wrapper>
                : null
            }
            <Img src={props.room.image} styled={{width: '100%'}}/>
            <Wrapper styled={{margin: '16px 0 0 0', text_align: 'center'}}>
                <Paragragh styled={{font_size: '1.2rem', color: '#231815'}}>{props.room.roomName}</Paragragh>
                <Wrapper styled={{margin: '8px 0 0 0'}}>
                    <Description styled={{color: '#888888', font_size: '1.0rem'}}>{props.room.description}</Description>
                </Wrapper>
            </Wrapper>
        </Box>
)

export default TalkRoomCard