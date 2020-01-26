import React from 'react'
import styled from 'styled-components'
import Input, {ElementStyle as InputStyle} from '../../Atoms/Input'
import {Paragragh,ElementStyle as ParagraghStyle} from '../../Atoms/Paragragh'
import Wrapper, {ElementStyle as WrapperStyle} from '../../Atoms/Wrapper'

export interface Props {
    inputs: {
        title?: string
        props?: React.InputHTMLAttributes<HTMLInputElement>
        inputStyle?: InputStyle
        inputTitleStyle?: ParagraghStyle
        wrapperStyle?: WrapperStyle
    }[]
    baseInputTitleStyle?: ParagraghStyle
    baseInputStyle?: InputStyle
    baseWrapperStyle?: WrapperStyle
}

const InputTitle = styled(Paragragh)`
    width: ${props => props.styled.width}
`


const InputSections : React.FC<Props> = (props) => (
    <React.Fragment>
        {
            props.inputs.map((input, index) => (
                <Wrapper styled={{...props.baseWrapperStyle, ...input.wrapperStyle}} key={index}>
                    <InputTitle styled={{...props.baseInputTitleStyle, ...input.inputTitleStyle}}>{input.title}</InputTitle>
                    <Input styled={{...props.baseInputStyle, ...input.inputStyle}} {...input.props}/>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default InputSections