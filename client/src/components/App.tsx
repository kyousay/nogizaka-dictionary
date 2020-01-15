import React from 'react';
import styled from 'styled-components'
import { Redirect, Route, Switch } from 'react-router'
import { GlobalStyle } from '../style/BaseStyle'
import Wrapper from './Atoms/Wrapper'
import Top from '../cotainers/Pages/Top/Top'
import Login from '../cotainers/Pages/Login/Login'
import Admin from '../cotainers/Pages/Admin'
import Talk from '../components/Pages/Talk'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { userState } from '../reducers/userReducer';

const LoadingWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-inex: 1000;
  background-color: rgba(255,255,255,0.5);
`

const override = css`
    position: absolute;
    top: 45%;
    left: 45%;
    bordere-color: red;
`

interface Props {
  user: userState
}

const App: React.FC<Props> = props => {
  return (
    <>
      {
        props.user.loading? 
        <LoadingWrapper>
          <ClipLoader css={override} size={200} color={"#9370db"} loading={true} />
        </LoadingWrapper>
        : null
      }
      <GlobalStyle />
      <Wrapper styled={{bgColor:'#F9F9F9',min_height:"100vh"}}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path="/top" component={Top} />
          <Route path="/admin" component={Admin} />
          <Route path="/talk" component={Talk} />
          <Redirect to="/login" />
        </Switch>
      </Wrapper>
    </>
  )
}

export default App;
