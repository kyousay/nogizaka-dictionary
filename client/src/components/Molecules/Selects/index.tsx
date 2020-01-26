import React from 'react'
import Wrapper, {ElementStyle as WrapperStyle} from '../../Atoms/Wrapper'
import Select, {ElementStyle as SelectStyle} from '../../Atoms/Select'
import Option, {ElementStyle as OptionStyle} from '../../Atoms/Option'

export interface Props {
    options: {
        optionStyle?: OptionStyle
        txt: string
        props?: React.OptionHTMLAttributes<HTMLOptionElement>
    }[]
    baseOptionStyle?: OptionStyle
    wrapperStyle?: WrapperStyle
    selectStyle?: SelectStyle
    selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>
}

const Selects: React.FC<Props> = (props) => (
    <Wrapper styled={{...props.wrapperStyle}}>
        <Select styled={{...props.selectStyle}} {...props.selectProps}>
            {
                props.options.map((option, index) => (
                    <Option key={index} styled={{...props.baseOptionStyle, ...option.optionStyle}} {...option.props}>{option.txt}</Option>
                ))
            }
        </Select>
    </Wrapper>
)

export default Selects