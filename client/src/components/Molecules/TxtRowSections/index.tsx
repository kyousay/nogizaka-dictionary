import React from 'react'
import TxtRow, {Props as TxtRowProps} from '../TxtRow'

export interface Props {
    sections: TxtRowProps[]
}

const TxtRowSections : React.FC<Props> = (props) => (
    <React.Fragment>
        {
            props.sections.map((section, index) => (
                <TxtRow key={index} title={section.title} content={section.content}  wrapperStyle={section.wrapperStyle}
                titleWrapperStyle={section.titleWrapperStyle} titleStyle={section.titleStyle} contentStyle={section.contentStyle} contentWrapperStyle={section.contentWrapperStyle}/>
            ))
        }
    </React.Fragment>
)

export default TxtRowSections