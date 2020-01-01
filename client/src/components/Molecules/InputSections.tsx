import React from 'react'
import styled from 'styled-components'
import Input, {ElementStyle as InputStyle} from '../Atoms/Input'
import {Paragragh,ElementStyle as ParagraghStyle} from '../Atoms/Paragragh'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

export interface Props {
    inputs: {
        title?: string
        props?: React.InputHTMLAttributes<HTMLInputElement>
    }[]
    paragraghStyle?: ParagraghStyle
    InputStyle?: InputStyle
    wrapperStyle?: WrapperStyle
}

const InputTitle = styled(Paragragh)`
    width: ${props => props.styled.width}
`


const InputSections : React.FC<Props> = (props) => (
    <React.Fragment>
        {
            props.inputs.map((input, index) => (
                <Wrapper styled={{...props.wrapperStyle}} key={index}>
                    <InputTitle styled={{...props.paragraghStyle}}>{input.title}</InputTitle>
                    <Input styled={{...props.InputStyle}} {...input.props}/>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default InputSections