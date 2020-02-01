import React, { useState } from 'react'
import MembersCard from '../../../Molecules/MembersCard'
import ZoomCard from '../../../Molecules/zoomCard'
import Wrapper from '../../../Atoms/Wrapper'
import Selects from '../../../Molecules/Selects'
import Button from '../../../Atoms/Button'
import { Member, membersState } from '../../../../reducers/membersReducer'
import { userState } from '../../../../reducers/userReducer'
import { Link } from 'react-router-dom'
import grayHeart from '../../../../style/img/grayHeart.svg'
import Heart from '../../../../style/img/Heart.svg'

const UnOrderdList = Wrapper.withComponent('ul')

const ListItem = Wrapper.withComponent('li')

interface Props {
    members: Member[]
    user: userState
    favorite: (id: string) => void
    unfavorite: (id: string) => void
    search: (url: string) => void
    storageMembers: (members: {members:membersState}) => void
}

const buttonStyle = {
    font_size: '1.4rem' as '1.4rem',
    font_weight: 'bold' as 'bold',
    color: '#fff',
    padding: '10px 30px',
    bgColor: '#812990' as '#812990',
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

    const [selectValue, setSelectValue] = useState('members')

    const members : membersState = props.members
    
    const zoomOutHandler = (zoom: boolean) => {
        setZoom(zoom)
    }

    const [zoomProps, setZoomProps] = useState({
        src: grayHeart,
        favorite: false,
        selectValue
    })

    const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(event.target.value);
        props.search(event.target.value);
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
                    value: 'segment=1期生'
                }
            },
            {
                txt: '二期生',
                props: {
                    value: 'segment=2期生'
                }
            },
            {
                txt: '三期生',
                props: {
                    value: 'segment=3期生'
                }
            },
            {
                txt: '四期生',
                props: {
                    value: 'segment=4期生'
                }
            },
            {
                txt: '卒業生',
                props: {
                    value: 'segment=卒業生'
                }
            },
            {
                txt: '推しメン',
                props: {
                    value: 'favorite'
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
            value: selectValue,
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
        if(newFavoriteState) {
            props.favorite(memberId)
        }else {
            props.unfavorite(memberId)
            if(selectValue === 'favorite') {
                const newMembers = [] as membersState;
                props.members.forEach(member => {
                    if(memberId !== member._id) {
                        newMembers.push(member)
                    }
                })
                props.storageMembers({members:newMembers})
            }
        }
        setZoomProps({
            src: newFavoriteState ? Heart : grayHeart,
            favorite: newFavoriteState,
            selectValue
        });
    }

    const iconClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, memberId: string, isFavorite: boolean) => {
        event.stopPropagation();
        changeFavoriteMember(memberId, isFavorite);
    }

    return (
        <>
            { zoom ? 
                        <ZoomCard zoomOutHandler={() => zoomOutHandler(false)} member={state} image={zoomProps.src}
                        iconClickHandler={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            iconClickHandler(event, state._id, zoomProps.favorite)
                            if(selectValue === 'favorite') {
                                zoomOutHandler(false)
                        }
                        }}/> 
                    : 
                    
                        null
            }
            <Wrapper styled={{margin: '60px 0 30px 60px', display: 'flex'}}>
                <Selects {...SelectsProps} />
                <Wrapper styled={{margin: '0 0 0 20px'}}>
                    <Link to={"/talk"}><Button styled={{...buttonStyle}}>トークルームへ</Button></Link>
                </Wrapper>
            </Wrapper>
            {   <UnOrderdList as="ul" styled={{display:'flex', justify_content: "center", flex_wrap: "wrap"}}>
                    {members.map((member,index) => {
                        const isFavorite = checkFavoriteId(member._id)
                        const src = isFavorite? Heart : grayHeart
                        return(
                            <ListItem key={index} onClick={() => {setState(member);setZoom(true);setZoomProps({favorite: isFavorite, src: src, selectValue})}} styled={{display: 'inline-block'}}>
                                <MembersCard {...{member, user: props.user}} favoriteImage={src} iconClickHandler={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => iconClickHandler(event, member._id, isFavorite)}/>
                            </ListItem>
                        )})
                    }
                </UnOrderdList>
            }
        </>
    )
}

export default ListTable