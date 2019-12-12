import styled from 'styled-components'

interface HeadingStyle {
    font_size: '1.2rem' | '1.4rem' | '1.8rem'
    font_weight: 'normal' | 'bold'
    text_align: 'left' | 'right' | 'center'
}

type ElementStyle = Partial<HeadingStyle>

interface HeadingProps {
    styled: ElementStyle
}

const Heading = styled.h1<HeadingProps>`
    font-size: ${props => props.styled.font_size};
    font-weight: ${props => props.styled.font_weight};
    text-align: ${props => props.styled.text_align};
`

export const Heading1 = Heading.withComponent('h1');
export const Heading2 = Heading.withComponent('h2');
export const Heading3 = Heading.withComponent('h3');
export const Heading4 = Heading.withComponent('h4');