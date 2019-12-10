import React from 'react'
// import styled from 'styled-components'

//作成途中
//使用禁止


interface HeadingProps {
    [k : string] : any
}

//extendするためのbaseスタイル

const HeadingPresenter: React.FC<HeadingProps> = ({
    tag: Tag,
    children,
    ...props
}) => {
    console.log(Tag);
    return <Tag {...props}>{children}</Tag>
}

const HeadingContainer: React.FC<HeadingProps> = ({
    presenter,
    level,
    children,
    ...props
}) => {
    //levelが4以上、１未満にならないようにするための記述
    level = Math.max(1, Math.min(4, level));
    const tag = `Heading${level}`
    return presenter({tag, children, ...props})
}

const Heading: React.FC<HeadingProps> = props => (
    <HeadingContainer 
        presenter={(presenterProps : HeadingProps) => <HeadingPresenter {...presenterProps} />} 
    {...props} />
)

export default Heading;