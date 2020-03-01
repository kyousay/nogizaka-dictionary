import React from 'react'
import styled from 'styled-components'
import * as utilStyle from '../../../util/styles'

export type StyleProps = {
    [k : string] : string
}

type ButtonProps = {
    styled: StyleProps
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = styled.button<ButtonProps>`
  font-size: ${props => props.styled.font_size || utilStyle.font_size.normal};
  text_align: ${props => props.styled.text_align};
  font-weight: bold;
  color: ${props => props.styled.color || utilStyle.color.white};
  border: ${props => props.styled.border || 'none'};
  border-radius: 3px;
  width: ${props => props.styled.width};
  padding: ${props => props.styled.padding};
  background-color: ${props => props.styled.bgColor};
`

export type ButtonCustomProps = {
  style?: StyleProps
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  txt: string
  clickHandler?: () => void
}

const initialStyle = {
    width: '280px',
    padding: '10px 0',
}

export const ButtonFactory  = (constantStyle : StyleProps) => (
        ({
            style = initialStyle,
            props,
            txt,
            clickHandler,
        } : ButtonCustomProps) => (
                <Button styled={{...style, ...constantStyle}} 
                onClick={clickHandler} {...props}>{txt}</Button>
        )
)

export default Button