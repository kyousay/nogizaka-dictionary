import React from 'react'
import styled from 'styled-components'
import {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'
import InputSections, {Props as InputSectionsProps} from './InputSections'
import Buttons, {Props as ButtonsProps} from '../Molecules/Buttons'
import Wrapper from '../Atoms/Wrapper'

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

interface Props {
    InputSectionsProps: InputSectionsProps
    cardStyle?: WrapperStyle
}

type cardProps = Props & ButtonsProps


const InputCard: React.FC<cardProps> = props => {
    return(
    <ShadowWrapper styled={{...props.cardStyle}}>
        <InputSections {...props.InputSectionsProps} />
        { props.buttons !== undefined ?
            <Buttons buttons={props.buttons} />
                :   null
        }
    </ShadowWrapper>
    )
}

export default InputCard
