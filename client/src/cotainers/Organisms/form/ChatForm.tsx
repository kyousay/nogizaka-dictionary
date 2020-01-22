import { connect } from 'react-redux'
import ChatForm from '../../../components/Organisms/Form/ChatForm'
import { userState } from '../../../reducers/userReducer'
import { TalkState} from '../../../reducers/talkReducer'

const mapStateToProps = ({user,talk} : { user: userState, talk: TalkState}) => ({
    user,
    room: talk.room
})

export default connect(mapStateToProps, {})(ChatForm)