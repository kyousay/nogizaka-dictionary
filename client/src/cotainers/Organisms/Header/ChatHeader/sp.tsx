import {connect} from 'react-redux'
import ChatSpHeader from '../../../../components/organisms/Header/ChatHeader/sp'
import * as talkAction from '../../../../actions/talk/talkActions'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeIsSetRoom: (isSetRoom: boolean) => {
        dispatch(talkAction.changeIsSetRoom(isSetRoom))
    }
})

export default connect(undefined, mapDispatchToProps)(ChatSpHeader)