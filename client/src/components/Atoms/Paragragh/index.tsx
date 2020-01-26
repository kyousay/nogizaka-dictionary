import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

interface Style {
    [k: string] : string
}

export type ElementStyle = Partial<Style & Pick<constantStyle, 'font_size' | 'font_weight' | 'text_align' >>

interface ParagraghProps {
    styled: ElementStyle
}

export const Paragragh = styled.p<ParagraghProps>`
    font-size: ${props => props.styled.font_size};
    font-weight: ${props => props.styled.font_weight};
    text-align: ${props => props.styled.text_align};
    padding: ${props => props.styled.padding};
    color: ${props => props.styled.color};
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

export const withSPStyle = (Component : typeof LineParagragh, spStyle: Style) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};