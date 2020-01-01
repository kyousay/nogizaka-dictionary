import React, { HtmlHTMLAttributes, InputHTMLAttributes } from 'react'
import Input, {ElementStyle as InputStyle} from '../Atoms/Input'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'

interface Inputs{
    inputStyle: InputStyle
    inputWrapperStyle: WrapperStyle
    props: React.InputHTMLAttributes<HTMLInputElement>
    // onChangeHandler: (event:React.ChangeEvent<HTMLInputElement>) => void 
}

export interface Props {
    inputs: Partial<Inputs>[]
}

const Inputs: React.FC<Props> = props => (
    <React.Fragment>
        {
            props.inputs.map((input, index) => (
                <Wrapper key={index} styled={{...input.inputWrapperStyle}}>
                    <Input styled={{...input.inputStyle}} {...input.props}/>
                </Wrapper>
            ))
        }
    </React.Fragment>
)

export default Inputs