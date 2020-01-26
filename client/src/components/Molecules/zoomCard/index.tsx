import React from 'react'
import styled from 'styled-components'
import Img from '../../Atoms/Img'
import {Paragragh} from '../../Atoms/Paragragh'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'
import TxtRowSections from '../TxtRowSections'
import dummy from '../../../style/img/anonymous.png'
import { Member } from '../../../reducers/membersReducer'
import close from '../../../style/img/close.png'
import Hash from '../Hash'

const zoomFieldStyle = {
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    height: "100%",
    width: "100%",
    z_index: "10",
    bgColor: "rgba(0,0,0,0.7)" as "rgba(0,0,0,0.7)",
}

const contentStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "300px",
    min_height: "576px",
    bgColor: "#fff" as "#fff",
    transform: "translate(-50%,-50%)",
    padding: "20px",
}

const WeakTxt = styled(Txt)`
    display: inline-block;
    margin-left: 12px;
`

const HashWrapper = styled(Wrapper)`
    overflow-Y: scroll;
`

const TxtRowSectionsStyle = {
    titleStyle: {
        color: '#787878', 
        font_size: '1.2rem' as '1.2rem', 
    },
    titleWrapperStyle: {
        width: '108px'
    },
    contentStyle: {
        font_size: '1.4rem' as '1.4rem'
    },
}

interface Props {
    zoomOutHandler : () => void
    iconClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    image?: string
    member: Member
}

const ZoomCard : React.FC<Props> = props => {
    const TxtRowSectionsProps = {
        sections: [
            {
                title: "生年月日",
                content: props.member.dateOfBirth,
                ...TxtRowSectionsStyle,
                wrapperStyle: {border_top: '1px solid #D8D8D8', padding: '12px 0 0 0'}
            },
            {
                title: "血液型",
                content: props.member.blod,
                ...TxtRowSectionsStyle,
                wrapperStyle: {margin: '17px 0 0'}
            },
            {
                title: "身長",
                content: `${props.member.height}cm`,
                ...TxtRowSectionsStyle,
                wrapperStyle: {margin: '17px 0 0'}
            },
        ]
    }
    return (
    <Wrapper styled={{...zoomFieldStyle}} onClick={props.zoomOutHandler}>
        <Wrapper styled={{...contentStyle}}>
            <Wrapper styled={{position: 'absolute', top: '-30px', right: '-50px'}} onClick={props.zoomOutHandler}>
                <Img styled={{width: '100%'}} src={close} />
            </Wrapper>
            {
                props.image?
                    <Wrapper styled={{position: 'absolute', right: '20px', top: '20px'}} onClick={props.iconClickHandler}>
                        <Img styled={{width: '50px', height: '50px'}} src={props.image}/>
                    </Wrapper>
                : 
                    null
            }
            <Img src={props.member.image ? props.member.image : dummy} styled={{width: '100%', height: '300px'}}/>
            <Wrapper styled={{margin: '40px 0 0 0'}}>
                <Paragragh styled={{margin_top: '40px', font_weight: 'bold', font_size: '2.4rem'}}>
                    {props.member.name[0]}
                    <WeakTxt styled={{font_size: '1.2rem', font_weight: 'bold'}}>
                        {props.member.name[1]}
                    </WeakTxt>
                </Paragragh>
            </Wrapper>
            <Wrapper styled={{margin: '17px 0 0 0'}}>
                <TxtRowSections {...TxtRowSectionsProps} />
            </Wrapper>
            <HashWrapper styled={{wrap:"wrap", margin: '15px 0 0 0', max_height: '50px'}}>
                <Hash hash={props.member.hash} segment={props.member.segment}/>
            </HashWrapper>
        </Wrapper>
    </Wrapper>
)}

export default ZoomCard