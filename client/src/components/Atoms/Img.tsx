import styled from 'styled-components'

export interface elementStyle {
    width: string,
    height: string
}

interface ImgProps{
    styled: elementStyle
}

export const Img = styled.img<ImgProps>`
    width: ${props => props.styled.width};
    height: ${props => props.styled.height};
`