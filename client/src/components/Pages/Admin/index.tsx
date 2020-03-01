import React, { useEffect } from 'react'
import Wrapper from '../../atoms/Wrapper'
import AdminForm from '../../../cotainers/organisms/Form/AdminForm'
import UpdateForm from '../../../cotainers/organisms/Form/UpdateForm'
import { Helmet } from 'react-helmet'
import {userState} from '../../../reducers/userReducer'
import {Route, Switch} from 'react-router'
import useReactRouter from 'use-react-router'

interface Props {
    user : userState
    isStorageToken: (props: {isLogin: boolean}) => void
}

const Admin = (props: Props) => {
    const {history} = useReactRouter()
    useEffect(() => {
        const isStorageToken = localStorage.getItem('ticket')? true : false
        const isPermission = props.user.permission === 'root' ? true : false
        if(isStorageToken !== true || isPermission !== true) {
            props.isStorageToken({isLogin: isStorageToken})
            history.push('/top')
        }
    })

    return(
        <>
            <Helmet>
                <title>
                    Nogizaka-Dictinary ~AdminPage~
                </title>
            </Helmet>

            <Wrapper styled={{min_height: '100vh'}}>
                <Switch>
                    <Route path="/admin/update" component={UpdateForm}/>
                    <Route path="/" component={AdminForm} />
                </Switch>
            </Wrapper>
        </>
    )
}

export default Admin