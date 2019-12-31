import React from 'react'
import Input, {ElementStyle as InputStyle} from '../Atoms/Input'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

interface Inputs{
    type: 'text' | 'email' | 'textarea' | 'password'
    inputStyle: InputStyle
    inputWrapperStyle: WrapperStyle
    value: string | number 
    maxLength: number
    placeholder: string
    onChangeHandler: (event:React.ChangeEvent<HTMLInputElement>) => void
}

export interface Props {
    inputs: Partial<Inputs>[]
}

const Inputs: React.FC<Props> = props => (
    <React.Fragment>
        {
            props.inputs.map((input, index) => (
                <Wrapper key={index} styled={{...input.inputWrapperStyle}}>
                    <Input type={input.type? input.type : 'text'} 
                    styled={{...input.inputStyle}} value={input.value} onChange={input.onChangeHandler}
                    maxLength={input.maxLength} placeholder={input.placeholder}/>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default Inputs