import { connect } from 'react-redux'
import ChatSpForm from '../../../../components/Organisms/Form/ChatForm/sp'
import * as talkAction from '../../../../actions/talk/talkActions'
import { userState } from '../../../../reducers/userReducer'
import { TalkState, chatState} from '../../../../reducers/talkReducer'
import { Dispatch } from 'redux'

const mapStateToProps = ({user,talk} : { user: userState, talk: TalkState}) => ({
    user,
    room: talk.room
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setChat: (data: chatState[]) => {
        dispatch(talkAction.setChat(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatSpForm)