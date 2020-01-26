import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

interface Style {
    [k : string] : string
}

export type ElementStyle = Partial<Style & Pick<constantStyle, 'font_size'>>

interface OptionProps {
    styled: ElementStyle
}

const Option = styled.option<OptionProps>`
    font-size: ${props => props.styled.font_size};   
    width: ${props => props.styled.width};
    padding: ${props => props.styled.padding};
    border: ${props => props.styled.border};
    border-radius: ${props => props.styled.border_radius};
    background-color: ${props => props.styled.bgColor};
`

export const withSPStyle = (Component : typeof Option, spStyle: Style) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};

export default Option