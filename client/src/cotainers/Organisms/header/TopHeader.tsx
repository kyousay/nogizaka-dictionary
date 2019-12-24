import { connect } from 'react-redux'
import { State } from '../../../reducers'
import TopHeader from '../../../components/Organisms/Header/TopHeader'

const mapStateToProps = ({user} : State) => {
    return {
        ...user   
    }
}

export default connect(mapStateToProps, {})(TopHeader)