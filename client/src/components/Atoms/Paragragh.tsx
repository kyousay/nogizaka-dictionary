import React from 'react'
import styled from 'styled-components'

interface ElementStyle {
    [k : string] : string
}

interface ParagraghProps {
    styled: ElementStyle
    children: String
}

const ParagraghElement = styled.p<ParagraghProps>`
    font-size: ${props => props.styled.font_size};
    font-weight: ${props => props.styled.font_weight};
    text-align: ${props => props.styled.text_align};
`

const LineParagraghElement = styled(ParagraghElement)<ParagraghProps>`
        position: relative;
        overflow: hidden;
        width: ${props => props.styled.wrapperWidth};
        &::before,&::after {
            content: '';
            position: absolute;
            top: 50%;
            translateY: -50%; 
            width: ${props => props.styled.lineWidth};
            border-bottom: 1px solid #ccd0d5;
        }
        &::before {
            right: 63%;
        }
        &::after {
            left: 63%;
        }
    `

export const Paragragh : React.FC<ParagraghProps> = ({
    styled,
    children,
}) => <ParagraghElement styled={styled}>{children}</ParagraghElement>

export const LineParagragh : React.FC<ParagraghProps> = ({
    styled,
    children,
}) => <LineParagraghElement styled={styled}>{children}</LineParagraghElement>