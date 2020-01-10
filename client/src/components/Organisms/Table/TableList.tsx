import React, { useState } from 'react'
import MembersCard from '../../Molecules/MembersCard'
import ZoomCard from '../../Molecules/ZoomCard'
import Wrapper from '../../Atoms/Wrapper'
import Selects from '../../Molecules/Selects'
import { Member, membersState } from '../../../reducers/membersReducer'
import { userState } from '../../../reducers/userReducer';

const UnOrderdList = Wrapper.withComponent('ul')

const ListItem = Wrapper.withComponent('li')

interface Props {
    members: Member[]
    user: userState
}

const ListTable: React.FC<Props> = (props) => {
    console.log(props)

    const [ zoom, setZoom ] = useState(false)

    //any型になってしまっている
    const [ state , setState ] = useState<Member>({
        _id: '',
        image: '',
        name: ['',''],
        sailium: ['', ''],
        segment: '',
        dateOfBirth : '',
        blod: '',
        height: '',
        hash:['']
    })

    const members : membersState = props.members
    
    const zoomOutHandler = (zoom: boolean) => {
        const newZoom = zoom ? false : true
        setZoom(newZoom)
    }

    const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    }

    const SelectsProps = {
        options: [
            {
                txt: '全メンバー',
                props: {
                    value: 'members'
                }
            },
            {
                txt: '一期生',
                props: {
                    value: '/search?segment="1期生"'
                }
            },
            {
                txt: '二期生',
                props: {
                    value: '/search?segment="2期生"'
                }
            },
            {
                txt: '三期生',
                props: {
                    value: '/search?segment="3期生"'
                }
            },
            {
                txt: '四期生',
                props: {
                    value: '/search?segment="4期生"'
                }
            },
            {
                txt: '卒業生',
                props: {
                    value: '/search?segment="卒業生"'
                }
            },
            {
                txt: '推しメン',
                props: {
                    value: '/favorite'
                }
            }
        ],
        selectStyle: {
            padding: '10px 30px',
            font_size: '1.4rem' as '1.4rem',
            color: '#888888',
            appearance: 'none',
            bgColor: '#F9F9F9' as '#F9F9F9'
        },
        selectProps: {
            onChange: selectChangeHandler
        }
    }
    
    return (
        <React.Fragment>
            { zoom ? <ZoomCard zoomOutHandler={zoomOutHandler} zoom={zoom} member={state}/> : null}
            { <UnOrderdList styled={{justify_content: "center", flex_wrap: "wrap", max_width: '830px', padding: '60px 40px 60px 40px' }}>
                <Wrapper styled={{margin: '0 0 30px 20px'}}>
                    <Selects {...SelectsProps} />
                </Wrapper>
                {members.map((member,index) => {
                    return(
                        <ListItem key={index} onClick={() => {setState(member);setZoom(true)}} styled={{display: 'inline-block'}}>
                            <MembersCard {...{member, user: props.user}}/>
                        </ListItem>
                    )
                })}
            </UnOrderdList>}
        </React.Fragment>
    )
}

export default ListTable