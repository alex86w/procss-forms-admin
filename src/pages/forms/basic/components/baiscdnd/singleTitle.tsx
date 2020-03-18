import ContentBase, { ContentBaseProps } from "./contentItemBase"
import React from 'react'
import { Input } from 'antd'

interface SingleTitleProps extends ContentBaseProps {

}

const SingleTitle: React.FC<SingleTitleProps> = (props) => {
    const { title } = props
    return <ContentBase {...props} >
        <span>{title}</span>
        <Input />
    </ContentBase>
}

export default SingleTitle