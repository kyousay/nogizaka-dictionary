import styled from 'styled-components'

interface Style {
    width: string
    padding: string
    border: string
    font_size: '1.2rem' | '1.4rem' | '1.8rem'
}

type ElementStyle = Partial<Style>

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