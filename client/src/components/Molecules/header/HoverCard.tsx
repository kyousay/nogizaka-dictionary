import React from 'react'
import styled from 'styled-components'
import {ElementStyle as WrapperStyle} from '../../Atoms/Wrapper'
import {Style as TxtRowSectionStyle} from '../../Molecules/Card/TxtRowSection'
import Button from '../../Atoms/Button/'
import Wrapper from '../../Atoms/Wrapper'
import TxtRowSection from '../Card/TxtRowSection'

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

interface Props {
    sections: {
        title: string
        content: string
    }[]
    TxtRowSectionStyle : TxtRowSectionStyle
    wrapperStyle: WrapperStyle
}



const HoverCard: React.FC<Props> = (props) => (
    <ShadowWrapper styled={{...props.wrapperStyle}}>
        {
            props.sections.map((elem, index) => {
                <TxtRowSection key={index} color={props.TxtRowSectionStyle.color} width={props.TxtRowSectionStyle.width} padding={props.TxtRowSectionStyle.padding} 
                titleSize={props.TxtRowSectionStyle.titleSize} subSize={props.TxtRowSectionStyle.subSize} title={elem.title} content={elem.content} />
            })
        }
        <Button　 styled={{width: '240px', padding: '10px 20px', bgColor: '#812990'}}>プロフィール編集</Button>
    </ShadowWrapper>
)

// const HoverCard = (props) => (
//     <ShadowWrapper styled={{position: 'absolute', right: '10px', bgColor: "#fff", width: '315px', text_align: 'center', padding: '20px'}}>
//         <TxtRowSection  display={'flex'} color={'#787878'} width={'96px'} padding={'20px'} titleSize={'1.2rem'} subSize={'1.4rem'}
//         title={'ニックネーム'} content={'新参者'} />
//         <TxtRowSection display={'flex'} color={'#787878'} width={'96px'} padding={'20px'} titleSize={'1.2rem'} subSize={'1.4rem'} 
//         title={'ひとこと'} content={'こんにちは'} />
//         <TxtRowSection display={'flex'} color={'#787878'} width={'96px'} padding={'20px'} titleSize={'1.2rem'} subSize={'1.4rem'}
//         title={'称号'} content={'新参者'} />
//         <Button styled={{width: '240px', padding: '10px 20px', bgColor: '#812990'}}>プロフィール編集</Button>
//     </ShadowWrapper>
// )

export default HoverCard
