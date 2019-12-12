import styled from 'styled-components'

interface Style {
    font_size: '1.2rem' | '1.4rem' | '1.8rem' 
    font_weight: 'normal' | 'bold'
    text_align: 'left' | 'right' | 'center'
    wrapperWidth: string
    lineWidth: string
}

type ElementStyle = Partial<Style>

interface ParagraghProps {
    styled: ElementStyle
    children: string
}

export const Paragragh = styled.p<ParagraghProps>`
    font-size: ${props => props.styled.font_size};
    font-weight: ${props => props.styled.font_weight};
    text-align: ${props => props.styled.text_align};
`

export const LineParagragh = styled(Paragragh)<ParagraghProps>`
        position: relative;
        overflow: hidden;
        width: ${props => props.styled.wrapperWidth};
        &::before,&::after {
            content: '';
            position: absolute;
            top: 50%;
            translateY: -50%; 
            width: ${props => props.styled.lineWidth};
            border-bottom: 1px solid #ccd0d5;
        }
        &::before {
            right: 63%;
        }
        &::after {
            left: 63%;
        }
    `