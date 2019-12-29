import React from 'react'
import styled from 'styled-components'
import Wrapper, {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'
import TxtRowSections, {Props as TxtRowSectionProps} from './TxtRowSections'
import Button, {ElementStyle as ButtonStyle} from '../Atoms/Button'

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

interface Props {
    TxtRowSectionsProps : TxtRowSectionProps
    cardStyle?: WrapperStyle
    button?: ButtonStyle
    buttonTxt?: string
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>
}



const TxtCard: React.FC<Props> = props => (
    <ShadowWrapper styled={{...props.cardStyle}}>
        <TxtRowSections {...props.TxtRowSectionsProps} />
        {   
            props.button !== undefined ?
                <Wrapper styled={{margin: props.button.margin}}>
                    <Button styled={{width: props.button.width, padding: props.button.padding, bgColor: props.button.bgColor}} onClick={props.clickHandler}>{props.buttonTxt}</Button>
                </Wrapper>
                    :   null
        }
    </ShadowWrapper>
)

export default TxtCard
