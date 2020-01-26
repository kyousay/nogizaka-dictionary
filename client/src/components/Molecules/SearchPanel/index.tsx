import React from 'react'
import Wrapper from '../../Atoms/Wrapper'
import Input from '../../Atoms/Input'
import Button from '../../Atoms/Button'

const inputStyle = {
    width: "200px",
    font_size: "1.4rem" as "1.4rem",
    border_radius: "5px",
    border: "none",
    padding: "10px 20px",
    bgColor: "#FFEEFF",
}

interface Props {
    value: string
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    clickHandler?: () => void
}

const SearchPanel: React.FC<Props> = (props) => (
    <Wrapper styled={{display:'flex', align_items:"center",justify_content:"space-between"}}>
        <Wrapper styled={{margin: '0 20px 0 0'}}>
            <Input styled={{...inputStyle}} type="text" placeholder="フリーワード" value={props.value} onChange={props.changeHandler}/>
        </Wrapper>
        <Button styled={{margin: "0 0 0 12px", padding: "10px 20px", bgColor: "#812990"}} onClick={props.clickHandler}>検索</Button>
    </Wrapper>
)

export default SearchPanel