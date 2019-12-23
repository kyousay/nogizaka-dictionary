import React from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Input from '../Atoms/Input'
import Wrapper from '../Atoms/Wrapper'

const Form = styled.form`
    margin: 0 auto;
    text-align: center;
`

const inputStyle = {
    font_size: '1.4rem' as '1.4rem', 
    padding: '5px 8px', 
    width: '280px',
    border: '1px solid #dddfe2'
}

interface PresenterProps {
    input1: InputTypes
    input2: InputTypes
    buttonText: string
    submitHandler?: (e: React.FormEvent<HTMLElement>) => void
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface InputTypes {
    type: 'text' | 'textarea' | 'password' | 'email'
    value: string
    placeholder?: string
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormM: React.FC<PresenterProps> = (props) => {
    return(
        <>
            <Form onSubmit={props.submitHandler}>
                <Wrapper styled={{margin:'10px'}}>
                    <Input type={props.input1.type} placeholder={props.input1.placeholder} value={props.input1.value} onChange={props.input1.onChangeHandler}
                    styled={{...inputStyle}} />
                </Wrapper>
                <Wrapper styled={{margin:'10px'}}>
                    <Input type={props.input2.type} placeholder={props.input2.placeholder} value={props.input2.value} onChange={props.input2.onChangeHandler}
                    styled={{...inputStyle}} />
                </Wrapper>
                <Wrapper styled={{margin:'10px'}}>
                    <Button styled={{width:"280px",bgColor:"#bf87c1",padding: '10px 0px'}}>{props.buttonText}</Button>
                </Wrapper>
            </Form>
        </>
    )
}

export default FormM