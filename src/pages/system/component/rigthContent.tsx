import { Dropdown, Menu, Button, Modal, Input, notification } from 'antd';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { history, useDispatch } from 'umi';
import { post } from '@/utils/request';

export const RightContent = function () {
    const [visible, $visible] = useState(false);
    const reset = () => $visible(false);
    const show = () => $visible(true);
    let current;
    try {
        current = JSON.parse(localStorage.getItem('user') as string) || {}
    } catch (error) {
        current = {}
    }

    return (
        <>
            <Dropdown trigger={["click"]} overlay={
                <Menu>
                    <Menu.Item onClick={show}>
                        <div style={{ width: "120px", color: '#000', userSelect: "none", cursor: "pointer", textAlign: 'center' }}><a style={{ margin: '8px auto', color: '#000000' }}
                        >修改密码</a></div>
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        localStorage.clear();
                        history.replace('/user/login?logout')
                    }}>
                        <div style={{ width: "120px", color: '#000', userSelect: "none", cursor: "pointer", textAlign: 'center' }}><a style={{ margin: '8px auto', color: '#000000' }}
                        >退出登陆</a></div>
                    </Menu.Item>

                </Menu>
            } >
                <div style={{ display: 'inline', margin: 'auto 20px', userSelect: "none", cursor: "pointer", color: '#fff' }} ><UserOutlined /> {current.name} </div>
            </Dropdown>
            <LoginModal visible={visible} onCancel={reset} />
        </>)
}


const LoginModal = function (props: any) {
    const [oldPwd, $oldPwd] = useState<string>('');
    const [newPwd, $newPwd] = useState<string>('');
    return <Modal
        title="修改密码"
        onOk={async () => {
            const response: any = await post(`/api/user/updatePwd`, { oldPwd, newPwd });
            if (response.success) {
                props.onCancel && props.onCancel()
                localStorage.clear();
                history.replace('/user/login?logout')
                notification.success({ message: '修改成功,请重新登陆！' })
            } else {
                notification.error({ message: response.message || '操作失败' })
            }

        }}
        {...props}>
        <span><label>旧密码</label><Input value={oldPwd} onChange={(e) => $oldPwd(e.target.value)} type="password" /></span>
        <span><label>新密码</label><Input value={newPwd} onChange={(e) => $newPwd(e.target.value)} type="password" /></span>
    </Modal>
}