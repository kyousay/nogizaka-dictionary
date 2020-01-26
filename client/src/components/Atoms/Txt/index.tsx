import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

interface Style {
    [k: string] : string
}

export type ElementStyle = Partial<Style & Pick<constantStyle, 'font_size' | 'font_weight' | 'text_align'>>

interface SpanProps {
    styled: ElementStyle
}

export const Txt = styled.span<SpanProps>`
    font-size: ${props => props.styled.font_size};
    font-weight: ${props => props.styled.font_weight};
    text-align: ${props => props.styled.text_align};
    color: ${props => props.styled.color};
`

export const withSPStyle = (Component : typeof Txt, spStyle: Style) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};

export default Txt