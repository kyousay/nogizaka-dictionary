import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import UpdateForm from '../../../components/Organisms/Form/UpdateForm'
import {membersState} from '../../../reducers/membersReducer'
import * as Action from '../../../actions/members/membersActions'

const mapStateToProps = ({members}: {members:membersState}) => ({
    ...members
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllMembers: () => {
        dispatch(Action.getAllMembers())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm)