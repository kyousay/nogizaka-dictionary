import React,{ useState } from 'react'
import styled from 'styled-components'
import InputCard from '../../../Molecules/InputCard'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import logo from '../../../../style/img/logo.jpg'
import icon_close from '../../../../style/img/close_icon_black.svg'
import icon_chat from '../../../../style/img/chat_icon.svg'
import {persistor} from '../../../../store/index'
import { userState } from '../../../../reducers/userReducer'
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
    bgColor: '#fff' as '#fff',
    width: '100vw',
    z_index: '500',
    padding: '20px',
}

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
    font_size: '1.2rem'
} as const

const initialState = {
    roomName: '',
    description: '',
    password: ''
}

export type InitialState = typeof initialState

export interface RoomState {
    image?: string
    roomName: string
    description: string
    password: string
    isRock: boolean
}

export interface Props {
    user: userState
    createRoom: (date: RoomState) => void
    logout: () => void
}

const TalkSpHeader : React.FC<Props> = (props) => {
    const [contentIndex, setContentIndex] = useState(1)
    const [isClick, setClick] = useState(false)
    const [roomState, setTalkRoomState] = useState<InitialState>(initialState)
    
    const changeInputValueHandler = (state : InitialState) => {
        setTalkRoomState(state)
    }

    const emptyCheck = (checkObj: InitialState) => {
        let isEmpty = false;
        Object.entries(checkObj).forEach(([key,value]) => {
            if(key !== 'key' && !isEmpty) {
                isEmpty = value.length > 0
            }
        })
        return isEmpty
    }

    const createRoomHandler = () => {
        if(emptyCheck(roomState)) {
            const isRock = roomState.password.length > 0
            const randomImage = Math.floor(Math.random() * props.user.favoriteMembers.length);
            const roomParams = props.user.favoriteMembers.length === 0 ? {isRock} : {isRock, image: props.user.favoriteMembers[randomImage]}
            const roomPostValue : RoomState = Object.assign(roomState, roomParams);
            props.createRoom(roomPostValue)
        } else {
            alert("必要な項目が入力されていません")
        }
    }

    const logoutHandler = () => {
        props.logout()
        localStorage.removeItem('ticket')
        persistor.purge()
    }

    const talkCardProps = {
        InputSectionsProps : {
            inputs: [
                {
                    title: 'ルーム名',
                    props: {
                        maxLength: 10,
                        required: true,
                        value: roomState.roomName,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...roomState, roomName: e.target.value})
                    }
                    
                },
                {
                    title: '説明',
                    props: {
                        value: roomState.description,
                        required: true,
                        maxLength: 60,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...roomState, description: e.target.value})
                    }
                },
                {
                    title: '鍵かけ(*任意)',
                    props: {
                        value: roomState.password,
                        maxLength: 10,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            changeInputValueHandler({...roomState, password: e.target.value})
                        }
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
                width: '300px',
                margin: '10px auto',
                align_items: 'center'
            } as const
        },
        cardStyle:cardStyle,
        ButtonsProps : {
            buttons: [
                {
                    buttonStyle: {...buttonStyle, margin:'0'},
                    buttonTxt: 'トークルーム作成',
                    clickHandler: () => {
                        createRoomHandler()
                        setTalkRoomState(initialState)
                        setClick(false)
                    }
                },
                {
                    buttonStyle: {...buttonStyle,bgColor: '#42b72a' as const, margin: '0'},
                    buttonTxt: 'ログアウト',
                    clickHandler: () => {
                        if(window.confirm("ログアウトしてよろしいですか？")) {
                            logoutHandler();
                            setTalkRoomState(initialState);
                        }
                    }
                }
            ],
            baseButtonWrapperStyle: {margin: '20px'},
        }
    }

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '10px 20px 10px 0px'}}>
            <Img src={logo} styled={{width:"55vw"}}/>
            <Wrapper styled={{margin: '0 0 0 auto'}}>
                <ImgBoxWrapper styled={{}} onClick={() => {setContentIndex(1);setClick(true);}}>
                    <Img src={icon_chat} styled={{width: '10vw'}} />
                </ImgBoxWrapper>
            </Wrapper>
            {
                isClick?
                <Wrapper styled={{...FieldStyle}}>
                    <Wrapper styled={{position: 'relative', z_index: '550'}}>
                        <CardTitle styled={{font_size:'1.8rem', font_weight: 'bold', text_align: 'center'} as const}>{contentIndex === 1 ? 'トークルーム作成': '検索条件'}</CardTitle>
                        <Wrapper styled={{position: 'absolute', right: '5px', top: '0', padding:'5px'}} onClick={() => {setClick(false);setContentIndex(1);}}>
                            <Img styled={{width:'20px'}} src={icon_close} />
                        </Wrapper>
                    </Wrapper>
                    <InputCard {...talkCardProps} />
                </Wrapper>
                    : null
            }
        </Wrapper>
    )
}

export default TalkSpHeader