import React, { useState } from 'react'
import Card from '../../Molecules/card/Card'
import ZoomCard from '../../Molecules/card/ZoomCard'
import { StateValue as Props} from '../../../reducers'
import styled from 'styled-components'
import { FlexBox } from '../../../style/commonStyle'

const ListFlexBox = styled(FlexBox)`
    padding: 60px 200px
`

const UnOrderdList = ListFlexBox.withComponent('ul')

const ListTable: React.FC<Props> = (props) => {
    console.log(props);
    const [ zoom, setZoom ] = useState(false)

    //any型になってしまっている
    const [ state , setState ] = useState()

    const{ members } = props

    const zoomOutHandler = (zoom: boolean) => {
        const newZoom = zoom ? false : true
        setZoom(newZoom)
    }

    // useEffect(() => {
    //     props.getMembers()
    // },[])

    let element
    if(members.length > 0){
        element = <UnOrderdList styled={{justify: "center",wrap: "wrap"}}>
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