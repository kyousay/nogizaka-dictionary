import React,{ useState } from 'react'
import styled from 'styled-components'
import { FlexBox, Button } from '../../../style/commonStyle'
import logo from '../../../style/img/logo.jpg'

interface LogoProps {
    styled: {
        width: string
    }
}

const Logo = styled.img<LogoProps>`
    width: ${props => props.styled.width}px;
`

const TextForm = styled.input`
    width: 390px;
    font-size: 1.4rem;
    border-radius: 5px;
    border: none;
    padding: 15px 20px;
    background-color: #FFEEFF;
`

const FlexBoxBorder = styled(FlexBox)`
    border-bottom: 2px solid #F9F9F9;
    height: 100px;
    border: 1px solid #F9F9F9; 
    padding: 0 20px 0 0;
    background-color: #fff;
`

const TopHeader: React.FC = () => {

    const [searchWord , changeSearchWord] = useState('')

    return(
        <FlexBoxBorder styled={{align_items:"center",justify_content:"space-between"}}>
            <Logo src={logo} styled={{width:"300"}}/>
            <FlexBox styled={{align_items:"center",justify_content:"space-between"}}>
                <div>
                    <TextForm type="text" placeholder="名前、フリーワード" value={searchWord} onChange={(e) => changeSearchWord(e.target.value)}/>
                    <Button styled={{width: "150", margin: "0 0 0 12px", padding: "12px 28px", bgColor: "rgb(147, 112, 219)"}}>検索</Button>
                </div>
            </FlexBox>
        </FlexBoxBorder>
    )
}

export default TopHeader