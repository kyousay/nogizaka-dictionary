import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

interface Style {
    [k : string] : string
}

export type ElementStyle = Partial<Style & Pick<constantStyle, 'font_size' | 'display'>>

interface SelectProps {
    styled: ElementStyle
}

const Select = styled.select<SelectProps>`
    font-size: ${props => props.styled.font_size};   
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    border: ${props => props.styled.border};
    color: ${props => props.styled.color};
    border-radius: ${props => props.styled.border_radius};
    background-color: ${props => props.styled.bgColor};
    appearance: ${props => props.styled.appearance};
`

export const withSPStyle = (Component : typeof Select, spStyle: Style) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};

export default Select