import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as talkAction from '../../../actions/talk/talkActions'
import { TalkState, chatState } from '../../../reducers/talkReducer'
import Chat from '../../../components/Pages/Chat'

const mapStateToProps = ({talk}: {talk:TalkState}) => ({
    talk
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setChat: (data: chatState[]) => {
        dispatch(talkAction.setChat(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)