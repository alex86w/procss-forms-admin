import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { DatePicker } from 'antd'

const InputDate: React.FC<ContentBaseProps> = (props) => {

    return <ContentBase {...props}>
        <DatePicker />
    </ContentBase>
}

export default InputDate;