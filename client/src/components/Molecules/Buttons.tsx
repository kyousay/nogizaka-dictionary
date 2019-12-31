import React from 'react'
import Button, {ElementStyle as ButtonStyle} from '../Atoms/Button/'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

export interface Props {
    buttons: {
        buttonWrapperStyle: WrapperStyle
        buttonStyle: ButtonStyle
        buttonTxt: string
        clickHandler?: React.MouseEventHandler<HTMLButtonElement>
    }[] 
}

const Buttons : React.FC<Props> = props => (
    <React.Fragment>
        {
            props.buttons.map((button,index) => (
                <Wrapper key={index} styled={{...button.buttonWrapperStyle}}>
                    <Button styled={{...button.buttonStyle}} onClick={button.clickHandler}>{button.buttonTxt}</Button>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default Buttons