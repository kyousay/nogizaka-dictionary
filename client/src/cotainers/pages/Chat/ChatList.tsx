import { connect } from 'react-redux'
import { TalkState } from '../../../reducers/talkReducer'
import ChatTable from '../../../components/Organisms/Table/ChatList'

const mapStateToProps = ({talk}: {talk:TalkState}) => ({
    room: talk.room
})

export default connect(mapStateToProps, {})(ChatTable)