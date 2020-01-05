import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as Action from '../../../actions/login/loginActions'
import { userState } from '../../../reducers/userReducer'
import Admin from '../../../components/Pages/Admin'

const mapStateToProps = ({user} : {user:userState}) => ({
    user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    isStorageToken: (isToken : {isLogin: boolean}) => {
        dispatch(Action.changeUserIsLogin(isToken))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)