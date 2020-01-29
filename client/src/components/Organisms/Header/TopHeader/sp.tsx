import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchPanel from '../../../Molecules/SearchPanel'
import TxtCard from '../../../Molecules/TxtCard'
import InputCard from '../../../Molecules/InputCard'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import { persistor } from '../../../../store'
import logo from '../../../../style/img/logo.jpg'
import icon_close from '../../../../style/img/close_icon_black.svg'
import icon_user from '../../../../style/img/user_icon.svg'
import icon_search from '../../../../style/img/search_icon.svg'
import {userState} from '../../../../reducers/userReducer'
import { Heading3 } from '../../../Atoms/Heading'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
`

const CardTitle = styled(Heading3)`
    border-bottom: 1px solid #E3E1E1;
    padding: 10px
`
const cardStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left:'0',
    width: '100vw',
    padding: '100px 0 0 0'
}

const FieldStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left:'0',
    bgColor: '#fff' as '#fff',
    width: '100vw',
    z_index: '500',
    padding: '20px',
}


const TxtRowSectionStyle = {
    titelStyle: {font_size: '1.2rem' as '1.2rem', color: '#787878'}, 
    titleWrapperStyle: {width: '96px'},
    contentStyle: {font_size: '1.4rem' as '1.4rem'},
    wrapperStyle: {padding: '20px 40px'},
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

const TopSpHeader: React.FC<Props> = props => {
    const [word, changeSearchWord] = useState('')
    const [clickIndex, setClickIndex] = useState(1)
    const [contentIndex, setContentIndex] = useState(1)
    const [isClick, setClick] = useState(false)
    let initialUserState = {
        nickName: props.nickName,
        message: props.message,
        rank: props.rank
    }
    const [userState, changeUserState] = useState<userProfile>(initialUserState)

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
                    clickHandler: () => setClickIndex(2),
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
                            setClickIndex(1)
                        }else {
                            alert("必要な項目が入力されていません")
                        }
                    }
                },
                {
                    buttonStyle: {...buttonStyle,bgColor: '#FFFFFF' as '#FFFFFF', margin: '0', color: '#0000000', border: '1px solid #000000'},
                    buttonTxt: 'キャンセル',
                    clickHandler: () => {
                        setClickIndex(1);
                        changeUserState(initialUserState);
                    }
                }
            ],
            baseButtonWrapperStyle: {margin: '20px'},
        }
    }

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '0 20px 0 0'}}>
            <Img src={logo} styled={{width:"45vw"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between', width: '20vw'}}>
                <ImgBoxWrapper styled={{}} onClick={() => {setContentIndex(2);setClick(true);}} >
                    <Img src={icon_search} styled={{width: '5vw'}} />
                </ImgBoxWrapper>
                <ImgBoxWrapper styled={{}} onClick={() => {setContentIndex(1);setClick(true);}}>
                    <Img src={icon_user} styled={{width: '5vw'}} />
                </ImgBoxWrapper>
            </Wrapper>
            {
                isClick?
                <Wrapper styled={{...FieldStyle}}>
                    <Wrapper styled={{position: 'relative', z_index: '550'}}>
                        <CardTitle styled={{font_size:'1.8rem', font_weight: 'bold', text_align: 'center'} as const}>{contentIndex === 1 ? `${props.nickName}さん`: '検索条件'}</CardTitle>
                        <Wrapper styled={{position: 'absolute', right: '5px', top: '5px', padding:'5px'}} onClick={() => {setClick(false);}}>
                            <Img styled={{width:'5vw'}} src={icon_close} />
                        </Wrapper>
                    </Wrapper>
                    {
                        
                            contentIndex === 1 ?
                                clickIndex === 1 ?
                                    <TxtCard {...UserCardProps}/>
                                    :<InputCard {...UserEditCardProps} />
                            : null
                    }
                </Wrapper>
                    : null
            }
        </Wrapper>
    )
}

export default TopSpHeader