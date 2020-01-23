import { connect } from 'react-redux'
import { TalkState } from '../../../reducers/talkReducer'
import Chat from '../../../components/Pages/Chat'

const mapStateToProps = ({talk}: {talk:TalkState}) => ({
    talk
})

export default connect(mapStateToProps, {})(Chat)