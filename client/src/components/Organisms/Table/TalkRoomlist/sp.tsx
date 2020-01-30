import React, {useState} from 'react'
import Wrapper from '../../../Atoms/Wrapper'
import Button from '../../../Atoms/Button'
import TalkRoomCard from '../../../Molecules/TalkRoomCard'
import icon from '../../../../style/img/lock_icon.svg'
import { TalkState, TalkRoomState } from '../../../../reducers/talkReducer'
import { Link } from 'react-router-dom'
import { RoomParam } from '../../../../actions/talk/talkActions'
import InputCard from '../../../Molecules/InputCard'


const UnOrderdList = Wrapper.withComponent('ul')

const ListItem = Wrapper.withComponent('li')

const zoomFieldStyle = {
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    height: "100%",
    width: "100%",
    z_index: "10",
    bgColor: "rgba(0,0,0,0.7)",
} as const 

const buttonStyle = {
    font_size: '1.4rem',
    font_weight: 'bold',
    color: '#fff',
    padding: '20px 0',
    bgColor: '#812990',
    width: '80vw'
} as const

interface Props {
    talk: TalkState
    getTalkRoom: (roomParam: RoomParam) => void
}

const TalkSpRoomList: React.FC<Props> = props => {
    const [isRock, setRock] = useState(false)
    const [password, setPassword] = useState('')
    const [room, setRoomInfo] = useState<TalkRoomState>({
        _id: '',
        roomName: '',
        description: '',
        image: '',
        isRock: false,
    })
    const rooms  = props.talk.rooms

    const InputCardProps = {
        InputSectionsProps: {
            inputs: [{
                title: 'Roomkey',
                props: {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
                    value: password
                },
                inputStyle: {font_size: '1.4rem', width: '100%', padding: '10px 12px',bgColor: '#EAEAEA', border: 'none', margin: '20px 0'} as const,
                inputTitleStyle: {font_size: '1.8rem', font_weight: 'bold', padding: '5px 5px 20px 5px'} as const,
            }]
        },
        ButtonsProps: {
            buttons: [
                {
                    buttonTxt: '送信',
                    clickHandler: () => {
                        if(!emptyCheck()) {
                            if(window.confirm('パスワードを送信します。')){
                                PostPasswordInfo()
                            }
                        } else {
                            alert("パスワードが入力されていません。")
                        }
                    },
                    buttonStyle: {bgColor: '#812990'} as const,
                    buttonWrapperStyle: {margin: '30px 0 0'}
                },
                {
                    buttonTxt: '入力をキャンセル',
                    clickHandler: () => cancelRock(),
                    buttonStyle: {bgColor: '#42b72a'} as const,                  
                }
            ],
            baseButtonStyle: {
                font_size: '1.4rem',
                color: '#fff',
                width: '100%',
                padding: '10px'
            } as const,
            baseButtonWrapperStyle: {margin: '10px 0 0 0'}
        },
        cardStyle: {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            width: '250px',
            height: '250px',
            text_align: 'center',
            padding: '20px',
            bgColor: '#fff',
            z_index: '20',
        } as const
    }

    const emptyCheck = () => {
        let isEmpty = false
        if(password === '') {
            isEmpty = true
        }
        return isEmpty
    }

    const cancelRock = () => {
        setRock(false)
        setPassword('')
    }

    const PostPasswordInfo = () => {
        const {_id, isRock} = room
        const roomParam = {
            _id,
            isRock,
            password
        }
        props.getTalkRoom(roomParam)
        cancelRock()
    }
    
    const cardClickHandler = (data : TalkRoomState) => {
        const {_id, isRock} = data
        const roomParam = {
            _id,
            isRock
        }
        if(isRock) {
            setRock(true);
        } else {
            props.getTalkRoom(roomParam)
        }
    }

    return (
        <React.Fragment>
            {
                isRock ? 
                    <Wrapper styled={{...zoomFieldStyle}} onClick={() => cancelRock()}>
                        <Wrapper styled={{}} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()} >
                            <InputCard {...InputCardProps} />
                        </Wrapper>
                    </Wrapper>
                    :
                    null
            }
            <Wrapper styled={{margin: '60px 0 30px', display: 'flex', justify_content: 'center'} as const}>
                <Link to={"/top"}><Button styled={{...buttonStyle}}>トップページへ</Button></Link>
            </Wrapper>
            {   <UnOrderdList styled={{display:'flex', justify_content: "center", flex_wrap: "wrap"}}>
                    {rooms.map((room,index) => {
                        const iconImage = room.isRock ? icon : undefined
                        return(
                            <ListItem key={index} onClick={() => {setRoomInfo(room);cardClickHandler(room);}} styled={{display: 'inline-block'}}>
                                <TalkRoomCard {...{room, iconImage}}/>
                            </ListItem>
                        )})
                    }
                </UnOrderdList>
            }
        </React.Fragment>
    )
}

export default TalkSpRoomList