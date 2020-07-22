import React, { Component, Dispatch } from 'react';
import styles from './style.less';
import { Form, Button, Input, Spin } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';


class Login extends Component<{ dispatch: Dispatch<any> }> {
    onFinish = (values: any) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/login',
            payload: { ...values, platform: 'mobile' }
        })
    }

    render() {
        //@ts-ignore
        const { loading = false } = this.props
        return (
            <div className={styles.containor}>
                <div className={styles.topContainor}>
                    <div className={styles.topTitle}>登录</div>
                    <div className={styles.topContent}>攀枝花市花城外国语智慧校园管理系统</div>
                </div>
                <div className={styles.content}>
                    <Spin spinning={loading}>
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
                        <Button type="link" onClick={() => history.push(`/mobile/register${location.search}`)}>注册账号？</Button>
                    </Spin>
                </div>
            </div>
        )
    }
}

const mapState = (state: any) => {
    return {
        loading: state.loading.models.user
    }
}

export default connect(mapState)(Login);
