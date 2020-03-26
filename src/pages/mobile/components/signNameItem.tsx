import React, { useEffect } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { useModel, history } from 'umi'

interface Props {
    onChange?: (v: any) => void
    value?: any
}

function SignNameItem({ onChange, value }: Props) {
    const { signData } = useModel('signName');
    useEffect(() => {
        onChange && onChange(signData);
    }, [signData])
    return (
        <div onClick={() => history.push({ pathname: "/mobile/sign" })} >
            {signData ? <img className="sign-image" src={signData || ''} /> :
                <div style={{ padding: 20, width: 150, border: "solid 1px #d9d9d9" }}>
                    <EditOutlined /><span>添加签名</span>
                </div>
            }
        </div>
    )
}

export default SignNameItem
