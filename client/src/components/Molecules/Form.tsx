import React from 'react'
import styled from 'styled-components'
import Inputs, {Props as InputsProps} from './Inputs'
import Buttons, {Props as ButtonsProps} from './Buttons'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

const FormElement = styled.form`
    margin: 0 auto;
    text-align: center;
`

export interface Props {
    inputsProps: InputsProps
    buttonsProps: ButtonsProps
    wrapperStyle?: WrapperStyle
    submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form: React.FC<Props> = (props) => {
    return(
        <>
            <FormElement onSubmit={props.submitHandler}>
                <Wrapper styled={{...props.wrapperStyle}}>
                    <Inputs {...props.inputsProps} />
                    <Buttons {...props.buttonsProps} />
                </Wrapper>
            </FormElement>
        </>
    )
}

export default Form