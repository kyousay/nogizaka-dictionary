import React, { useState } from 'react'
import MembersCard from '../../Molecules/MembersCard'
import ZoomCard from '../../Molecules/ZoomCard'
import Wrapper from '../../Atoms/Wrapper'
import Selects from '../../Molecules/Selects'
import { Member, membersState } from '../../../reducers/membersReducer'
import { userState } from '../../../reducers/userReducer';
import grayHeart from '../../../style/img/grayHeart.svg'
import Heart from '../../../style/img/Heart.svg'

const UnOrderdList = Wrapper.withComponent('ul')

const ListItem = Wrapper.withComponent('li')

interface Props {
    members: Member[]
    user: userState
    favorite: (id: string) => void
    unfavorite: (id: string) => void
}

const ListTable: React.FC<Props> = (props) => {

    const [ zoom, setZoom ] = useState(false)

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

    const checkFavoriteId = (memberId: string) => {
        const userFavoriteMembers = props.user.favoriteMembers
        let isFavorite = false;
        if(userFavoriteMembers.length > 0) {
            isFavorite = userFavoriteMembers.some((favoriteMemberId, index) => {
                return memberId === favoriteMemberId
            })
        }
        return isFavorite
    }

    const changeFavoriteMember = (memberId: string, isFavorite: boolean) => {
        const newFavoriteState = isFavorite ? false : true
        console.log(memberId)
        if(newFavoriteState) {
            props.favorite(memberId)
        }else {
            props.unfavorite(memberId)
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
                    const isFavorite = checkFavoriteId(member._id)
                    const src = isFavorite? Heart : grayHeart 
                    return(
                        <ListItem key={index} onClick={() => {setState(member);setZoom(true)}} styled={{display: 'inline-block'}}>
                            <MembersCard {...{member, user: props.user}} favoriteImage={src} imageClickHandler={changeFavoriteMember} status={isFavorite}/>
                        </ListItem>
                    )})
                }
            </UnOrderdList>}
        </React.Fragment>
    )
}

export default ListTable