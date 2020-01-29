import React, {useEffect} from 'react'
import TopHeader from '../../../cotainers/Organisms/Header/TopHeader'
import TableList from '../../../cotainers/Organisms/Table/TableList'
import {userState} from '../../../reducers/userReducer'
import { Helmet } from 'react-helmet'
import useReactRouter from 'use-react-router'

interface PageProps {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void
    getAllMembers: () => void
}

const Top : React.FC<PageProps> = props => {
    const {history} = useReactRouter()
    const getAllMembers = props.getAllMembers
    useEffect(() => {
        const isLogin = props.user.login
        const isStorageTokenFnc = props.isStorageToken 
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(isLogin !== true || isStorageToken !== true) {
            isStorageTokenFnc({isLogin:isStorageToken})
            history.push('/login')
        }else {
            getAllMembers()
        }
    },[history, getAllMembers, props.user.login, props.isStorageToken])

    return(
        <>
            <Helmet>
                <title>
                    Nogizaka-Dictinary ~TopPage~
                </title>
            </Helmet>

            <TopHeader />
            <TableList />
        </>
    )
}

export default Top