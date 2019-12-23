import React from 'react'
import Wrapper from '../Atoms/Wrapper'
import Txt from '../Atoms/Txt'
import {Paragragh} from '../Atoms/Paragragh'

export interface Base {
    title: string
    content: string
}

export type Style  = Partial<{
    margin: string
    width: string 
    padding: string 
    border_top: string
    color: string
    titleSize: '1.2rem' | '1.4rem'
    subSize: '1.2rem' | '1.4rem'
}>

type Props = Base & Style

const TxtRow : React.FC<Props> = props => (
    <Wrapper styled={{display: 'flex', margin: props.margin, padding: props.padding, border_top: props.border_top}}>
        <Wrapper styled={{width: props.width}}>
            <Paragragh styled={{color: props.color, font_size: props.titleSize}}>{props.title}</Paragragh>
        </Wrapper>
        <Txt styled={{font_size: props.subSize}}>{props.content}</Txt>
    </Wrapper>
)

export default TxtRow