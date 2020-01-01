import React, {useEffect} from 'react'
import TopHeader from '../../cotainers/Organisms/Header/TopHeader'
import TableList from '../../cotainers/Pages/Top/TableList'
import {userState} from '../../reducers/userReducer'
import useReactRouter from 'use-react-router'

interface PageProps {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void
}

const Top : React.FC<PageProps> = (props) => {
    const {history} = useReactRouter()
    useEffect(() => {
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(props.user.login === false || isStorageToken === false) {
            props.isStorageToken({isLogin:isStorageToken})
            history.push('/login')
        }
    })

    return(
        <>
            <TopHeader />
            <TableList />
        </>
    )
}

export default Top