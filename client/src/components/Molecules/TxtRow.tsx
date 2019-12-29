import React from 'react'
import Wrapper ,{ElementStyle as WrapperStyle}from '../Atoms/Wrapper'
import Txt, {ElementStyle as ContentStyle} from '../Atoms/Txt'
import {Paragragh, ElementStyle as TitleStyle} from '../Atoms/Paragragh'

export interface Props  {
    title: string
    content: string
    wrapperStyle?: WrapperStyle
    titleWrapperStyle?: WrapperStyle
    titleStyle?: TitleStyle
    contentStyle?: ContentStyle 
}

const TxtRow : React.FC<Props> = props => (
    <Wrapper styled={{...props.wrapperStyle,display: 'flex'}}>
        <Wrapper styled={{...props.titleWrapperStyle}}>
            <Paragragh styled={{...props.titleStyle}}>{props.title}</Paragragh>
        </Wrapper>
        <Txt styled={{...props.contentStyle}}>{props.content}</Txt>
    </Wrapper>
)

export default TxtRow