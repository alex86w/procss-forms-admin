import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase';
import { EditOutlined } from '@ant-design/icons';

const SignName = (props: ContentBaseProps) => {
    return (
        <ContentBase {...props}>
            <div style={{ padding: 20, width: 150, border: "solid 1px #d9d9d9" }}>
                <EditOutlined /><span>添加签名</span>
            </div>
        </ContentBase>
    )
}

export default SignName;
