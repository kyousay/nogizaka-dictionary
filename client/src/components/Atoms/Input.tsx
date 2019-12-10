import React from 'react'
import styled from 'styled-components'

interface InputProps {
    [k: string]: any
}

const InputElement = styled.input<InputProps>`
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    border: ${props => props.styled.border};
    font-size: ${props => props.styled.font_size};    
`

/*
<input>要素を直に作らないで関数のreturnにする理由は、
・型制約をつけやすいこと

*/


const Input: React.FC<InputProps> = ({
    type = 'text',
    name,
    styled,
    onChange,
    ...props
}) => <InputElement type={type} name={name} styled={styled} onChange={onChange} {...props}/>

export default Input