import { connect } from 'react-redux'
import { TalkState } from '../../../../reducers/talkReducer'
import ChatTable from '../../../../components/Organisms/Table/ChatList'
import { userState } from '../../../../reducers/userReducer'

const mapStateToProps = ({talk, user}: {talk:TalkState, user: userState}) => ({
    room: talk.room,
    user: user 
})

export default connect(mapStateToProps, {})(ChatTable)