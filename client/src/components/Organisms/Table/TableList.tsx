import React, { useState } from 'react'
import Card from '../../Molecules/card/Card'
import ZoomCard from '../../Molecules/card/ZoomCard'
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

    // useEffect(() => {
    //     props.getMembers()
    // },[])

    let element
    if(members.length > 0){
        element = <UnOrderdList styled={{justify: "center", wrap: "wrap", padding: '60px 200px'}}>
                            {members.map((member,index) => {
                                return(
                                    <li key={index} onClick={() => {setState(member);setZoom(true)}}>
                                        <Card {...member}/>
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