import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as loginAction from '../../../actions/login/loginActions'
import * as talkAction from '../../../actions/talk/talkActions'
import {State} from '../../../reducers/index'
import Talk from '../../../components/Pages/Talk'

const mapStateToProps = (state: State) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    isStorageToken: (isToken : {isLogin: boolean}) => {
        dispatch(loginAction.changeUserIsLogin(isToken))
    },
    getAllTalkRooms: () => {
        dispatch(talkAction.getAllTalkRooms())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Talk)