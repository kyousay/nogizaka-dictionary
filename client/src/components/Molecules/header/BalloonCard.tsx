import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import TxtRowSection from '../Card/TxtRowSection'

interface Props {
    section: {
        [k:string]: string[]
    }
};

const BalloonCard : React.FC<Props> = (props) => (
    <Wrapper styled={{position: 'relative' ,padding: '20px'}}>
        <TxtRowSection  width={'96px'} padding={'20px'} titleSize={'1.2rem'} subSize={'1.4rem'}
        title={props.section.title[0]} content={props.section.text[0]} />
        <TxtRowSection width={'96px'} padding={'20px'} titleSize={'1.2rem'} subSize={'1.4rem'} 
        title={props.section.title[1]} content={props.section.text[1]} />
        <TxtRowSection width={'96px'} padding={'20px'} titleSize={'1.2rem'} subSize={'1.4rem'}
        title={props.section.title[2]} content={props.section.text[2]} />
    </Wrapper>
)

export default BalloonCard