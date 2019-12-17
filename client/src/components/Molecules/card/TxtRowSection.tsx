import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'
import {Paragragh} from '../../Atoms/Paragragh'

interface Props {
    title: string
    content: string
    margin?: string
    width?: string 
    padding?: string 
    border_top?: string
    titleSize: '1.2rem' | '1.4rem'
    subSize: '1.2rem' | '1.4rem'
}

const TxtRowSection : React.FC<Props> = props => (
    <Wrapper styled={{display: 'flex', margin: props.margin, padding: props.padding, border_top: props.border_top}}>
        <Wrapper styled={{width: props.width}}>
            <Paragragh styled={{color: '#767676', font_size: props.titleSize}}>{props.title}</Paragragh>
        </Wrapper>
        <Txt styled={{font_size: props.subSize}}>{props.content}</Txt>
    </Wrapper>
)

export default TxtRowSection