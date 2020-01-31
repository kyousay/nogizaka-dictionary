import styled from 'styled-components'
import * as utilStyle from '../../../util/styles'

type StyleProps = {
  [k : string] : string
}

type HeadingProps = {
  styled: StyleProps
}

const Heading = styled.h1<HeadingProps>`
    font-size: ${props => props.styled.font_size || utilStyle.font_size.normal};
    font-weight: ${props => props.styled.font_weight || 'bold'};
    text-align: ${props => props.styled.text_align || 'left'};
`

export default Heading