import { connect } from 'react-redux'
import * as talkAction from '../../../../actions/talk/talkActions'
import TalkRoomList from '../../../../components/Organisms/Table/TalkRoomlist'
import { State } from '../../../../reducers'
import { Dispatch } from 'redux'

const mapStateToProps = (state : State)  =>  ({
    talk: state.talk
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getTalkRoom: (roomParam: talkAction.RoomParam) => {
        dispatch(talkAction.getTalkRoom(roomParam))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TalkRoomList)