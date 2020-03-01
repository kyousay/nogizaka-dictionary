import React from 'react'
import styled from 'styled-components'
import Img from '../../atoms/Img'
import {Paragragh} from '../../atoms/Paragragh'
import Wrapper from '../../atoms/Wrapper'
import Txt from '../../atoms/Txt'
import TxtRowSections from '../TxtRowSections'
import dummy from '../../../style/img/anonymous.png'
import { Member } from '../../../reducers/membersReducer'
import close from '../../../style/img/close.png'
import Hash from '../Hash'

const contentStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    bgColor: "#fff" as "#fff",
    padding: "20px",
    z_index: '15'
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
    <>
        <Wrapper styled={{...contentStyle}}>
            <Wrapper styled={{position: 'absolute', top: '20px', right: '20px'}} onClick={props.zoomOutHandler}>
                <Img styled={{width: '50px'}} src={close} />
            </Wrapper>
            <Img src={props.member.image ? props.member.image : dummy} styled={{width: '100%'}}/>
            <Wrapper styled={{margin: '40px 0 0 0', position: 'relative'}}>
                <Paragragh styled={{margin_top: '40px', font_weight: 'bold', font_size: '2.4rem'}}>
                    {props.member.name[0]}
                    <WeakTxt styled={{font_size: '1.2rem', font_weight: 'bold'}}>
                        {props.member.name[1]}
                    </WeakTxt>
                </Paragragh>
                {
                    props.image?
                        <Wrapper styled={{position: 'absolute', right: '0', top: '-20px'}} onClick={props.iconClickHandler}>
                            <Img styled={{width: '40x', height: '40px'}} src={props.image}/>
                        </Wrapper>
                    : 
                        null
                }
            </Wrapper>
            <Wrapper styled={{margin: '17px 0 0 0'}}>
                <TxtRowSections {...TxtRowSectionsProps} />
            </Wrapper>
            <HashWrapper styled={{wrap:"wrap", margin: '15px 0 0 0', max_height: '50px'}}>
                <Hash hash={props.member.hash} segment={props.member.segment}/>
            </HashWrapper>
        </Wrapper>
    </>
)}

export default ZoomCard