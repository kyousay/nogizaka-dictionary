import React from 'react'
import socket from '../../../../websocket'
import styled from 'styled-components'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import ImgBox from '../../../Molecules/ImgBox'
import logo from '../../../../style/img/logo.jpg'
import icon from '../../../../style/img/pageback_icon.svg'
import useReactRouter from 'use-react-router'

const ImgBoxWrapper = styled(Wrapper)`
    cursor: pointer;
`

interface Props {
    changeIsSetRoom: (isSetRoom: boolean) => void
}

const ChatSpHeader: React.FC<Props> = props => {
    const {history} = useReactRouter()

    const backToRoomHandler = () => {
        if(window.confirm('ルーム選択に戻りますがよろしいですか？')){
            socket.emit("leaveRoom")
            props.changeIsSetRoom(false)
            history.push('/talk')
        }
    }

    return(
        <Wrapper styled={{position: 'absolute', top: '0', right: '0', left: '0', display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '10px 0'}}>
            <Img src={logo} styled={{width:"55vw"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between'}}>
                <ImgBoxWrapper styled={{margin: '0 20px 0 0'}} onClick={() => backToRoomHandler()}>
                    <ImgBox src={icon} width={'6vw'} margin={'10px 0 0 0'} description={'選択画面に戻る'} font_size={'1.2rem' as '1.2rem'} />
                </ImgBoxWrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default ChatSpHeader