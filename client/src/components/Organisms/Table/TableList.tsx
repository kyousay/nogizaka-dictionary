import React, { useState } from 'react'
import MembersCard from '../../Molecules/MembersCard'
import ZoomCard from '../../Molecules/ZoomCard'
import Wrapper from '../../Atoms/Wrapper'
import { StateValue as Props} from '../../../reducers'
import { membersState } from '../../../reducers/MembersReducer'

const UnOrderdList = Wrapper.withComponent('ul')

const ListTable: React.FC<Props> = (props) => {

    const [ zoom, setZoom ] = useState(false)

    //any型になってしまっている
    const [ state , setState ] = useState()

    const members : membersState = props.members
    
    const zoomOutHandler = (zoom: boolean) => {
        const newZoom = zoom ? false : true
        setZoom(newZoom)
    }

    let element
    if(members.length > 0){
        element = <UnOrderdList styled={{justify: "center", wrap: "wrap", max_width: '830px', margin: '60px auto 0 auto' }}>
                            {members.map((member,index) => {
                                return(
                                    <li key={index} onClick={() => {setState(member);setZoom(true)}}>
                                        <MembersCard {...member}/>
                                    </li>
                                )
                            })}
                    </UnOrderdList>
    }
    return (
        <>
            { zoom ? <ZoomCard zoomOutHandler={zoomOutHandler} {...state}/> : null}
            { element ? element : null}
        </>
    )
}

export default ListTable