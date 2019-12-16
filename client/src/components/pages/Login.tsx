import React, {useEffect} from 'react'
import LoginHeader from '../Organisms/Header/LoginHeader'
import LoginForm from '../../cotainers/Organisms/Form/LoginForm'
import {userState} from '../../reducers/userReducer'
import {withRouter, RouteComponentProps} from 'react-router'

interface PageProps extends RouteComponentProps {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void
}

const Login : React.FC<PageProps> = (props) => {
    useEffect(() => {
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(props.user.login || isStorageToken === true) {
            props.isStorageToken({isLogin:isStorageToken})
            props.history.push('/top')
        }
    })
    return(
        <>
            <LoginHeader />
            <LoginForm />
        </>
    )
}

export default withRouter(Login)