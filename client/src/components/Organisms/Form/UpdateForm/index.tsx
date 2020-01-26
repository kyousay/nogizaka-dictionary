import React, {useState, useEffect} from 'react'
import Wrapper from '../../../Atoms/Wrapper'
import Img from '../../../Atoms/Img'
import Button from '../../../Atoms/Button'
import InputSections from '../../../Molecules/InputSectoins'
import Buttons from '../../../Molecules/Buttons'
import Selects from '../../../Molecules/Selects'
import defaultImage from '../../../../style/img/defaultImg.jpg'
import { membersState } from '../../../../reducers/membersReducer'
import {Link}from 'react-router-dom'
import useReactRouter from 'use-react-router'

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

interface Props {
    members: membersState
    getAllMembers: () => void
    update: (member: typeof initialState) => void
    delete: (memberId: string) => void
}

const initialState = {
    _id: '',
    image: '',
    name: ['',''],
    sailium: ['', ''],
    segment: '',
    dateOfBirth : '',
    blod: '',
    height: '',
    hash:['']
}

export type MemberState = typeof initialState

const UpdateForm: React.FC<Props> = props => {
    const {history} = useReactRouter()
    const [memberState, memberChange] = useState(initialState)
    const [buttonIndex, setButtonIndex] = useState(1)

    const setIndex = (index: 1 | 2) => {
        setButtonIndex(index)
    }

    useEffect(() => {
        const getAllMembers = props.getAllMembers
        getAllMembers()
    },[props.getAllMembers])

    useEffect(() => {
        console.log(props.members.length)
        if(props.members.length < 1){
            history.push("/admin")
        } else {
            let initialMemberState = {
                _id: props.members[0]._id,
                image: props.members[0].image,
                name: props.members[0].name,
                sailium: props.members[0].sailium,
                segment: props.members[0].segment,
                dateOfBirth: props.members[0].dateOfBirth,
                blod: props.members[0].blod,
                height: props.members[0].height,
                hash: props.members[0].hash,
            }
            memberChange(initialMemberState)
        }
    },[props.members, history])

    const clearInputValue = (query : string) => {
        document.querySelector<HTMLInputElement>(`${query}`)!.value = ''
    }

    const selectChangeHanlder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.members.forEach((member,index) => {
            if(member._id === e.target.value) {
                memberChange({
                    ...props.members[index]
                })
            }
        })
        clearInputValue('input[name="image"]')
    }

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
        if(buttonIndex === 1) {
            const updateData = {
                ...memberState,
            }
            props.update(updateData)
        } else {
            props.delete(memberState._id)
        }
        clearInputValue('input[name="image"]')
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
                buttonTxt: 'メンバー情報更新',
                clickHandler: () => setIndex(1) 
            },
            {
                buttonTxt: '選択しているメンバーを削除',
                clickHandler: () => setIndex(2),
                buttonStyle: { bgColor: '#DB7093' as '#DB7093'}
            }
        ],
        baseButtonWrapperStyle: {margin: '30px 0 0'},
        baseButtonStyle
    }

    const createOptions = () => {
        const options = props.members.map(member => (
            {
                txt: member.name[0],
                props: {
                    value: member._id
                }
            }
        ))
        return options
    }

    const SelectsProps = {
        options: createOptions(),
        selectProps: {
            value: memberState._id,
            onChange: selectChangeHanlder
        },
        selectStyle: {
            width: '320px',
            padding: '10px',
            font_size: '1.4rem' as '1.4rem',
            border: '3px solid #dddfe2',
        },
        wrapperStyle: {
            margin: '0 0 20px'
        }
    }

    const Imgsrc = memberState.image ? memberState.image : defaultImage
    return(
        <Wrapper styled={{...wrapperStyle}}>
            <Selects {...SelectsProps} />
            <Img src={Imgsrc} styled={{width: '320px'}}/>
            <form onSubmit={(e) => submitHandler(e)} >
                <InputSections {...InputSectionsProps} />
                <Buttons {...ButtonsProps} />
            </form>
            <Wrapper styled={{margin: '30px 0 0'}}>
                <Link to={"/admin/upload"}><Button styled={{...baseButtonStyle, bgColor: '#42b72a' as '#42b72a'}}>メンバー追加ページへ</Button></Link>
            </Wrapper>
        </Wrapper>
    )
}

export default UpdateForm