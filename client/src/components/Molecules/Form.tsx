import React from 'react'
import styled from 'styled-components'
import Inputs, {Props as InputsProps} from './Inputs'
import Buttons, {Props as ButtonsProps} from './Buttons'

const FormElement = styled.form`
    margin: 0 auto;
    text-align: center;
`

export interface Props {
    inputsProps: InputsProps
    buttonsProps: ButtonsProps
    submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form: React.FC<Props> = (props) => {
    return(
        <>
            <FormElement onSubmit={props.submitHandler}>
                <Inputs {...props.inputsProps} />
                <Buttons {...props.buttonsProps} />
            </FormElement>
        </>
    )
}

export default Form