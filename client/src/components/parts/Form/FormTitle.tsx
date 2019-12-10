import React from 'react'
import Paragragh  from '../../Atoms/Paragragh'
import Wrapper from '../../Atoms/Wrapper'

interface props {
    title : string
}

const FormTitle: React.FC<props> = (props) => {
    return(
        <Wrapper styled={{padding: '18px 0'}}>
            <Paragragh styled={{font_size: '1.8rem', text_align: 'center'}}>{props.title}</Paragragh>
        </Wrapper>
    )
}

export default FormTitle