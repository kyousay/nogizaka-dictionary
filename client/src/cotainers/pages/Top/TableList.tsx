import { connect } from 'react-redux'
import TableList from '../../../components/Organisms/Table/TableList'
import * as userAction from '../../../actions/user/userActions'
import { State } from '../../../reducers'
import { Dispatch } from 'redux';

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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableList)