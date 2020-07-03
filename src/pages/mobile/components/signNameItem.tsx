import React, { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { useModel, history, useLocation } from 'umi'
import Modal from 'antd/lib/modal/Modal'
import Sign from './sign'

interface Props {
    onChange?: (v: any) => void
    value?: any
}

function SignNameItem({ onChange, value }: Props) {

    const [visible, $visible] = useState(false);
    function saveAndClose(value: any) {
       console.log(value)
        onChange && onChange(value);
        $visible(false)
    }

    function close() {
        $visible(false)
    }

    return (
        <div onClick={() => $visible(true)} >
            {value && Array.isArray(value) ? <img className="sign-image" src={value[0].url} /> :
                <div style={{ padding: 20, width: 150, border: "solid 1px #d9d9d9" }}>
                    <EditOutlined /><span>添加签名</span>
                </div>
            }
            <Modal closable={false} style={{ marginTop: -100 }} footer={null} visible={visible} width="100%">
                <Sign {...{ saveAndClose, close }} />
            </Modal>
        </div>
    )
}

export default SignNameItem
