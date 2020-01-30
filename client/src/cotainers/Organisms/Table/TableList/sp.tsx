import { connect } from 'react-redux'
import TableSpList from '../../../../components/Organisms/Table/TableList/sp'
import * as userAction from '../../../../actions/user/userActions'
import * as memberAction from '../../../../actions/members/membersActions'
import { State } from '../../../../reducers'
import { Dispatch } from 'redux';
import { membersState } from '../../../../reducers/membersReducer';

const mapStateToProps = (state : State)  =>  ({
    ...state.members,
    user: state.user
})

const mapDispatchToProps = (dispatch : Dispatch) => ({
    favorite: (id: string) => {
        dispatch(userAction.favoriteMember(id))
    },
    unfavorite: (id: string) => {
        dispatch(userAction.unfavoriteMember(id))
    },
    storageMembers: (members: {members: membersState}) => {
        dispatch(memberAction.storageMembers(members))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableSpList)