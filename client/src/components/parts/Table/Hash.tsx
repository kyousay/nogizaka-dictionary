import React from 'react'
import styled from 'styled-components'
import { Props } from './ZoomCard'

const HashBox = styled.span`
    padding: 10px;
    margin-right: 4px;
    margin-bottom: 5px;
    background-color: #bf87c1;
    color: #fff;
    border-radius: 3px;
    font-weight: bold;
`

const Hash : React.FC<Props> = props => {
    const segmentArray = new Array(props.segment + "期生")
    const hashArray = segmentArray.concat(props.hash)
    console.log(hashArray);
    return(
        <>
        {
            hashArray.map((hash,index)=> {
                return(
                    <HashBox key={index}>{hash}</HashBox>
                )
        })}
        </>
    )
}

export default Hash