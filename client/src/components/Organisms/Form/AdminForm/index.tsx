import React, {useState, useEffect} from 'react'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import Button from '../../../Atoms/Button'
import InputSections from '../../../Molecules/InputSectoins'
import Buttons from '../../../Molecules/Buttons'
import defaultImage from '../../../../style/img/defaultImg.jpg'
import {Link} from 'react-router-dom'
import { membersState } from '../../../../reducers/membersReducer';

const wrapperStyle = {
    width: '320px', 
    margin:'0 auto', 
}

const baseInputStyle = {
    font_size: '1.4rem' as '1.4rem', 
    padding: '5px 8px', 
    width: '320px',
    border: '1px solid #dddfe2',
    border_radius: '3px',
    bgColor: '#fff' as '#fff'
}

const baseInputWrapperStyle = {
    margin: '20px auto 0',
    text_align: 'center' as 'center'
}

const baseInputTitleStyle = {
    font_size: '1.4rem' as '1.4rem',
    padding: '10px 0'
}

const baseButtonStyle = {
    padding: '20px', 
    width: '320px', 
    font_size: '1.4rem' as '1.4rem', 
    font_weight: 'bold' as 'bold', 
    color: '#fff', 
    bgColor: '#bf87c1' as '#bf87c1'
}

const initialState = {
    image: '',
    name: ['', ''],
    sailium: ['', ''],
    segment: '',
    dateOfBirth : '',
    blod: '',
    height: '',
    hash:[''],
}

export type MemberState = typeof initialState

interface Props {
    members: membersState
    upload: (data: MemberState) => void
    getAllMembers:() => void
}

const AdminForm: React.FC<Props> = props => {
    useEffect(() => {
        const getAllMembers = props.getAllMembers
        getAllMembers()
    },[props.getAllMembers])
    const [memberState, memberChange] = useState<MemberState>(initialState)

    const fileSetHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const postData = {
            ...memberState,
        }
        props.upload(postData)
        memberChange(initialState)
        if(document.querySelector('input[name="image"]') !== null) {
            let input: HTMLInputElement = document.querySelector('input[name="image"]') as HTMLInputElement
            input.value = ''
        }
    }

    const InputSectionsProps = {
        inputs: [
            {
                title: 'Image',
                props: {
                    accept: '.png,.jpg,.jpeg',
                    placeholder: 'Image',
                    type: 'file',
                    name: 'image',
                    required: true,
                    onChange: fileSetHandler,
                },
            },
            {
                title: 'Name',
                props: {
                    placeholder: 'names *arguments2',
                    type: 'text',
                    name: 'name',
                    value: memberState.name,
                    required: true,
                    onChange: setArrayHandler,
                }
            },
            {
                title: 'Sailium',
                props: {
                    placeholder: 'sailium',
                    type: 'text',
                    name: 'sailium',
                    value: memberState.sailium,
                    required: true,
                    onChange: setArrayHandler,
                }
            },
            {
                title: 'Segment',
                props: {
                    placeholder: 'segment',
                    type: 'text',
                    name: 'segment',
                    value: memberState.segment,
                    required: true,
                    onChange: setStringHandler,
                }
            },
            {
                title: 'DateOfBirth',
                props: {
                    placeholder: 'dateOfBirth',
                    type: 'text',
                    name: 'dateOfBirth',
                    value: memberState.dateOfBirth,
                    required: true,
                    onChange: setStringHandler,
                }
            },
            {
                title: 'BlodType',
                props: {
                    placeholder: 'blodType',
                    type: 'text',
                    name: 'blod',
                    value: memberState.blod,
                    required: true,
                    onChange: setStringHandler,
                }
            },
            {
                title: 'Height',
                props: {
                    placeholder: 'height',
                    type: 'text',
                    name: 'height',
                    value: memberState.height,
                    required: true,
                    onChange: setStringHandler,
                }
            },
            {
                title: 'Hash',
                props: {
                    placeholder: 'hash',
                    type: 'text',
                    name: 'hash',
                    value: memberState.hash,
                    required: true,
                    onChange: setArrayHandler,
                }
            },
        ],
        baseInputStyle,
        baseInputWrapperStyle,
        baseInputTitleStyle
    }

    const ButtonsProps = {
        buttons: [
            {
                buttonTxt: 'メンバー登録',
            },
        ],
        baseButtonWrapperStyle: {margin: '30px 0 0'},
        baseButtonStyle
    }

    const Imgsrc = memberState.image ? memberState.image : defaultImage
    return(
        <Wrapper styled={{...wrapperStyle}}>
            <Img src={Imgsrc} styled={{width: '320px'}}/>
            <form onSubmit={(e) => submitHandler(e)} >
                <InputSections {...InputSectionsProps} />
                <Buttons {...ButtonsProps} />
            </form>
            <Wrapper styled={{margin: '30px 0 0'}}>
                <Link to={"/admin/update"}><Button styled={{...baseButtonStyle, bgColor: '#42b72a' as '#42b72a'}}>メンバー情報更新ページへ</Button></Link>
            </Wrapper>
        </Wrapper>
    )
}

export default AdminForm