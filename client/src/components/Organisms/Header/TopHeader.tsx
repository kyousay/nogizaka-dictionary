import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchPanel from '../../Molecules/SerchPanel'
import UserCard from '../../Molecules/UserCard'
import UserEditCard from '../../Molecules/UserEditCard'
import ImgBox from '../../Molecules/ImgBox'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import logo from '../../../style/img/logo.jpg'
import icon from '../../../style/img/user_icon.png'
import {userState} from '../../../reducers/userReducer'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
    &:hover {
        opacity: 0.7
    }
`

const wrapperStyle = {
    position: 'absolute',
    right: '10px',
    bgColor: '#fff' as '#fff',
    width: '315px',
    padding: '20px'
}

const TxtStyle = {
    titleSize: '1.2rem' as '1.2rem', 
    subSize: '1.4rem' as '1.4rem',
    padding: '20px',
    color: '#787878',
    width: '96px',
}

const buttonStyle = {
    font_size: '1.4rem' as '1.4rem',
    color: '#fff',
    width: '100%',
    padding: '10px',
    margin: '20px',
    bgColor: '#812990' as '#812990',
}

const inputStyle = {
    width: '146px',
    border_radius: '3px',
    border: 'none',
    bgColor: '#EAEAEA' as '#EAEAEA',
    padding: '10px 12px',
    font_size: '1.2rem' as '1.2rem'
}

const TopHeader: React.FC<userState> = props => {
    const [searchWord, changeSearchWord] = useState('')
    const [isHover, changeHover] = useState(false)
    const [isClick, changeClick] = useState(false)
    const [userState, changeUserState] = useState({
        nickName: props.nickName,
        message: props.message,
        rank: props.rank
    })
    console.log(userState)

    const changeClickStateHandler = (state: boolean) => {
        var newState = state ? false : true
        changeClick(newState)
    }
    
    const changeHoverStateHandler = (state: boolean) => {
        changeClick(false)
        changeHover(state)
    }
    const changeInputValueHandler = (state : typeof userState) => {
        changeUserState(state)
    }
    
    const UserCardProps = {
        TxtRowSectionsProps:{
            sections: [{
                title: 'ニックネーム',
                content: userState.nickName
            },{
                title: 'ひとこと',
                content: userState.message,
            },{
                title: '称号',
                content: userState.rank
            }],
            TxtStyle
        },
        wrapperStyle: wrapperStyle,
        button: buttonStyle,
        buttonTxt: 'プロフィール編集',
        clickHandler: () => changeClickStateHandler(isClick)
    }

    const UserEditCardProps = {
        InputSectionsProps : {
            inputs: [
                {
                    value: userState.nickName,
                    title: 'ニックネーム',
                    maxLength: 60 as 60,
                    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...userState,nickName: e.target.value})
                },
                {
                    value: userState.message,
                    title: 'ひとこと',
                    maxLength: 60 as 60,
                    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...userState,message: e.target.value})
                },
                {
                    value: userState.rank,
                    title: '称号',
                    maxLength: 60 as 60,
                    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...userState,rank: e.target.value})
                },
            ],
            InputStyle: inputStyle,
            paragraghStyle: {
                font_size: '1.2rem',
                color: '#787878',
                width: '98px'
            } as const,
            wrapperStyle: {
                padding: '15px',
                display: 'flex',
                align_items: 'center'
            } as const
        },
        wrapperStyle:wrapperStyle,
        button: buttonStyle,
        buttonTxt: '編集確定',
        clickHandler: () => changeClickStateHandler(isClick)
    }

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '0px 20px'}}>
            <Img src={logo} styled={{width:"300px"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between', min_width: '420px'}}>
                <SearchPanel value={searchWord} changeHandler={(e : React.ChangeEvent<HTMLInputElement>) => changeSearchWord(e.target.value)}/>
                <ImgBoxWrapper styled={{margin: '0 0 0 20px', position: 'relative'}} 
                onMouseEnter={() => changeHoverStateHandler(true)}
                onMouseLeave={() => changeHoverStateHandler(false)}>
                    <ImgBox src={icon} width={'50px'} font_size={'1.2rem'} description={props.nickName}/>
                    
                    {
                        isHover ?
                            isClick?

                            <UserEditCard {...UserEditCardProps} />

                            :<UserCard {...UserCardProps}/>
                            
                        : null
                    }
                </ImgBoxWrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default TopHeader