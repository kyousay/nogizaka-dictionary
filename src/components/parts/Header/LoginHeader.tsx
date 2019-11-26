import React from 'react'
import styled from 'styled-components'
import logo from '../../../style/img/logo.jpg'

const FlexHeader = styled.div`
    height: 100px;
    max-width: 960px;
    margin: 0 auto;
`

const Image = styled.img`
    width: 300px
`

const Box = styled.div`
    background-color: #fff
`

const LoginHeader = () => {
    return(
        <Box>
            <FlexHeader>
                <Image src={logo} />
            </FlexHeader>
        </Box>
    )
}

export default LoginHeader