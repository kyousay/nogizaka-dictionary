import React from 'react'
import styled from 'styled-components'

interface ParagraghProps {
    [k : string] : any
}

const ParagraghElement = styled.p<ParagraghProps>`
    font-size: ${props => props.styled.font_size};
    font-weight: ${props => props.styled.font_weight};
    text-align: ${props => props.styled.text_align};
`

const AttachLineWrapper = styled.div<ParagraghProps>`
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

const Paragragh : React.FC<ParagraghProps> = ({
    styled,
    children,
    ...props
}) => <ParagraghElement styled={styled} {...props}>{children}</ParagraghElement>

const ParagraghWidthLineFactory : React.FC<ParagraghProps> = props =>  <AttachLineWrapper {...props}>{props.presenter({...props})}</AttachLineWrapper>

export const Line : React.FC<ParagraghProps> = props => ParagraghWidthLineFactory({presenter: Paragragh, ...props});

export default Paragragh