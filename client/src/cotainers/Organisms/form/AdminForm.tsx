import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AdminForm, {MemberState} from '../../../components/Organisms/Form/AdminForm'
import * as Action from '../../../actions/members/membersActions'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    upload: (member: MemberState) => {
        dispatch(Action.addMembers(member))
    }
})

export default connect(undefined, mapDispatchToProps)(AdminForm)