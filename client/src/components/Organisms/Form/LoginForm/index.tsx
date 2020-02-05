import React,{ useState } from 'react'
import styled from 'styled-components'
import Wrapper, {withSPStyle} from '../../../Atoms/Wrapper'
import Heading from '../../../Atoms/Heading'
import { DataType } from '../../../../actions/login/loginActions'
import {LineParagragh} from '../../../Atoms/Paragragh'
import CancelButton from '../../../Atoms/Button/CancelButton'
import Form from '../../../Molecules/Form/refactore'
import TransitionButton from '../../../Atoms/Button/TransitionButton'

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

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
                    props: {
                        type: 'email',
                        value: value.email,
                        placeholder: 'メールアドレス',
                        onChange: (e : React.ChangeEvent<HTMLInputElement>)  => setValue({...value, email: e.target.value})
                    }
                },
                {
                    props: {
                        type: 'password',
                        value: value.password,
                        placeholder: 'パスワード',
                        onChange: (e : React.ChangeEvent<HTMLInputElement>)  => setValue({...value, password: e.target.value})
                    }
                },
            ],
            baseStyle: {
                inputStyle,
                inputWrapperStyle: {margin: '10px'},
            }
        },
        button: {
            buttonWrapperStyle: {margin: '10px 0 0 0'},
            style: {width:"280px",bgColor:"#bf87c1" as "#bf87c1",padding: '10px 0px'},
            txt: buttonText.main,
        },
        submitHandler: submitHandler,
    }

    return(
        <OuterWrapper styled={{...outerWrapperStyle}}>
            <Wrapper styled={{padding: '18px 0'}}>
                <Heading as="h3" styled={{font_size: '1.8rem', text_align: 'center'}}>{title}</Heading>
            </Wrapper>
            <Form {...FormProps} />
            <Wrapper styled={{margin: '20px 0 0 0', display:'flex', justify_content: 'center'}}>
                <LineParagragh styled={{lineWidth:'100px', wrapperWidth: '280px',text_align: 'center',font_size: '1.2rem'}}>または</LineParagragh>
            </Wrapper>
            <Wrapper styled={{margin: '20px', display:'flex', justify_content:'center', align_items: 'center'}}>
                <TransitionButton style={{bgColor:"#42b72a",padding: "10px 28px"}} clickHandler={() => changeTabIndex()} txt={buttonText.sub} />
            </Wrapper>
        </OuterWrapper>
    )
}

export default LoginForm