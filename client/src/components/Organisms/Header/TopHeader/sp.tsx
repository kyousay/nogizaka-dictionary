import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchCard from '../../../Molecules/SearchCard'
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
import Heading from '../../../Atoms/Heading'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
`

const CardTitle = styled(Heading)`
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
    bgColor: '#fff',
    width: '100vw',
    z_index: '500',
    padding: '20px',
} as const


const TxtRowSectionStyle = {
    titelStyle: {font_size: '1.4rem', color: '#787878'} as const, 
    titleWrapperStyle: {width: '96px', padding: '5px 0 0 0'},
    contentStyle: {font_size: '1.8rem', word_break: 'break-word'} as const,
    contentWrapperStyle: {width: '130px'},
    wrapperStyle: {margin: '30px auto', width: '250px', padding: '0 10px'} as const,
}

const baseButtonStyle = {
    font_size: '1.4rem',
    color: '#fff',
    width: '100%',
    padding: '20px',
} as const

const buttonStyle = {
    font_size: '1.4rem',
    color: '#fff',
    width: '100%',
    padding: '20px',
    bgColor: '#812990',
} as const

const inputStyle = {
    width: '146px',
    border_radius: '3px',
    border: 'none',
    bgColor: '#EAEAEA',
    padding: '10px 12px',
    font_size: '1.4rem'
} as const

export interface userProfile {
    nickName: string
    message: string
    rank: string
}

type Props = userState & {
    upDate: (props: userProfile) => void
    searchWord: (word: string) => void
    logout: () => void
    search: (url: string) => void
}

const TopSpHeader: React.FC<Props> = props => {
    const [selectValue, setSelectValue] = useState('members')
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

    const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(event.target.value);
        props.search(event.target.value);
        setClick(false)
    }

    const changeInputValueHandler = (state : typeof userState) => {
        changeUserState(state)
    }

    const upDateUserData = (userState : userProfile) => {
        props.upDate(userState)
    }

    const searchActionHandler = () => {
        if(word.length > 0) {
            props.searchWord(word)
        }
        setClick(false)
        changeSearchWord('')
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
                font_size: '1.4rem',
                color: '#787878',
                width: '98px'
            } as const,
            baseWrapperStyle: {
                margin: '20px auto 0',
                width: '250px',
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

    const SearchCardProps = {
        value: word,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeSearchWord(e.target.value),
        clickHandler: searchActionHandler,
        selectsProps: {
            options: [
                {
                    txt: '全メンバー',
                    props: {
                        value: 'members'
                    }
                },
                {
                    txt: '一期生',
                    props: {
                        value: 'segment=1期生'
                    }
                },
                {
                    txt: '二期生',
                    props: {
                        value: 'segment=2期生'
                    }
                },
                {
                    txt: '三期生',
                    props: {
                        value: 'segment=3期生'
                    }
                },
                {
                    txt: '四期生',
                    props: {
                        value: 'segment=4期生'
                    }
                },
                {
                    txt: '卒業生',
                    props: {
                        value: 'segment=卒業生'
                    }
                },
                {
                    txt: '推しメン',
                    props: {
                        value: 'favorite'
                    }
                }
        ],
        wrapperStyle: {
            margin: '20px 0'
        },
        selectStyle: {
            padding: '10px 30px',
            width: '100%',
            font_size: '1.4rem' as '1.4rem',
            color: '#888888',
            appearance: 'none',
            bgColor: '#F9F9F9' as '#F9F9F9'
        },
        selectProps: {
            value: selectValue,
            onChange: selectChangeHandler
        }
    }
    }

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '10px 20px 10px 0'}}>
            <Img src={logo} styled={{width:"55vw"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between', width: '20vw'}}>
                <ImgBoxWrapper styled={{}} onClick={() => {setContentIndex(2);setClick(true);}} >
                    <Img src={icon_search} styled={{width: '6vw'}} />
                </ImgBoxWrapper>
                <ImgBoxWrapper styled={{}} onClick={() => {setContentIndex(1);setClick(true);}}>
                    <Img src={icon_user} styled={{width: '6vw'}} />
                </ImgBoxWrapper>
            </Wrapper>
            {
                isClick?
                <Wrapper styled={{...FieldStyle}}>
                    <Wrapper styled={{position: 'relative', z_index: '550'}}>
                        <CardTitle as="h3" styled={{font_size:'1.8rem', font_weight: 'bold', text_align: 'center'} as const}>{contentIndex === 1 ? `${props.nickName}さん`: '検索条件'}</CardTitle>
                        <Wrapper styled={{position: 'absolute', right: '5px', top: '0', padding:'5px'}} onClick={() => {setClick(false);setClickIndex(1);}}>
                            <Img styled={{width:'20px'}} src={icon_close} />
                        </Wrapper>
                    </Wrapper>
                    {
                        
                            contentIndex === 1 ?
                                clickIndex === 1 ?
                                    <TxtCard {...UserCardProps}/>
                                    :<InputCard {...UserEditCardProps} />
                            : <SearchCard {...SearchCardProps} />
                    }
                </Wrapper>
                    : null
            }
        </Wrapper>
    )
}

export default TopSpHeader