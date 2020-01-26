import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'

const HashBox = styled(Wrapper)`
    border-radius: 3px
`

interface Props {
    hash: string[]
    segment: string
}

const Hash : React.FC<Props> = props => {
    const segmentArray = new Array(props.segment)
    const hashArray = segmentArray.concat(props.hash)
    return(
        <>
        {
            hashArray.map((hash,index)=> {
                return(
                    <HashBox styled={{padding: '10px', margin: '0 4px 5px 0', bgColor: '#bf87c1', display:'inline-block', border_radius: '3px'}} key={index}>
                        <Txt styled={{color: '#fff', font_weight: 'bold'}}>{hash}</Txt>
                    </HashBox>
                )
        })}
        </>
    )
}

export default Hash