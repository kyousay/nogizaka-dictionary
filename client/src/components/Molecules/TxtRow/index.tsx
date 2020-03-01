import React from 'react'
import styled from 'styled-components'
import Wrapper ,{ElementStyle as WrapperStyle}from '../../atoms/Wrapper'
import Txt, {ElementStyle as ContentStyle} from '../../atoms/Txt'
import {Paragragh, ElementStyle as TitleStyle} from '../../atoms/Paragragh'

export interface Props  {
    title: string
    content: string
    wrapperStyle?: WrapperStyle
    titleWrapperStyle?: WrapperStyle
    titleStyle?: TitleStyle
    contentWrapperStyle?: WrapperStyle
    contentStyle?: ContentStyle 
}

const TxtRowWrapper = styled(Wrapper)`
    border-top: ${props => props.styled.border_top}
`

const TxtRowTxt = styled(Txt)`
    word-break: ${props => props.styled.word_break};    
`


const TxtRow : React.FC<Props> = props => (
    <TxtRowWrapper styled={{...props.wrapperStyle,display: 'flex'}}>
        <Wrapper styled={{...props.titleWrapperStyle}}>
            <Paragragh styled={{...props.titleStyle}}>{props.title}</Paragragh>
        </Wrapper>
        <Wrapper styled={{...props.contentWrapperStyle}}>
            <TxtRowTxt styled={{...props.contentStyle}}>{props.content}</TxtRowTxt>
        </Wrapper>
    </TxtRowWrapper>
)

export default TxtRow