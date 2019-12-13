import styled from 'styled-components'
import constantStyle from '../../style/styleModel'

interface Style {
    padding: string
    margin: string
}

export type ElementStyle = Partial<Style & Pick<constantStyle, 'display' | 'align_items' | 'justify_content'>>

interface WrapperProps {
    styled: ElementStyle
}

const Wrapper = styled.div<WrapperProps>`
    display:${props => props.styled.display};
    align-items: ${props => props.styled.align_items};
    justify-content: ${props => props.styled.justify_content};
    padding: ${props => props.styled.padding};
    margin: ${props => props.styled.margin};
`

export default Wrapper