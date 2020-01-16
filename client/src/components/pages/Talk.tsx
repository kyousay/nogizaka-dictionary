import React, {useEffect} from 'react'
import TalkHeader from '../../cotainers/Organisms/Header/TalkHeader'
import { userState } from '../../reducers/userReducer'
import useReactRouter from 'use-react-router'

interface Props {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void

}

const Talk: React.FC<Props> = (props) => {
    const {history} = useReactRouter()
    useEffect(() => {
        const isLogin = props.user.login
        const isStorageTokenFnc = props.isStorageToken 
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(isLogin !== true || isStorageToken !== true) {
            isStorageTokenFnc({isLogin:isStorageToken})
            history.push('/login')
        }
    },[history, props.user.login, props.isStorageToken])
    return(
        <TalkHeader/>
    )
}

export default Talk