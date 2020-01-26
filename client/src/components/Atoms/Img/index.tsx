import styled from 'styled-components'
import {mediaMobile} from '../../../style/commonStyle'

export interface elementStyle {
    width?: string,
    height?: string
}

interface ImgProps{
    styled: elementStyle
}

const Img = styled.img<ImgProps>`
    width: ${props => props.styled.width};
    height: ${props => props.styled.height};
`

export const withSPStyle = (Component : typeof Img, spStyle: {[k: string] : string}) => {
    return styled(Component)`
      ${mediaMobile`
        ${spStyle}
      `};
    `;
};

export default Img