import { Dropdown, Menu, Button } from 'antd';
import React, { } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { history } from 'umi';

export const RightContent = function () {
    let current;
    try {
        current = JSON.parse(sessionStorage.getItem('user') as string) || {}
    } catch (error) {
        current = {}
        console.log(error)
    }


    return (
        <Dropdown trigger={["click"]} overlay={
            <Menu>
                <Menu.Item onClick={() => {
                    sessionStorage.clear();
                    history.replace('/user/login?logout')
                }}>
                    <div style={{ width: "120px", color: '#000', userSelect: "none", cursor: "pointer", textAlign: 'center' }}><a style={{ margin: '8px auto', color: '#000000' }}
                    >退出登陆</a></div>
                </Menu.Item>
            </Menu>
        } >
            <div style={{ display: 'inline', margin: 'auto 20px', userSelect: "none", cursor: "pointer" }} ><UserOutlined /> {current.name} </div>
        </Dropdown>)
}