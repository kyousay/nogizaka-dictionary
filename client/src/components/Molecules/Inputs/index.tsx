import React from 'react'
import Input, {ElementStyle as InputStyle} from '../../Atoms/Input'
import Wrapper, {ElementStyle as WrapperStyle} from '../../Atoms/Wrapper'

interface Inputs{
    inputStyle: InputStyle
    props: React.InputHTMLAttributes<HTMLInputElement>
    inputWrapperStyle: WrapperStyle
}

interface BaseStyle {
    inputWrapperStyle: WrapperStyle
    inputStyle: InputStyle
}

export interface Props {
    inputs: Partial<Inputs>[]
    baseStyle: Partial<BaseStyle>
}

const Inputs: React.FC<Props> = props => (
        <React.Fragment>
            {
                props.inputs.map((input, index) => (
                    <Wrapper key={index} styled={{...props.baseStyle.inputWrapperStyle, ...input.inputWrapperStyle}}>
                        <Input styled={{...props.baseStyle.inputStyle, ...input.inputStyle}} {...input.props}/>
                    </Wrapper>
                ))
            }
        </React.Fragment>
)

export default Inputs