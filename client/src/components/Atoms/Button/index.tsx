import React from 'react'
import styled from 'styled-components'
import constantStyle from '../../../style/styleModel'
import {mediaMobile} from '../../../style/commonStyle'

interface ButtonStyle {
    [k : string] : string
}

export type ElementStyle = Partial<ButtonStyle & Pick<constantStyle, 'font_size' | 'bgColor' | 'text_align'>>

interface ButtonProps {
    styled: ElementStyle
}

const Button = styled.button<ButtonProps>`
  font-size: ${props => props.styled.font_size? props.styled.font_size : '1.4rem'};
  text_align: ${props => props.styled.text_align};
  font-weight: bold;
  color: ${props => props.styled.color? props.styled.color : '#fff'};
  border: ${props => props.styled.border? props.styled.border: 'none'};
  border-radius: 3px;
  width: ${props => props.styled.width};
  padding: ${props => props.styled.padding};
  background-color: ${props => props.styled.bgColor};
`

export const ActionButton = (children : string) => (
  <Button styled={{
    font_size: '1.4rem'
  }}>{children}</Button>
)

export const withSPStyle = (Component : typeof Button, spStyle: ElementStyle) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};

export default Button