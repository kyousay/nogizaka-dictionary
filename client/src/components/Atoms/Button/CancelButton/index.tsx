import {ButtonFactory} from '../index'
import * as utilStyle from '../../../../util/styles'

const CancelStyle = {
    bgColor: utilStyle.color.white,
    color: '#0000000', 
    border: '1px solid #000000'
}

const CancelButton = ButtonFactory(CancelStyle)

export default CancelButton