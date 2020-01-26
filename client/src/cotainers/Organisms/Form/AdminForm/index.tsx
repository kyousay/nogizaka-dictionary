import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AdminForm, {MemberState} from '../../../../components/Organisms/Form/AdminForm'
import { MembersState } from '../../../../reducers/membersReducer'
import * as Action from '../../../../actions/members/membersActions'

const mapStateToProps = ({members}: {members: MembersState}) => ({
    members: members.members
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    upload: (member: MemberState) => {
        dispatch(Action.addMember(member))
    },
    getAllMembers: () => {
        dispatch(Action.getAllMembers())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm)