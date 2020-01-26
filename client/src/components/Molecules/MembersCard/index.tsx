import React from 'react'
import {Member} from '../../../reducers/membersReducer'
import styled from 'styled-components'
import {Paragragh} from '../../Atoms/Paragragh'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import Txt from '../../Atoms/Txt'

interface BoxProps {
    styled: {
        color1: string
        color2: string
    }
}
const Box = styled(Wrapper)<BoxProps>`
    position: relative;
    width: 120px;
    height: 210px;
    margin: 20px 16px;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    &::before,::after {
        content: '';
        position: absolute;
        height: 3px;
        width: 50%;
        bottom: 0;
    }
    &::before {
        right: 0;
        background-color: ${props => props.styled.color1};
    }
    &::after {
        left: 0;
        background-color: ${props => props.styled.color2};
    }
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`

interface Props {
    member: Member
    favoriteImage: string
    iconClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const MembersCard: React.FC<Props> = props => (
        <Box styled={{color1: props.member.sailium[0], color2: props.member.sailium[1]}}>
            <Wrapper styled={{position: 'absolute', right: '5px', top: '3px'}} 
                onClick={props.iconClickHandler}>
                <Img styled={{width: '20px', height: '20px'}} src={props.favoriteImage}/>
            </Wrapper>
            <Img src={props.member.image} styled={{width: '100%'}}/>
            <Wrapper styled={{margin: '16px 0 0 0', text_align: 'center'}}>
                <Paragragh styled={{font_size: '1.2rem', color: '#231815'}}>{props.member.name[0]}</Paragragh>
                <Wrapper styled={{margin: '8px 0 0 0'}}>
                    <Txt styled={{color: '#888888', font_size: '1.0rem'}}>{props.member.segment}</Txt>
                </Wrapper>
            </Wrapper>
        </Box>
)

export default MembersCard