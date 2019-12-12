import styled from 'styled-components'

interface ButtonStyle {
    width: string
    padding: string
    bgColor: string
}

type ElementStyle = Partial<ButtonStyle>

interface ButtonProps {
    styled: ElementStyle
}

const Button = styled.button<ButtonProps>`
    font-size: 1.4rem;
    color: #fff;
    border: none;
    border-radius: 3px;
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    background-color: ${props => props.styled.bgColor};
`

export default Button