import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { State } from '../../../reducers'
import { userProfile } from '../../../components/Organisms/Header/TopHeader'
import * as ActionCreater from '../../../actions/user/userActions'
import TopHeader from '../../../components/Organisms/Header/TopHeader'

const mapStateToProps = ({user} : State) => ({
        ...user   
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    upDate: (data: userProfile) => {
        dispatch(ActionCreater.upDateUserData(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)