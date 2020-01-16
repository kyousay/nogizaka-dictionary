import React,{ useState } from 'react'
import styled from 'styled-components'
import SearchPanel from '../../Molecules/SerchPanel'
import InputCard from '../../Molecules/InputCard'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import logo from '../../../style/img/logo.jpg'
import icon from '../../../style/img/chat_icon.svg'
import {persistor} from '../../../store/index'
import {TalkState} from '../../../reducers/talkReducer'
import { userState } from '../../../reducers/userReducer'

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

const initialState = {
    roomName: '',
    description: '',
    key: ''
}

export interface RoomState {
    roomName: string
    description: string
    key: string
    isRock: boolean
}

export interface Props {
    user: userState
    createRoom: (date: RoomState) => void
    logout: () => void
    // searchRoom: (word : string) => void
}

const TalkHeader : React.FC<Props> = (props) => {
    const [word, changeSearchWord] = useState('')
    const [isHover, changeHover] = useState(false)
    const [roomState, setTalkRoomState] = useState(initialState)
    
    const changeHoverStateHandler = (state: boolean) => {
        changeHover(state)
    }
    const changeInputValueHandler = (state : typeof initialState) => {
        setTalkRoomState(state)
    }

    const createRoomHandler = () => {
        const isRock = roomState.key.length > 0
        const roomPostValue : RoomState = Object.assign(roomState, {isRock});
        props.createRoom(roomPostValue)
    }

    const logoutHandler = () => {
        props.logout()
        localStorage.removeItem('ticket')
        persistor.purge()
    }

    const searchActionHandler = () => {
        // props.searchWord(word)
        console.log('click')
    }

    const talkCardProps = {
        InputSectionsProps : {
            inputs: [
                {
                    title: 'ルーム名',
                    props: {
                        maxLength: 10,
                        value: roomState.roomName,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...roomState, roomName: e.target.value})
                    }
                    
                },
                {
                    title: '説明',
                    props: {
                        value: roomState.description,
                        maxLength: 60,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => changeInputValueHandler({...roomState, description: e.target.value})
                    }
                },
                {
                    title: '鍵かけ(*任意)',
                    props: {
                        value: roomState.key,
                        maxLength: 10,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            changeInputValueHandler({...roomState, key: e.target.value})
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
                    buttonStyle: {...buttonStyle,bgColor: '#42b72a' as '#42b72a', margin: '0'},
                    buttonTxt: 'ログアウト',
                    clickHandler: () => {
                        logoutHandler();
                        setTalkRoomState(initialState);
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
                    setTalkRoomState(initialState);
                }}>
                    <Img src={icon} styled={{width:'50px'}} />
                    
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