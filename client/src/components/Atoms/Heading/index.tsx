import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

export type ElementStyle = Partial<Pick<constantStyle, 'font_size' |'font_weight' | 'text_align'>>

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

export const withSPStyle = (Component : typeof Heading, spStyle: {[k : string] : string}) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};