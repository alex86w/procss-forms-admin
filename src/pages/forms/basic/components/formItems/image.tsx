import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { Button } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'

const ImageForm = (props: ContentBaseProps) => {
    return (
        <ContentBase {...props}>
            <Button icon={<FileImageOutlined />} type='dashed'>请选择或拖拽上传图片，20M已内</Button>
        </ContentBase>
    )
}

export default ImageForm
