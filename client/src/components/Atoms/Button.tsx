import styled from 'styled-components'
import constantStyle from '../../style/styleModel'

interface ButtonStyle {
    width: string
    padding: string
    bgColor: string
}

export type ElementStyle = Partial<ButtonStyle & Pick<constantStyle, 'font_size'>>

interface ButtonProps {
    styled: ElementStyle
}

const Button = styled.button<ButtonProps>`
    font-size: ${props => props.styled.font_size? props.styled.font_size : '1.4rem'};
    color: #fff;
    border: none;
    border-radius: 3px;
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    background-color: ${props => props.styled.bgColor};
`

export default Button