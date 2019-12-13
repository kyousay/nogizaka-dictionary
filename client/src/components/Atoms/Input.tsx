import styled from 'styled-components'
import constantStyle from '../../style/styleModel'

interface Style {
    width: string
    padding: string
    border: string
}

type ElementStyle = Partial<Style & Pick<constantStyle, 'font_size'>>

interface InputProps {
    styled: ElementStyle
}

const Input = styled.input<InputProps>`
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    border: ${props => props.styled.border};
    font-size: ${props => props.styled.font_size};    
`

export default Input