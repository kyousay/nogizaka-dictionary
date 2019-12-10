import React from 'react'
import styled from 'styled-components'
import { ChangeEvent } from 'react';

interface InputStyle {
    [k: string] : string
}

interface InputProps {
    styled: InputStyle
    type: string
    placeholder? : string
    value?: string 
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputElement = styled.input<InputProps>`
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    border: ${props => props.styled.border};
    font-size: ${props => props.styled.font_size};    
`

const Input : React.FC<InputProps> = ({
    styled,
    type,
    onChange,
}) => <InputElement type={type} styled={styled} onChange={onChange}/>

export default Input