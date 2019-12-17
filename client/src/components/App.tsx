import React from 'react';
import { Redirect, Route, Switch } from 'react-router'
import { GlobalStyle } from '../style/BaseStyle'
import Wrapper from './Atoms/Wrapper'
import Top from '../cotainers/Pages/Top/Top'
import Login from '../cotainers/Pages/Login/Login'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper styled={{bgColor:'#F9F9F9',min_height:"100vh"}}>
      <Switch>
        <Route path='/Login' component={Login} />
        <Route path="/Top" component={Top} />
        <Redirect to="/Login" />
      </Switch>
      </Wrapper>
    </>
  )
}

export default App;
