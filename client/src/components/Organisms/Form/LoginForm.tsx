import React,{ useState } from 'react'
import styled from 'styled-components'
import Wrapper, {withSPStyle} from '../../Atoms/Wrapper'
import {Heading3} from '../../Atoms/Heading'
import { DataType } from '../../../actions/login/loginActions'
import {LineParagragh} from '../../Atoms/Paragragh'
import Button from '../../Atoms/Button/'
import Form from '../../Molecules/Form'

const outerWrapperStyle ={
    margin: "80px auto",
    width: "396px",
    padding: "22px 108px 26px",
    bgColor: "#fff" as "#fff",
}

const OuterWrapperElement = styled(Wrapper)`
    box-sizing: unset;
`

const inputStyle = {
    font_size: '1.4rem' as '1.4rem', 
    padding: '5px 8px', 
    width: '280px',
    border: '1px solid #dddfe2',
    border_radius: '3px'
}

const spStyle = {
    width: '100%',
    padding: '22px 0',
}

const OuterWrapper = withSPStyle(OuterWrapperElement, spStyle)

interface props {
    createAcount: (data: DataType) => void
    loginAcount: (data: DataType) => void
}

const LoginForm: React.FC<props> = (props) => {

    const [tabIndex, tabChange] = useState(1)
    const title = tabIndex === 1 ? "乃木坂46にログイン" : "新しいアカウントを作成"
    const buttonText = tabIndex === 1 ? {main:"ログイン",sub:"新しいアカウントを作成"} : {main:"アカウント作成",sub:"乃木坂46にログイン"}
    const initialValue = {email: '', password: ''}

    const [value, setValue] = useState(initialValue)

    const changeTabIndex = () => {
        const tab = tabIndex === 1 ? 2 : 1 
        tabChange(tab)
    } 

    const submitHandler = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        const data = {
            email: value.email,
            password: value.password
        }

        if(data.email === '' || data.password === '') {
            alert('正しい値を入力してください。')
            return
        }else{
            if(tabIndex === 1){
                props.loginAcount(data)
                setValue(initialValue)
            }else{
                props.createAcount(data)
                setValue(initialValue)
            }
        }
    }

    const FormProps = {
        inputsProps: {
            inputs: [
                {
                    type: 'email' as 'email',
                    value: value.email,
                    placeholder: 'メールアドレス',
                    inputStyle,
                    inputWrapperStyle: {margin: '10px'},
                    onChangeHandler: (e : React.ChangeEvent<HTMLInputElement>)  => setValue({...value, email: e.target.value})
                },
                {
                    type: 'password' as 'password',
                    value: value.password,
                    placeholder: 'パスワード',
                    inputStyle,
                    inputWrapperStyle: {margin: '10px'},
                    onChangeHandler: (e : React.ChangeEvent<HTMLInputElement>)  => setValue({...value, password: e.target.value})
                },
            ]
        },
        buttonsProps: {
            buttons: [
                {
                    buttonWrapperStyle: {margin: '10px 0 0 0'},
                    buttonStyle: {width:"280px",bgColor:"#bf87c1" as "#bf87c1",padding: '10px 0px'},
                    buttonTxt: buttonText.main,
                }
            ]
        },
        submitHandler: submitHandler,
    }

    return(
        <OuterWrapper styled={{...outerWrapperStyle}}>
            <Wrapper styled={{padding: '18px 0'}}>
                <Heading3 styled={{font_size: '1.8rem', text_align: 'center'}}>{title}</Heading3>
            </Wrapper>
            <Form {...FormProps} />
            <Wrapper styled={{margin: '20px 0 0 0', display:'flex', justify_content: 'center'}}>
                <LineParagragh styled={{lineWidth:'100px', wrapperWidth: '280px',text_align: 'center',font_size: '1.2rem'}}>または</LineParagragh>
            </Wrapper>
            <Wrapper styled={{margin: '20px', display:'flex', justify_content:'center', align_items: 'center'}}>
                <Button styled={{bgColor:"#42b72a",padding: "10px 28px"}} onClick={() => changeTabIndex()}>{buttonText.sub}</Button>
            </Wrapper>
        </OuterWrapper>
    )
}

export default LoginForm