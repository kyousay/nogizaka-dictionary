import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as Action from '../../../actions/login/loginActions'
import * as MemberAction from '../../../actions/members/membersActions'
import { userState } from '../../../reducers/userReducer'
import Top from '../../../components/Pages/Top'

const mapStateToProps = ({user} : {user:userState}) => ({
    user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    isStorageToken: (isToken : {isLogin: boolean}) => {
        dispatch(Action.changeUserIsLogin(isToken))
    },
    getAllMembers: () => {
        dispatch(MemberAction.getAllMembers())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Top)