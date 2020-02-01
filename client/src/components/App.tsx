import React from 'react';
import styled from 'styled-components'
import { Redirect, Route, Switch } from 'react-router'
import { GlobalStyle } from '../style/BaseStyle'
import Wrapper from './Atoms/Wrapper'
import Top from '../cotainers/Pages/Top'
import Login from '../cotainers/Pages/Login'
import Admin from '../cotainers/Pages/Admin'
import Talk from '../cotainers/Pages/Talk'
import Chat from '../cotainers/Pages/Chat'
import ClipLoader from 'react-spinners/ClipLoader'
import { userState } from '../reducers/userReducer';

const LoadingWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  background-color: rgba(255,255,255,0.5);
`

// const override = css`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform:translate(-50%, -50%);
// `

const wrapperStyle = {
  position: 'absolute',
  right: '0',
  left: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  text_align: 'center',
  z_index: '100000'
} as const

interface Props {
  user: userState
}

const App: React.FC<Props> = props => {
  return (
    <>
      <GlobalStyle />
      <Wrapper styled={{bgColor:'#F9F9F9',min_height:"100vh"}}>
      {
        props.user.loading? 
        <LoadingWrapper>
          <Wrapper styled={{...wrapperStyle}}>
            <ClipLoader size={200} color={"#9370db"} loading={true} />
          </Wrapper>
        </LoadingWrapper>
        : null
      }
      
        <Switch>
          <Route path='/login' component={Login} />
          <Route path="/top" component={Top} />
          <Route path="/admin" component={Admin} />
          <Route path="/talk" component={Talk} />
          <Route path="/chat" component={Chat} />
          <Redirect to="/login" />
        </Switch>
      </Wrapper>
    </>
  )
}

export default App;
