import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AdminForm, {MemberState} from '../../../components/Organisms/Form/AdminForm'
import {userState} from '../../../reducers/userReducer'
import * as Action from '../../../actions/members/membersActions'

const mapStateToProps = ({user}: {user:userState}) => ({
    ...user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    upload: (member: MemberState) => {
        dispatch(Action.addMembers(member))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm)