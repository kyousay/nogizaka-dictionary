import React from 'react'
import Button, {ElementStyle as ButtonStyle} from '../Atoms/Button/'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

export interface Props {
    buttons: {
        buttonWrapperStyle?: WrapperStyle
        buttonStyle?: ButtonStyle
        buttonTxt: string
        clickHandler?: React.MouseEventHandler<HTMLButtonElement>
        props?: React.ButtonHTMLAttributes<HTMLButtonElement>
    }[] 
    baseButtonWrapperStyle?: WrapperStyle
    baseButtonStyle?: ButtonStyle
}

const Buttons : React.FC<Props> = props => (
    <React.Fragment>
        {
            props.buttons.map((button,index) => (
                <Wrapper key={index} styled={{...props.baseButtonWrapperStyle, ...button.buttonWrapperStyle}}>
                    <Button styled={{...props.baseButtonStyle, ...button.buttonStyle}} onClick={button.clickHandler} {...button.props}>{button.buttonTxt}</Button>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default Buttons