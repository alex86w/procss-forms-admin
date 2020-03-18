import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { Input } from 'antd'

const NumberText: React.FC<ContentBaseProps> = (props) => {

    return <ContentBase {...props}>
        <Input />
    </ContentBase>

}

export default NumberText