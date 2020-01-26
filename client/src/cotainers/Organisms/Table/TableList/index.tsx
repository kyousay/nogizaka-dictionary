import { connect } from 'react-redux'
import TableList from '../../../../components/Organisms/Table/TableList'
import * as userAction from '../../../../actions/user/userActions'
import * as searchAction from '../../../../actions/search/searchActions'
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
    search: (url: string) => {
        dispatch(searchAction.searchSelect(url))
    },
    storageMembers: (members: {members: membersState}) => {
        dispatch(memberAction.storageMembers(members))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableList)