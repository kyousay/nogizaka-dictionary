import React, {useState} from 'react'
import io from 'socket.io-client'
import Form from '../../Molecules/Form'
import Wrapper from '../../Atoms/Wrapper'
import { userState } from '../../../reducers/userReducer';
import { RoomState } from '../../../reducers/talkReducer';

const socket = io('localhost:3001');

interface Props {
    user: userState
    room: RoomState
}

const ChatForm: React.FC<Props> = props => {
    console.log(props)
    const [chatState, setChatState] = useState('')

    const PostChatForm = () => {
        if(checkEmpty(chatState)){
            socket.emit("message", "client")
            socket.on("message", (data: {content: string})=> {
            console.log(data)
            })
            setChatState('')
        }else {
            alert('未入力では送信できません。')
        }
    }

    const checkEmpty = (value: string) => {
        const isResult = value.length > 0 ? true : false
        return isResult  
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        PostChatForm()
    }

    const FormProps = {
        inputsProps: {
            inputs: [
                {
                    props: {
                        type: 'text',
                        maxLength: 120,
                        value: chatState,
                        onChange: (e : React.ChangeEvent<HTMLInputElement>) => setChatState(e.target.value)
                    }
                }
            ],
            baseStyle: {
                inputStyle: {width: '400px', padding: '15px 12px', font_size: '1.4rem'} as const
            }
        },
        buttonsProps: {
            buttons: [
                {
                    buttonTxt: 'chat',
                }
            ],
            baseButtonStyle: {padding: '10px', bgColor: '#812990'} as const,
            baseButtonWrapperStyle: {margin: '0 0 0 20px'}
        },
        wrapperStyle: { display: 'flex', justify_content: 'center', align_items: 'center'} as const,
        submitHandler
    }

    return(
        <Wrapper styled={{margin: '20px 0 0', }}>
            <Form {...FormProps}/>
        </Wrapper>
    )
}

export default ChatForm