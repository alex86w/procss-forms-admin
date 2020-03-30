import React, { Component, Dispatch } from 'react';
import styles from './style.less';
import { Form, Button, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { connect } from 'umi';


class Login extends Component<{ dispatch: Dispatch<any> }> {
    onFinish = (values: any) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/login',
            payload: { ...values, platform: 'mobile' }
        })

        
    }
    render() {
        console.log(navigator.platform)
        return (
            <div className={styles.containor}>
                <div className={styles.topContainor}>
                    <div className={styles.topTitle}>登录</div>
                    <div className={styles.topContent}>欢迎使用信息采集系统</div>
                </div>
                <div className={styles.content}>
                    <Form onFinish={this.onFinish}>
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

export default connect()(Login);
