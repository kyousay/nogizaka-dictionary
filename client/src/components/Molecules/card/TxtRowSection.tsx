import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'
import {Paragragh} from '../../Atoms/Paragragh'

interface Props {
    title: string
    content: string
    //stringliteraltypesで宣言できると良い
    title_width: string
}

const TxtRowSection : React.FC<Props> = props => (
        <Wrapper styled={{display: 'flex'}}>
            <Paragragh styled={{width: props.title_width ,color: '#767676', font_size: '1.2rem'}}>{props.title}</Paragragh>
            <Txt styled={{font_size: '1.4rem'}}>{props.content}</Txt>
        </Wrapper>
)

export default TxtRowSection