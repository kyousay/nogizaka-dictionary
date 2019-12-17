import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import TxtRowSection from '../Card/TxtRowSection'

interface Props {
    nickName: string
}

const BalloonCard : React.FC<Props> = (props) => (
    <Wrapper styled={{padding: '24px'}}>
        <TxtRowSection width={'96px'} titleSize={'1.2rem'} subSize={'1.4rem'} margin={'24px 0 0 0'}
        title={'ニックネーム'} content={props.nickName} />
    </Wrapper>
)