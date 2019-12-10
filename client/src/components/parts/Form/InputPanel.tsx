import React, {useState} from 'react'
import styled from 'styled-components'
import Button from '../../Atoms/Button'
import { DataType } from '../../../actions/login/loginActions'
import Input  from '../../Atoms/Input'
import Wrapper from '../../Atoms/Wrapper'
import {LineParagragh} from '../../Atoms/Paragragh'

const Form = styled.form`
    margin: 0 auto;
    text-align: center;
`

const inputStyle = {
    font_size: '1.4rem', 
    padding: '5px 8px', 
    width: '280px',
    border: '1px solid #dddfe2'
}

interface props {
    tabIndex: number
    main: string
    sub: string
    tabChange: React.Dispatch<1 | 2>
    createAcount: (data: DataType) => void
    loginAcount: (data: DataType) => void
}

const InputPanel: React.FC<props> = (props) => {
    
    const tab = props.tabIndex === 1 ? 2 : 1 
    const initialValue = {email: '', password: ''}
    const [value, setValue] = useState(initialValue)
    const submitForm = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        const data = {
            email: value.email,
            password: value.password
        }

        if(data.email === '' || data.password === '') {
            alert('正しい値を入力してください。')
            return
        }else{
            if(props.tabIndex === 1){
                props.loginAcount(data)
                setValue(initialValue)
            }else{
                props.createAcount(data)
                setValue(initialValue)
            }
        }
    }
    
    return(
        <>
            <Form onSubmit={(e : React.FormEvent<HTMLElement>) => submitForm(e)}>
                <Wrapper styled={{margin:'10px'}}>
                    <Input type="email" placeholder="メールアドレス" value={value.email} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setValue({...value, email:e.target.value})}
                    styled={{...inputStyle}} />
                </Wrapper>
                <Wrapper styled={{margin:'10px'}}>
                    <Input type="password" placeholder="パスワード" value={value.password} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setValue({...value, password:e.target.value})}
                    styled={{...inputStyle}} />
                </Wrapper>
                <Wrapper styled={{margin: '10px'}}>
                    <Button styled={{width:"280px",bgColor:"#bf87c1",padding: '10px 0px'}}>{props.main}</Button>
                </Wrapper>
            </Form>
                <Wrapper styled={{margin: '20px 0 0 0', display:'flex', justify_content: 'center'}}>
                    <LineParagragh styled={{lineWidth:'100px', wrapperWidth: '280px',text_align: 'center',font_size: '1.2rem'}}>または</LineParagragh>
                </Wrapper>
                <Wrapper styled={{margin: '20px', display:'flex', justify_content:'center', align_items: 'center'}}>
                    <Button styled={{bgColor:"#42b72a",padding: "10px 28px"}} onClick={() => props.tabChange(tab)}>{props.sub}</Button>
                </Wrapper>
        </>
    )
}

export default InputPanel