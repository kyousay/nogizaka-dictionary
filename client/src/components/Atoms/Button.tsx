import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
    [k: string]: any
}

const ButtonElement = styled.button<ButtonProps>`
    font-size: 1.4rem;
    color: #fff;
    border: none;
    border-radius: 3px;
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    background-color: ${props => props.styled.bgColor};
`

const Button : React.FC<ButtonProps> = ({
    children,
    onClick,
    styled,
    ...props
}) => <ButtonElement styled={styled} onClick={onClick} {...props}>{children}</ButtonElement>

export default Button