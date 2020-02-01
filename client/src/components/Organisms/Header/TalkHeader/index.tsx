import React,{ useState } from 'react'
import styled from 'styled-components'
import InputCard from '../../../Molecules/InputCard'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import ImgBox from '../../../Molecules/ImgBox'
import logo from '../../../../style/img/logo.jpg'
import icon from '../../../../style/img/chat_icon.svg'
import {persistor} from '../../../../store/index'
import { userState } from '../../../../reducers/userReducer'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
`

const cardStyle = {
    position: 'absolute',
    right: '10px',
    bgColor: '#fff',
    width: '315px',
    padding: '20px',
} as const

const buttonStyle = {
    font_size: '1.4rem',
    color: '#fff',
    width: '100%',
    padding: '10px',
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

const TalkHeader : React.FC<Props> = (props) => {
    const [isHover, changeHover] = useState(false)
    const [roomState, setTalkRoomState] = useState<InitialState>(initialState)
    
    const changeHoverStateHandler = (state: boolean) => {
        changeHover(state)
    }
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
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '0px 20px'}}>
            <Img src={logo} styled={{width:"300px"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between'}}>
                <ImgBoxWrapper styled={{margin: '0 20px 0 0', position: 'relative', z_index: '50'}} 
                onMouseEnter={() => changeHoverStateHandler(true)}
                onMouseLeave={() => {
                    changeHoverStateHandler(false);
                    setTalkRoomState(initialState);
                }}>
                    <ImgBox src={icon} width={'40px'} description={"TalkRoom作成"} font_size={'1.2rem' as '1.2rem'} />
                    
                    {
                        isHover ?
                            <InputCard {...talkCardProps} />
                                :
                            null
                    }
                </ImgBoxWrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default TalkHeader