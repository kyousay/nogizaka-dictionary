import React, { ReactEventHandler } from 'react'
import Input, {ElementStyle as InputStyle} from '../Atoms/Input'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

export interface Props {
    inputs: {
        value?: string | undefined
        type?: 'text' | 'email' | 'password'
        onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>
    }[]
    InputStyle?: InputStyle
    wrapperStyle?: WrapperStyle
}


const InputSections : React.FC<Props> = (props) => (
    <React.Fragment>
        {
            props.inputs.map((input, index) => (
                <Wrapper styled={{...props.wrapperStyle}}>
                    <Input type={input.type ? input.type : 'text'} key={index} styled={{...props.InputStyle}} value={input.value} onChange={input.onChangeHandler}/>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default InputSections