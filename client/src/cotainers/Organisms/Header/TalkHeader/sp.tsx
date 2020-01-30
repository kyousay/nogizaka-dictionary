import { connect } from 'react-redux'
import TalkSpHeader, {RoomState} from '../../../../components/Organisms/Header/TalkHeader/sp'
import { Dispatch } from 'redux'
import * as loginAction from '../../../../actions/login/loginActions'
import * as talkAction from '../../../../actions/talk/talkActions'
import { initialState, userState } from '../../../../reducers/userReducer'

const mapStateToProps = (user : {user: userState}) => ({
    ...user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => {
        dispatch(loginAction.setUserData(initialState));
    },
    createRoom: (data : RoomState) => {
        dispatch(talkAction.createTalkRoom(data)) 
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TalkSpHeader)