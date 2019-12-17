import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as Action from '../../../actions/login/loginActions'
import { StateValue } from '../../../reducers'
import Login from '../../../components/Pages/Login'

const mapStateToProps = (state : StateValue) => ({
    ...state
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    isStorageToken: (isToken : {isLogin: boolean}) => {
        dispatch(Action.changeUserIsLogin(isToken))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)