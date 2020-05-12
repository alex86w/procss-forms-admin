import React, { Dispatch } from 'react';
import { Spin, Form, Input, Button } from 'antd';
import styles from '../login/style.less'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { connect, history } from 'umi';

function Register({ dispatch, loading }: { dispatch: Dispatch<any>, loading: boolean }) {
    const onFinish = (values: any) => {
        dispatch({
            type: 'user/login',
            payload: { ...values, platform: 'mobile' },
            callback: (success: boolean) => success && history.goBack()
        })
    }

    //@ts-ignore

    return (
        <div className={styles.containor}>
            <div className={styles.topContainor}>
                <div className={styles.topTitle}>注册</div>
                <div className={styles.topContent}>欢迎使用信息采集系统</div>
            </div>
            <div className={styles.content}>
                <Form onFinish={onFinish} >
                    <Form.Item name='account' rules={[{ required: true, message: '请输入账号' }]}>
                        <Input prefix={<UserOutlined />} placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item name='pwd' rules={[{ required: true, message: '请输入密码' }]} style={{ marginTop: 25 }}>
                        <Input.Password prefix={<UnlockOutlined />} placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ width: '100%', marginTop: 25, borderRadius: 20 }} type="primary" htmlType="submit" loading={loading}>
                            注册
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default connect(({ loading }: any) => ({ loading: loading.models.user }))(Register)