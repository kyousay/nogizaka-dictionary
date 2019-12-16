import React,{ useState } from 'react'
import SearchPanel from '../../Molecules/Header/SerchPanel'
import Wrapper from '../../Atoms/Wrapper'
import Img from '../../Atoms/Img'
import {Paragragh} from '../../Atoms/Paragragh'
import logo from '../../../style/img/logo.jpg'
import icon from '../../../style/img/user_icon.png'
import {StateValue} from '../../../reducers'


const TopHeader: React.FC<StateValue> = (props) => {
    const [searchWord , changeSearchWord] = useState('')
    const userName = props.nickName? props.nickName : '新参者'

    return(
        <Wrapper styled={{display:'flex', align_items:"center", justify_content:"space-between", bgColor:'#fff', padding: '0px 20px'}}>
            <Img src={logo} styled={{width:"300px"}}/>
            <Wrapper styled={{display: 'flex', justify_content: 'space-between', min_width: '420px'}}>
                <SearchPanel value={searchWord} changeHandler={(e : React.ChangeEvent<HTMLInputElement>) => changeSearchWord(e.target.value)}/>
                <Wrapper styled={{margin:'0 0 0 20px',display: 'flex', align_items: 'center', flex_direction: 'column'}}>
                    <Img src={icon} styled={{width: '50px'}} />
                    <Paragragh styled={{font_size: '1.2rem'}}>{userName}</Paragragh>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default TopHeader