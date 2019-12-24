import React from 'react'
import styled from 'styled-components'
import {ElementStyle as WrapperStyle} from '../Atoms/Wrapper'
import InputSections, {Props as InputSectionsProps} from '../Molecules/InputSections'
import Button, {ElementStyle as ButtonStyle} from '../Atoms/Button'
import Wrapper from '../Atoms/Wrapper'

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

interface Props {
    InputSectionsProps: InputSectionsProps
    wrapperStyle?: WrapperStyle
    button?: ButtonStyle
    buttonTxt?: string
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>
}


const UserEditCard: React.FC<Props> = props => (
    <ShadowWrapper styled={{...props.wrapperStyle}}>
        <InputSections {...props.InputSectionsProps} />
        { props.button !== undefined ?
            <Wrapper styled={{margin: props.button.margin}}>
                <Button styled={{width: props.button.width, padding: props.button.padding, bgColor: props.button.bgColor}} onClick={props.clickHandler}>{props.buttonTxt}</Button>
            </Wrapper>
                :   null
        }
    </ShadowWrapper>
)

export default UserEditCard
