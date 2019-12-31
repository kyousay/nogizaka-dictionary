import React from 'react';
import { Redirect, Route, Switch } from 'react-router'
import { GlobalStyle } from '../style/BaseStyle'
import Wrapper from './Atoms/Wrapper'
import Top from '../cotainers/Pages/Top/Top'
import Login from '../cotainers/Pages/Login/Login'
import Admin from './Pages/Admin'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper styled={{bgColor:'#F9F9F9',min_height:"100vh"}}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path="/top" component={Top} />
        <Route path="/admin" component={Admin} />
        <Redirect to="/login" />
      </Switch>
      </Wrapper>
    </>
  )
}

export default App;
