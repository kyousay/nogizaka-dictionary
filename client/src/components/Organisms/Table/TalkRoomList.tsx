import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Button from '../../Atoms/Button'
import TalkRoomCard from '../../../components/Molecules/TalkRoomCard'
import icon from '../../../style/img/lock_icon.svg'
import { TalkState, TalkRoomState } from '../../../reducers/talkReducer'
import { Link } from 'react-router-dom'
import { RoomParam } from '../../../actions/talk/talkActions'


const UnOrderdList = Wrapper.withComponent('ul')

const ListItem = Wrapper.withComponent('li')

const buttonStyle = {
    font_size: '1.4rem' as '1.4rem',
    font_weight: 'bold' as 'bold',
    color: '#fff',
    padding: '10px 30px',
    bgColor: '#812990' as '#812990',
}

interface Props {
    talk: TalkState
    getTalkRoom: (roomParam: RoomParam) => void
}

const TalkRoomList: React.FC<Props> = (props) => {
    const rooms  = props.talk.rooms
    
    const cardClickHandler = (data : TalkRoomState) => {
        const {_id, isRock} = data
        const roomParam = {
            _id,
            isRock
        }
        props.getTalkRoom(roomParam)
    }

    return (
        <React.Fragment>
            {   <UnOrderdList styled={{justify_content: "center", flex_wrap: "wrap", padding: '60px 40px 60px 40px' }}>
                    <Wrapper styled={{margin: '0 0 30px 15px'}}>
                        <Link to={"/top"}><Button styled={{...buttonStyle}}>トップページへ</Button></Link>
                    </Wrapper>
                    {rooms.map((room,index) => {
                        const iconImage = room.isRock ? icon : undefined
                        return(
                            <ListItem key={index} onClick={() => cardClickHandler(room)} styled={{display: 'inline-block'}}>
                                <TalkRoomCard {...{room, iconImage}}/>
                            </ListItem>
                        )})
                    }
                </UnOrderdList>
            }
        </React.Fragment>
    )
}

export default TalkRoomList