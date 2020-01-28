import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

interface FormStyle {
    [k : string] : string
}

export type ElementStyle = Partial<FormStyle & Pick<constantStyle, 'display' | 'text_align'>>

interface FormProps {
    styled: ElementStyle
}

const Form = styled.form<FormProps>`
    display: ${props => props.styled.display};
    margin: ${props => props.styled.margin};
    text-align: ${props => props.styled.text_align};
    padding: ${props => props.styled.padding};
`

export const withSPStyle = (Component : typeof Form, spStyle: ElementStyle) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};

export default Form