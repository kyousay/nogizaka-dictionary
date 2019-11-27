import React from 'react';
import { Redirect, Route, Switch } from 'react-router'
import styled from 'styled-components'
import { GlobalStyle } from '../style/BaseStyle'
import Top from './pages/Top'
import Login from './pages/Login'

interface wrapProps {
    styled: {
      bgColor?: string,
      min_height?: string
    }
}

const Wrapper = styled.div<wrapProps>`
  background-color: ${(props) => props.styled.bgColor}
  min-height: ${(props) => props.styled.min_height}
`
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
