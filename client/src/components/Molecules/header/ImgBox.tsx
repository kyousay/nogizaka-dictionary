import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import {Paragragh} from '../../Atoms/Paragragh'

interface Props {
    description: string
    src: string
    width?: string
    margin?: string
    font_size?: '1.2rem' | '1.4rem' | '1.8rem'
}

const ImgBox : React.FC<Props> = (props) => (
    <Wrapper styled={{display: 'flex', justify_content: 'center', align_items: 'center', flex_direction: 'column'}} >
        <Img src={props.src} styled={{width: props.width}} />
        <Paragragh styled={{font_size: props.font_size}}>{props.description}</Paragragh>
    </Wrapper>
)

export default ImgBox