import React, {useEffect} from 'react'
import TopHeader from '../../cotainers/Organisms/Header/TopHeader'
import TableList from '../../cotainers/Pages/Top/TableList'
import {userState} from '../../reducers/userReducer'
import {withRouter, RouteComponentProps} from 'react-router'

interface PageProps extends RouteComponentProps {
    user: userState
    isStorageToken: (props: {isLogin: boolean}) => void
}

const Top : React.FC<PageProps> = (props) => {
    useEffect(() => {
        const isStorageToken = localStorage.getItem('ticket')? true : false
        if(props.user.login === false || isStorageToken === false) {
            props.isStorageToken({isLogin:isStorageToken})
            props.history.push('/login')
        }
    })

    return(
        <>
            <TopHeader />
            <TableList />
        </>
    )
}

export default withRouter(Top)