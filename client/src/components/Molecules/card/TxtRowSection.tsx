import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'
import {Paragragh} from '../../Atoms/Paragragh'

const TxtRowWrapper = styled(Wrapper)`
    &:first-of-type {
        padding-top: 12px;
        border-top: 1px solid #D8D8D8;
    }
    &:not(:first-of-type) {
        margin-top: 12px;
    }
`

interface Props {
    title: string
    content: string
}

const TxtRowSection : React.FC<Props> = props => (
        <TxtRowWrapper styled={{display: 'flex'}}>
            <Wrapper styled={{width: '108px'}}>
                <Paragragh styled={{color: '#767676', font_size: '1.2rem'}}>{props.title}</Paragragh>
            </Wrapper>
            <Txt styled={{font_size: '1.4rem'}}>{props.content}</Txt>
        </TxtRowWrapper>
)

export default TxtRowSection