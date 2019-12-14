import styled from 'styled-components'
import mediaQuery from 'styled-media-query'

export const mediaMobile = mediaQuery.lessThan("medium")

interface FlexBoxProps {
    styled: {
        [k : string] : string
    }
}

export const FlexBox = styled.div<FlexBoxProps>`
    display: flex;
    justify-content: ${(props) => props.styled.justify_content};
    align-items: ${(props) => props.styled.align_items};
`

interface buttonProps {
    styled: {
        [k : string] : string
    }
}

export const Button = styled.button<buttonProps>`
    font-size: 1.4rem;
    width: ${props => props.styled.width}px;
    margin: 5px 0px;
    padding: 10px 0px;
    border: none;
    border-radius: 3px;
    color: #fff;
    background-color: ${props => props.styled.bgColor};
    margin: ${props => props.styled.margin};
    padding: ${props => props.styled.padding};
`