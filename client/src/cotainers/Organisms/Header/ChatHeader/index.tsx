import {connect} from 'react-redux'
import ChatHeader from '../../../../components/Organisms/Header/ChatHeader'
import * as talkAction from '../../../../actions/talk/talkActions'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeIsSetRoom: (isSetRoom: boolean) => {
        dispatch(talkAction.changeIsSetRoom(isSetRoom))
    }
})

export default connect(undefined, mapDispatchToProps)(ChatHeader)