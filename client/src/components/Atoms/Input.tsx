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

const InputPresenter: React.FC<InputProps> = ({
    type = 'text',
    name,
    style,
    ...props
}) => {
    return <InputElement type={type} name={name} styled={style} {...props}/>
}

const Input: React.FC<InputProps> = ({
    ...props
}) => <InputPresenter {...props}/>

export default Input