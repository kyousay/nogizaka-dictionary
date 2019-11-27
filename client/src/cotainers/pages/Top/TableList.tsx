import { connect } from 'react-redux'
import TableList from '../../../components/parts/Table/TableList'
import { State } from '../../../reducers'

const mapStateToProps = (state : State)  =>  ({
    ...state.members,
    ...state.user
})

export default connect(mapStateToProps, {})(TableList)