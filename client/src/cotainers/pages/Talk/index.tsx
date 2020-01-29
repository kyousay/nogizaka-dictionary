import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as loginAction from '../../../actions/login/loginActions'
import * as talkAction from '../../../actions/talk/talkActions'
import {State} from '../../../reducers/index'
import Talk from '../../../components/Pages/Talk'
import { TalkRoomState } from '../../../reducers/talkReducer'

const mapStateToProps = (state: State) => ({
    user: state.user,
    talk: state.talk
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    isStorageToken: (isToken : {isLogin: boolean}) => {
        dispatch(loginAction.changeUserIsLogin(isToken))
    },
    getAllTalkRooms: () => {
        dispatch(talkAction.getAllTalkRooms())
    },
    setTalkRooms: (rooms: TalkRoomState[]) => {
        dispatch(talkAction.setTalkRooms(rooms))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Talk)