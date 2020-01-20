import React, {useEffect} from 'react'
import TalkHeader from '../../cotainers/Organisms/Header/TalkHeader'
import TalkRoomList from '../../cotainers/Pages/Talk/TalkRoomList'
import { userState } from '../../reducers/userReducer'
import useReactRouter from 'use-react-router'

interface Props {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void
    getAllTalkRooms: () => void
}

const Talk: React.FC<Props> = (props) => {
    const {history} = useReactRouter()
    const getAllTalkRooms = props.getAllTalkRooms
    useEffect(() => {
        const isLogin = props.user.login
        const isStorageTokenFnc = props.isStorageToken 
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(isLogin !== true || isStorageToken !== true) {
            isStorageTokenFnc({isLogin:isStorageToken})
            history.push('/login')
        }else {
            getAllTalkRooms()
        }
    },[history, getAllTalkRooms, props.user.login, props.isStorageToken])
    return(
        <React.Fragment>
            <TalkHeader />
            <TalkRoomList />
        </React.Fragment>
    )
}

export default Talk