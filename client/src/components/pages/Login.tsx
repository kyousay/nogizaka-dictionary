import React, {useEffect} from 'react'
import LoginHeader from '../Organisms/Header/LoginHeader'
import LoginForm from '../../cotainers/Organisms/Form/LoginForm'
import {userState} from '../../reducers/userReducer'
import useReactRouter from 'use-react-router'
// import {withRouter, RouteComponentProps} from 'react-router'

interface PageProps {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void
}

const Login : React.FC<PageProps> = (props) => {
    const { history, location, match } = useReactRouter()
    useEffect(() => {
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(props.user.login || isStorageToken === true) {
            props.isStorageToken({isLogin:isStorageToken})
            history.push('/top')
            console.log(location)
            console.log(match)
        }
    })
    return(
        <>
            <LoginHeader />
            <LoginForm />
        </>
    )
}

export default Login