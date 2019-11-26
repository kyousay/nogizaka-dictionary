import React from 'react'
import { Member } from '../../../reducers/MembersReducer'
import styled from 'styled-components'
import anonymous from '../../../style/img/anonymous.png'

interface BoxProps {
    styled: {
        color1: string
        color2: string
    }
}
const Box = styled.div<BoxProps>`
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

const Image = styled.img`
    width: 140px;
    height: 140px;
`

const TextBox = styled.div`
    margin-top: 16px;
    text-align: center;
    font-size: 1.3rem;
    color: #231815;
`

const SegmentText = styled.span`
    display: block;
    margin-top: 8px;
    color: #888888;
    font-size: 1.1rem;
`

const Card: React.FC<Member> = props => { 
    const image = props.img ? props.img : anonymous
    const name = props.name
    const [color1,color2] = props.sailium? props.sailium : ['#bd92bf','#bd92bf']
    const segment = props.segment ? props.segment + "期生" : "卒業生"
    return( 
        <Box styled={{color1: color1,color2: color2}}>
            <Image src={image} />
            <TextBox>
                <p>{name[0]}</p>
                <SegmentText>{segment}</SegmentText>
            </TextBox>
        </Box>
    )
}

export default Card