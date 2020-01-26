import React from 'react'
import styled from 'styled-components'
import Wrapper, {ElementStyle as WrapperStyle} from '../../Atoms/Wrapper'
import TxtRowSections, {Props as TxtRowSectionProps} from '../TxtRowSections'
import Buttons, {Props as ButtonsProps} from '../Buttons'

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

interface Props {
    TxtRowSectionsProps : TxtRowSectionProps
    cardStyle?: WrapperStyle
    ButtonsProps?: ButtonsProps
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>
}



const TxtCard: React.FC<Props> = props => (
    <ShadowWrapper styled={{...props.cardStyle}}>
        <TxtRowSections {...props.TxtRowSectionsProps} />
        {   
            props.ButtonsProps !== undefined ?
                <Buttons {...props.ButtonsProps} />
                    :   null
        }
    </ShadowWrapper>
)

export default TxtCard
