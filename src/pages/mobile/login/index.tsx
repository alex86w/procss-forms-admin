import React, { Component } from 'react';
import styles from './style.less';
import { Form, Button, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';


export default class Login extends Component {
    render() {
        return (
            <div className={styles.containor}>
                <div className={styles.topContainor}>
                    <div className={styles.topTitle}>登录</div>
                    <div className={styles.topContent}>欢迎使用信息采集系统</div>
                </div>
                <div className={styles.content}>
                    <Form >
                        <Form.Item name='account' rules={[{ required: true, message: '请输入账号' }]}>
                            <Input prefix={<UserOutlined />} placeholder="请输入账号" />
                        </Form.Item>
                        <Form.Item name='pwd' rules={[{ required: true, message: '请输入密码' }]} style={{ marginTop: 25 }}>
                            <Input.Password prefix={<UnlockOutlined />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: '100%', marginTop: 25, borderRadius: 20 }} type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        )
    }
}
