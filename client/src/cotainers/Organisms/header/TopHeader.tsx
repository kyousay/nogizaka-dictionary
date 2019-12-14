import { connect } from 'react-redux'
import { StateValue } from '../../../reducers/'
import TopHeader from '../../../components/Organisms/Header/TopHeader'

const mapStateToProps = (state : StateValue) => state

export default connect(mapStateToProps, {})(TopHeader)