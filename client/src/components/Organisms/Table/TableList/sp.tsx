import React, { useState } from 'react'
import MembersCard from '../../../Molecules/MembersCard'
import ZoomCard from '../../../Molecules/zoomCard'
import Wrapper from '../../../Atoms/Wrapper'
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
    storageMembers: (members: {members:membersState}) => void
}

const buttonStyle = {
    font_size: '1.4rem' as '1.4rem',
    font_weight: 'bold' as 'bold',
    color: '#fff',
    padding: '20px 0',
    width: '80vw',
    bgColor: '#812990' as '#812990',
}

const TableSpList: React.FC<Props> = (props) => {

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
        setZoom(zoom)
    }

    const [zoomProps, setZoomProps] = useState({
        src: grayHeart,
        favorite: false,
    })

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
        }
        setZoomProps({
            src: newFavoriteState ? Heart : grayHeart,
            favorite: newFavoriteState
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
                        }}/> 
                    : 
                    
                        null
            }
            <Wrapper styled={{margin: '60px 0 30px', display: 'flex', justify_content: 'center'}}>
                <Link to={"/talk"}><Button styled={{...buttonStyle}}>トークルームへ</Button></Link>
            </Wrapper>
            {   <UnOrderdList as="ul" styled={{display:'flex', justify_content: "center", flex_wrap: "wrap"}}>
                    {members.map((member,index) => {
                        const isFavorite = checkFavoriteId(member._id)
                        const src = isFavorite? Heart : grayHeart
                        return(
                            <ListItem key={index} onClick={() => {setState(member);setZoom(true);setZoomProps({favorite: isFavorite, src: src})}} styled={{display: 'inline-block'}}>
                                <MembersCard {...{member, user: props.user}} favoriteImage={src} iconClickHandler={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => iconClickHandler(event, member._id, isFavorite)}/>
                            </ListItem>
                        )})
                    }
                </UnOrderdList>
            }
        </>
    )
}

export default TableSpList