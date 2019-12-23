import React from 'react'
import TxtRow, {Style as TxtRowSectionStyle} from './TxtRow'

export interface Props {
    sections: {
        title: string
        content: string
    }[]
    TxtStyle: TxtRowSectionStyle
}

const TxtRowSections : React.FC<Props> = (props) => (
    <React.Fragment>
        {
            props.sections.map((elem, index) => (
                <TxtRow key={index} color={props.TxtStyle.color} width={props.TxtStyle.width} padding={props.TxtStyle.padding} 
                titleSize={props.TxtStyle.titleSize} subSize={props.TxtStyle.subSize} title={elem.title} content={elem.content}  />
            ))
        }
    </React.Fragment>
)

export default TxtRowSections