import React from 'react'
import styled from 'styled-components'
import {ElementStyle as WrapperStyle} from '../../Atoms/Wrapper'
import InputSections, {Props as InputSectionsProps} from '../InputSectoins'
import Buttons, {Props as ButtonsProps} from '../Buttons'
import Wrapper from '../../Atoms/Wrapper'

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

interface Props {
    InputSectionsProps: InputSectionsProps
    ButtonsProps?: ButtonsProps
    cardStyle?: WrapperStyle
}

const InputCard: React.FC<Props> = props => {
    return(
    <ShadowWrapper styled={{...props.cardStyle}}>
        <InputSections {...props.InputSectionsProps} />
        { props.ButtonsProps !== undefined ?
            <Buttons {...props.ButtonsProps} />
                :   null
        }
    </ShadowWrapper>
    )
}

export default InputCard

