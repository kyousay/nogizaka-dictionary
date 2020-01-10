import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as Action from '../../../actions/login/loginActions'
import {State} from '../../../reducers/index'
import Admin from '../../../components/Pages/Admin'

const mapStateToProps = (state: State) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    isStorageToken: (isToken : {isLogin: boolean}) => {
        dispatch(Action.changeUserIsLogin(isToken))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)