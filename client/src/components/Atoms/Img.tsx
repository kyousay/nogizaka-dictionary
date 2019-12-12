import styled from 'styled-components'

interface elementStyle {
    width: string,
    height: string
}

interface Props{
    styled: elementStyle
}

export const Img = styled.img<Props>`
    width: ${props => props.styled.width};
    height: ${props => props.styled.height};
`