import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchPanel from '../../../Molecules/SearchPanel'
import TxtCard from '../../../Molecules/TxtCard'
import InputCard from '../../../Molecules/InputCard'
import ImgBox from '../../../Molecules/ImgBox'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import { persistor } from '../../../../store'
import logo from '../../../../style/img/logo.jpg'
import icon from '../../../../style/img/user_icon.svg'
import {userState} from '../../../../reducers/userReducer'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
`

const cardStyle = {
    position: 'absolute',
    right: '10px',
    bgColor: '#fff' as '#fff',
    width: '315px',
    padding: '20px',
}

const TxtRowSectionStyle = {
    titelStyle: {font_size: '1.2rem' as '1.2rem', color: '#787878'}, 
    titleWrapperStyle: {width: '96px'},
    contentStyle: {font_size: '1.4rem' as '1.4rem', word_break: 'break-word'},
    contentWrapperStyle: {width: '130px'},
    wrapperStyle: {padding: '20px'},
}

const baseButtonStyle = {
    font_size: '1.4rem' as '1.4rem',
    color: '#fff',
    width: '100%',
    padding: '10px',
}

const buttonStyle = {
    font_size: '1.4rem' as '1.4rem',
    color: '#fff',
    width: '100%',
    padding: '10px',
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

export interface userProfile {
    nickName: string
    message: string
    rank: string
}

type Props = userState & {
    upDate: (props: userProfile) => void
    searchWord: (word: string) => void
    logout: () => void
}

const TopHeader: React.FC<Props> = props => {
    const [word, changeSearchWord] = useState('')
    const [isHover, changeHover] = useState(false)
    const [isClick, changeClick] = useState(false)
    let initialUserState = {
        nickName: props.nickName,
        message: props.message,
        rank: props.rank
    }
    const [userState, changeUserState] = useState<userProfile>(initialUserState)

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

    const upDateUserData = (userState : userProfile) => {
        props.upDate(userState)
    }

    const searchActionHandler = () => {
        props.searchWord(word)
    }

    const logoutHandler = () => {
        props.logout()
        localStorage.removeItem('ticket')
        persistor.purge()
    }

    const emptyCheck = (checkObj: userProfile) => {
        let isEmpty = true;
        Object.entries(checkObj).forEach(([ _ , value ]) => {
            if(isEmpty) {
                isEmpty = value.length > 1
            }
        })
        return isEmpty
    }
    
    const UserCardProps = {
        TxtRowSectionsProps:{
            sections: [{
                title: 'ニックネーム',
                content: userState.nickName,
                ...TxtRowSectionStyle,
            },{
                title: 'ひとこと',
                content: userState.message,
                ...TxtRowSectionStyle,
            },{
                title: '称号',
                content: userState.rank,
                ...TxtRowSectionStyle,
            }],
        },
        cardStyle: cardStyle,
        ButtonsProps:　{
            buttons:[
                {
                    buttonTxt: 'プロフィールを編集する',
                    buttonStyle,
                    clickHandler: () => changeClickStateHandler(isClick),
                },
                {
                    buttonTxt: 'ログアウト',
                    buttonStyle: {...buttonStyle, bgColor: '#42b72a' as '#42b72a'},
                    clickHandler: () => {
                        if(window.confirm("ログアウトしてよろしいですか？")){
                            logoutHandler()
                        }
                    },
                },
            ],
            baseButtonWrapperStyle: {margin: '20px'},
            baseButtonStyle
        }
    }

    const UserEditCardProps = {
        InputSectionsProps : {
            inputs: [
                {
                    title: 'ニックネーム',
                    props: {
                        maxLength: 10,
                        value: userState.nickName,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...userState,nickName: e.target.value})
                    }
                    
                },
                {
                    title: 'ひとこと',
                    props: {
                        value: userState.message,
                        maxLength: 60,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...userState,message: e.target.value})
                    }
                },
                {
                    title: '称号',
                    props: {
                        value: userState.rank,
                        maxLength: 10,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...userState,rank: e.target.value})
                    }
                },
            ],
            baseInputStyle: inputStyle,
            baseInputTitleStyle: {
                font_size: '1.2rem',
                color: '#787878',
                width: '98px'
            } as const,
            baseWrapperStyle: {
                padding: '15px',
                display: 'flex',
                align_items: 'center'
            } as const
        },
        cardStyle:cardStyle,
        ButtonsProps : {
            buttons: [
                {
                    buttonStyle: {...buttonStyle, margin:'0'},
                    buttonTxt: '変更を保存する',
                    clickHandler: () => {
                        if(emptyCheck(userState)) {
                            upDateUserData(userState);
                            initialUserState = userState;
                            changeClickStateHandler(isClick);
                        }else {
                            alert("必要な項目が入力されていません")
                        }
                    }
                },
                {
                    buttonStyle: {...buttonStyle,bgColor: '#FFFFFF' as '#FFFFFF', margin: '0', color: '#0000000', border: '1px solid #000000'},
                    buttonTxt: 'キャンセル',
                    clickHandler: () => {
                        changeClickStateHandler(isClick);
                        changeUserState(initialUserState);
                    }
                }
            ],
            baseButtonWrapperStyle: {margin: '20px'},
        }
    }

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '0px 20px'}}>
            <Img src={logo} styled={{width:"300px"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between', min_width: '420px'}}>
                <SearchPanel value={word} changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => changeSearchWord(e.target.value)} clickHandler={searchActionHandler}/>
                <ImgBoxWrapper styled={{margin: '0 0 0 20px', position: 'relative', z_index: '50'}} 
                onMouseEnter={() => changeHoverStateHandler(true)}
                onMouseLeave={() => {
                    changeHoverStateHandler(false);
                    changeUserState(initialUserState);
                }}>
                    <ImgBox src={icon} width={'20px'} font_size={'1.2rem'} margin={'10px 0 0 0'}description={props.nickName}/>
                    
                    {
                        isHover ?
                            isClick?

                            <InputCard {...UserEditCardProps} />

                            :<TxtCard {...UserCardProps}/>
                            
                        : null
                    }
                </ImgBoxWrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default TopHeader