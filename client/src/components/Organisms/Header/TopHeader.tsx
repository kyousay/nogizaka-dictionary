import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchPanel from '../../Molecules/Header/SerchPanel'
import ImgBox from '../../Molecules/Header/ImgBox'
import BalloonCard from '../../Molecules/Header/BalloonCard'
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

const ShadowWrapper = styled(Wrapper)`
    box-shadow: 0px 0px 5px -2px #000000;
`

const section = {
    title: ['ニックネーム', 'ひとこと', '生年月日'],
    text: ['新参者', 'こんにちは', '1992年6月19日'],
    // margin: ['0', '15px 0 0 0', '15px 0 0 0'],
    padding: ['20px', '20px', '20px']
}

const TopHeader: React.FC<StateValue> = (props) => {
    const [searchWord, changeSearchWord] = useState('')
    const [isHover, changeHover] = useState(false)
    const userName = props.nickName? props.nickName : '新参者'

    const changeHoverStateHandler = (prop: boolean) => {
        changeHover(prop)
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
                        <ShadowWrapper styled={{position: 'absolute', right: '10px', bgColor: "#fff", width: '315px', text_align: 'center'}}>
                            <BalloonCard　section={section}></BalloonCard>
                        </ShadowWrapper>
                                : null
                    }
                </ImgBoxWrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default TopHeader