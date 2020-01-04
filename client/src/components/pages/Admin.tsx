import React from 'react'
import Wrapper from '../Atoms/Wrapper'
import AdminForm from '../../cotainers/Organisms/Form/AdminForm'
import UpdateForm from '../../cotainers/Organisms/Form/UpdateForm'
import {Route, Switch} from 'react-router'

const Admin = () => (
    <Wrapper styled={{min_height: '100vh'}}>
        <Switch>
            <Route path="/admin/update" component={UpdateForm}/>
            <Route path="/" component={AdminForm} />
        </Switch>
    </Wrapper>
)

export default Admin