import React from 'react'
import styled from 'styled-components'

interface Style {
    display: 'flex' | 'block'
    align_items: 'center' | 'left' | 'right'
    justify_content: 'center' | 'space-between' | 'space-around'
    padding: string
    margin: string
}

type ElementStyle = Partial<Style>

interface WrapperProps {
    styled: ElementStyle
    children: React.ReactNode | string
}

const WrapperElement = styled.div<WrapperProps>`
    display:${props => props.styled.display};
    align-items: ${props => props.styled.align_items};
    justify-content: ${props => props.styled.justify_content};
    padding: ${props => props.styled.padding};
    margin: ${props => props.styled.margin};
`

const Wrapper: React.FC<WrapperProps> = ({
    children,
    styled,
}) => <WrapperElement styled={styled}>{children}</WrapperElement>


export default Wrapper