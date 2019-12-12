import React from 'react'
import {Heading3}  from '../../Atoms/Heading'
import Wrapper from '../../Atoms/Wrapper'

interface props {
    title : string
}

const FormTitle: React.FC<props> = (props) => {
    return(
        <Wrapper styled={{padding: '18px 0'}}>
            <Heading3 styled={{font_size: '1.8rem', text_align: 'center'}}>{props.title}</Heading3>
        </Wrapper>
    )
}

export default FormTitle