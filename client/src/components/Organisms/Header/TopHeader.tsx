import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchPanel from '../../Molecules/Header/SerchPanel'
import HoverCard from '../../Molecules/Header/HoverCard'
import ImgBox from '../../Molecules/Header/ImgBox'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import logo from '../../../style/img/logo.jpg'
import icon from '../../../style/img/user_icon.png'
import {StateValue} from '../../../reducers'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
    &:hover {
        opacity: 0.7
    }
`

const TopHeader: React.FC<StateValue> = (props) => {
    const [searchWord, changeSearchWord] = useState('')
    const [isHover, changeHover] = useState(false)
    const [isClick, changeClick] = useState(false)
    const userName = props.nickName? props.nickName : '新参者'

    const changeHoverStateHandler = (boo: boolean) => {
        changeHover(boo)
    }

    const changeClickStateHandler = (boo: boolean) => {
        changeClick(boo)
    }
    
    const HoverCardProps = {
        sections: [{
            title: 'ニックネーム',
            content: userName
        },{
            title: 'ひとこと',
            content: 'こんにちは',
        },{
            title: '称号',
            content: '新参者'
        }],
        TxtRowSectionStyle: {
            titleSize: '1.2rem', 
            subSize: '1.4rem',
            padding: '20px',
            color: '#787878',
            width: '96px'
        } as const,
        wrapperStyle: {
            position: 'absolute',
            right: '10px',
            bgColor: '#fff',
            width: '315px',
            padding: '20px'
        } as const
        // button: {

        // }
    }

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '0px 20px'}}>
            <Img src={logo} styled={{width:"300px"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between', min_width: '420px'}}>
                <SearchPanel value={searchWord} changeHandler={(e : React.ChangeEvent<HTMLInputElement>) => changeSearchWord(e.target.value)}/>
                <ImgBoxWrapper styled={{margin: '0 0 0 20px', position: 'relative'}} 
                onMouseEnter={() => changeHoverStateHandler(true)}
                onMouseLeave={() => changeHoverStateHandler(false)}>
                    <ImgBox src={icon} width={'50px'} font_size={'1.2rem'} description={userName}/>
                    
                    {
                        isHover ?
                            
                                <HoverCard {...HoverCardProps}/>
                                    : null
                    }
                </ImgBoxWrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default TopHeader