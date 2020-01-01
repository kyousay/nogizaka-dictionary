import React, {useState} from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import Form from '../../Molecules/Form'
import defaultImage from '../../../style/img/defaultImg.jpg'

const wrapperStyle = {
    width: '320px', 
    margin:'0 auto', 
}

const inputStyle = {
    font_size: '1.4rem' as '1.4rem', 
    padding: '5px 8px', 
    width: '280px',
    border: '1px solid #dddfe2',
    border_radius: '3px'
}

const inputWrapperStyle = {
    margin: '20px auto 0'
}

const buttonStyle = {
    padding: '20px', 
    width: '280px', 
    font_size: '1.4rem' as '1.4rem', 
    font_weight: 'bold' as 'bold', 
    color: '#fff', 
    bgColor: '#bf87c1' as '#bf87c1'
}

interface memberState {
    image: string
    name: string[]
    sailium: string[]
    segment: string
    dateOfBirth: string
    blod: string
    height: string
    hash: string[]
}

const AdminForm = () => {
    const [memberState, memberChange] = useState<memberState>({
        image: '',
        name: ['', ''],
        sailium: ['', ''],
        segment: '',
        dateOfBirth : '',
        blod: '',
        height: '',
        hash:['']
    })
    
    const fileSetHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        if(event.target.files !== null && event.target.files.length > 0) {
            let file = event.target.files[0]
            let fileReader = new FileReader()
            fileReader.onloadend = function(){
                let dataUri = this.result
                if(typeof dataUri === 'string'){
                    memberChange({
                        ...memberState,
                        image: dataUri
                    })
                }
            }
            fileReader.readAsDataURL(file)
        }
    }

    const setStringHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let key = event.target.name
        memberChange({
            ...memberState,
            [key] : event.target.value
        })
    }

    const setArrayHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let key = event.target.name
        let value = event.target.value.split(',')
        memberChange({
            ...memberState,
            [key] : value
        })
    }

    const submitHandler = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()
    }

    const formProps = {
        inputsProps: {
            inputs: [
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        accept: '.png,.jpg,.jpeg',
                        placeholder: 'Image',
                        type: 'file' as 'file',
                        name: 'image',
                        onChange: fileSetHandler,
                    },
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'names *arguments2',
                        type: 'text' as 'text',
                        name: 'name',
                        onChange: setArrayHandler,
                    }
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'sailium',
                        type: 'text' as 'text',
                        name: 'sailium',
                        onChange: setArrayHandler,
                    }
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'segment',
                        type: 'text' as 'text',
                        name: 'segment',
                        onChange: setStringHandler,
                    }
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'dateOfBirth',
                        type: 'text' as 'text',
                        name: 'dateOfBirth',
                        onChange: setStringHandler,
                    }
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'blodType',
                        type: 'text' as 'text',
                        name: 'blod',
                        onChange: setStringHandler,
                    }
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'height',
                        type: 'text' as 'text',
                        name: 'height',
                        onChange: setStringHandler,
                    }
                },
                {
                    inputStyle,
                    inputWrapperStyle,
                    props: {
                        placeholder: 'hash',
                        type: 'text' as 'text',
                        name: 'hash',
                        onChange: setArrayHandler,
                    }
                },
            ]
        },
        buttonsProps: {
            buttons: [
                {
                    buttonWrapperStyle: {margin: '30px 0 0 0'},
                    buttonStyle,
                    buttonTxt: 'メンバーを登録',
                },
                {
                    buttonWrapperStyle: {margin: '20px 0 0 0'},
                    buttonStyle: {...buttonStyle, bgColor: '#42b72a' as '#42b72a'},
                    buttonTxt: 'メンバー情報を更新',
                },
            ]
        },
        submitHandler: submitHandler
    }

    const Imgsrc = memberState.image ? memberState.image : defaultImage
    return(
        <Wrapper styled={{...wrapperStyle}}>
            <Img src={Imgsrc} styled={{height: '320px', width: '320px'}}/>
            <Form {...formProps} />
        </Wrapper>
    )
}

export default AdminForm