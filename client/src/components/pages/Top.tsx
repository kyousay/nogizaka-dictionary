import React from 'react'
import TopHeader from '../../cotainers/Organisms/Header/TopHeader'
import TableList from '../../cotainers/Pages/Top/TableList'
import {userState} from '../../reducers/userReducer'

const Top : React.FC<userState> = (props) => {
    return(
        <>
            <TopHeader />
            <TableList />
        </>
    )
}

export default Top