import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { State } from '../../../../reducers'
import { userProfile } from '../../../../components/Organisms/Header/TopHeader/sp'
import { initialState } from '../../../../reducers/userReducer'
import * as loginAction from '../../../../actions/login/loginActions'
import * as userAction from '../../../../actions/user/userActions'
import * as searchAction from '../../../../actions/search/searchActions'
import TopSpHeader from '../../../../components/Organisms/Header/TopHeader/sp'

const mapStateToProps = ({user} : State) => ({
        ...user   
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    upDate: (data: userProfile) => {
        dispatch(userAction.upDateUserData(data))
    },
    searchWord: (word: string) => {
        dispatch(searchAction.searchWord(word))
    },
    logout: () => {
        dispatch(loginAction.setUserData(initialState))
    },
    search: (url: string) => {
        dispatch(searchAction.searchSelect(url))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopSpHeader)