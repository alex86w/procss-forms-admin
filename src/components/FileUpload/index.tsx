import React, { useState } from 'react'
import { Upload, Button, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface Props {
    onChange: (value: any) => void
}

function FileUpload({ onChange }: Props) {
    const [loading, setLoading] = useState(false)
    const upProps = {
        name: 'file',
        action: '/api/file/add',
        // headers: {
        //     authorization: 'authorization-text',
        // },
        onChange({ file }: any) {
            if (!file.response) {
                setLoading(true)
            }
            if (file.response) {
                setLoading(false)
                if (file.response.success) {
                    notification.success({ message: '上传成功' })
                    onChange && onChange(file.response.message.id);
                } else {
                    notification.error({ message: file.response.message })
                }
            }
        },

    };
    return (
        <Upload showUploadList={false} {...upProps}>
            <Button loading={loading} type='dashed' style={{ width: '160px' }} size='small' ><UploadOutlined /> 选择上传</Button>
        </Upload>
    )
}

export default FileUpload
