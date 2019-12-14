import React from 'react'
import { Member } from '../../../reducers/MembersReducer'
import styled from 'styled-components'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import anonymous from '../../../style/img/anonymous.png'

interface BoxProps {
    styled: {
        color1: string
        color2: string
    }
}
const Box = styled(Wrapper)<BoxProps>`
    position: relative;
    width: 140px;
    height: 204px;
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
const SegmentText = styled.span`
    display: block;
    margin-top: 8px;
    color: #888888;
    font-size: 1.1rem;
`

const Card: React.FC<Member> = props => ( 
    <Box styled={{color1: props.color1, color2: props.color2}}>
        <Img src={props.img} styled={{width: '140px', height: '140px'}}/>
        <Wrapper styled={{margin: '16px 0 0 0', text_align: 'center',font_size: '1.2rem', color: '#231815'}}>
            <p>{props.name[0]}</p>
            <Wrapper styled={{margin: '8px 0 0 0', color: '#888888', font_size: '1.0rem'}}>{props.text}</Wrapper>
        </Wrapper>
    </Box>
)

export default Card