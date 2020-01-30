import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Input from '../../Atoms/Input'
import Button from '../../Atoms/Button'
import Selects, {Props as SelectsProps} from '../Selects'

const inputStyle = {
    width: "100%",
    font_size: "1.4rem" as "1.4rem",
    border_radius: "5px",
    border: "none",
    padding: "15px 20px",
    bgColor: "#FFEEFF",
}

interface Props {
    value: string
    selectsProps?: SelectsProps
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    clickHandler?: () => void
}

const SearchCard: React.FC<Props> = (props) => (
    <Wrapper styled={{padding: '10px'}}>
        {
            props.selectsProps ?
                <Selects {...props.selectsProps}/>
            : null
        }
        <Wrapper styled={{margin: '0  0 0'}}>
            <Input styled={{...inputStyle}} type="text" placeholder="フリーワード" value={props.value} onChange={props.changeHandler}/>
        </Wrapper>
        <Wrapper styled={{margin: '30px 0 0 0'}}>
            <Button styled={{width: '100%', padding: '15px 0', bgColor: "#812990"}} onClick={props.clickHandler}>検索</Button>
        </Wrapper>
    </Wrapper>
)

export default SearchCard