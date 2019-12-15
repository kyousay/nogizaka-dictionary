import React from 'react'
import styled from 'styled-components'
import Wrapper from '../../Atoms/Wrapper'
import Txt from '../../Atoms/Txt'

const HashTxt = styled(Txt)`
    border-radius: 3px;
`

interface Props {
    hash: string[]
    segment: string
}

const Hash : React.FC<Props> = props => {
    const segmentArray = new Array(props.segment + "期生")
    const hashArray = segmentArray.concat(props.hash)
    return(
        <>
        {
            hashArray.map((hash,index)=> {
                return(
                    <Wrapper styled={{padding: '10px', margin: '0 4px 5px 0', bgColor: '#bf87c1'}} key={index}>
                        <HashTxt styled={{color: '#fff', font_weight: 'bold'}}>{hash}</HashTxt>
                    </Wrapper>
                )
        })}
        </>
    )
}

export default Hash