import { connect } from 'react-redux'
import { userState } from '../reducers/userReducer'
import App from '../components/App'

const mapStateToProps = ({user} : {user:userState}) => ({
    user
})

export default connect(mapStateToProps, {})(App)