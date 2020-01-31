import React from 'react'
import styled from 'styled-components'
import * as utilStyle from '../../../util/styles'
import ActionButton from './ActionButton'
import TransitionButton from './TransitionButton'

export interface StyleProps {
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

type ButtonFactoryProps = {
  style?: StyleProps
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  children: React.ReactNode | string
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
            children,
            clickHandler,
        } : ButtonFactoryProps) => (
                <Button styled={{...style, ...constantStyle}} 
                onClick={clickHandler} {...props}>{children}</Button>
        )
)

export default Button