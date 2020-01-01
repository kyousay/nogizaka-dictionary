import React from 'react'
import Wrapper from '../Atoms/Wrapper'
import AdminForm from '../Organisms/Form/AdminForm'

const Admin = () => (
    <Wrapper styled={{min_height: '100vh'}}>
        <AdminForm />
    </Wrapper>
)

export default Admin