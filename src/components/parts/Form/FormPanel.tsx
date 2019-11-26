import React,{ useState } from 'react'
import styled from 'styled-components'
import FormTitle from './FormTitle'
import InputPanel from '../../../cotainers/pages/Login/InputPanel'

const LoginPanel = styled.div`
    margin: 80px auto;
    width: 396px;
    padding 22px 108px 26px;
    background-color: #fff;
    box-sizing: unset;
`

const FormPanel: React.FC = () => {

    const [tabIndex, tabChange] = useState(1)

    const title = tabIndex === 1 ? "乃木坂46にログイン" : "新しいアカウントを作成"
    const buttonText = tabIndex === 1 ? {main:"ログイン",sub:"新しいアカウントを作成"} : {main:"アカウント作成",sub:"乃木坂46にログイン"}
    const tab = {tabIndex:tabIndex,tabChange:tabChange}

    return(
        <LoginPanel>
            <FormTitle title={title}/>
            <InputPanel {...buttonText}{...tab}/>
        </LoginPanel>
    )
}

export default FormPanel