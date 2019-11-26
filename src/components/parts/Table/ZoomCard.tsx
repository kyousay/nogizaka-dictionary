import React from 'react'
import styled from 'styled-components'
import dummy from '../../../style/img/anonymous.png'
import { FlexBox } from '../../../style/commonStyle'
import { Member } from '../../../reducers/MembersReducer'
import close from '../../../style/img/close.png'
import Hash from './Hash'

const ZoomBox = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.7);
`

const ZoomClose = styled.div`
    position: absolute;
    top: -50px;
    right: -50px;
    width: 46px;
    height: 46px;
    background: url(${close});
`

const ZoomContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    min-height: 576px;
    background-color: #fff;
    transform: translate(-50%,-50%);
    padding: 20px;
`

const Image = styled.img`
    width: 100%;
    height: 300px;
`

const TextBox = styled.p`
    margin-top: 40px;
    font-weight: bold;
    font-size: 2.4rem;   
`

const WeakText = styled.span`
    display: inline-block;
    font-size: 1.3rem;
    font-weight: bold;
    margin-left: 12px;
`

const Column = styled.div`
    display: flex;
    &:first-of-type {
        padding-top: 12px;
        margin-top: 17px;
        border-top: 1px solid #D8D8D8;
    }
    &:not(:first-of-type) {
        margin-top: 12px;
    }
    `

const ColumnTitle = styled.p`
    width: 108px;
    font-size: 1.2rem;
    color: #767676;
`

const ColumnContent = styled.span`
    font-size: 1.4rem;
`

const HashBox = styled(FlexBox)`
    margin-top: 15px;
    max-height: 50px;
    overflow-Y: scroll
`

type setStateFunc = {
    setZoom : React.Dispatch<React.SetStateAction<boolean>>
}

export type Props = Member & setStateFunc

const ZoomCard : React.FC<Props> = props => {
    return(
        <ZoomBox onClick={() => props.setZoom(false)}>
            <ZoomContent>
                <ZoomClose onClick={() => props.setZoom(false)}></ZoomClose>
                <Image src={props.img ? props.img : dummy} />
                <TextBox>
                    {props.name[0]}
                    <WeakText>
                        {props.name[1]}
                    </WeakText>
                </TextBox>
                <div>
                    <InfoColumn title={"生年月日"} content={props.dateOfBirth}/>
                    <InfoColumn title={"血液型"} content={props.blod}/>
                    <InfoColumn title={"身長"} content={`${props.height}cm`}/>
                </div>
                <HashBox styled={{wrap:"wrap"}}>
                    <Hash {...props}/>
                </HashBox>
            </ZoomContent>
        </ZoomBox>
    )
}

interface SubProps {
    title: string,
    content: string,
}

const InfoColumn : React.FC<SubProps> = props => {
    return(
        <Column>
            <ColumnTitle>{props.title}</ColumnTitle>
            <ColumnContent>{props.content}</ColumnContent>
        </Column>
    )
}

export default ZoomCard