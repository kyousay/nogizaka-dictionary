import React from 'react'
import styled from 'styled-components'
import Inputs, {Props as InputsProps} from '../Inputs'
import FormBaseElement from '../../atoms/FormElement'
import Buttons, {Props as ButtonsProps} from '../Buttons'
import Wrapper, {ElementStyle as WrapperStyle} from '../../atoms/Wrapper'

const FormElement = styled(FormBaseElement)`
    margin: 0 auto;
    text-align: center;
`

export interface Props {
    inputsProps: InputsProps
    buttonsProps: ButtonsProps
    wrapperStyle?: WrapperStyle
    submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form: React.FC<Props> = props => (
        <>
            <FormElement onSubmit={props.submitHandler}>
                <Wrapper styled={{...props.wrapperStyle}}>
                    <Inputs {...props.inputsProps} />
                    <Buttons {...props.buttonsProps} />
                </Wrapper>
            </FormElement>
        </>
)

export default Form