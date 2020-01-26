import React from 'react'
import logo from '../../../../style/img/logo.jpg'
import Img ,{withSPStyle} from '../../../Atoms/Img'
import Wrapper from '../../../Atoms/Wrapper'

const ImgWidthSP = withSPStyle(Img, {width: '45vw'})

const LoginHeader : React.FC = () => {
    return(
        <Wrapper styled={{bgColor: '#fff'}}>
            <Wrapper styled={{max_width: '960px', margin: '0 auto'}}>
                <ImgWidthSP src={logo} styled={{width: '300px'}}/>
            </Wrapper>
        </Wrapper>
    )
}

export default LoginHeader