import React, { Dispatch, useEffect, useState } from 'react';
import { Spin, Form, Input, Button, TreeSelect } from 'antd';
import styles from '../login/style.less'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { connect, history } from 'umi';
import { get, post } from '@/utils/request';
import { Toast } from 'antd-mobile';

function Register({ dispatch, loading }: { dispatch: Dispatch<any>, loading: boolean }) {
    const [roles, $roles] = useState<any[]>([]);
    const [depts, $depts] = useState<any[]>([]);
    const onFinish = (values: any) => {
        register(values)
    }
    async function getRegisterExtraParams(params: string) {
        const response: any = await get(`/api/user/toRegister/${params}`);
        if (response.success) {
            $roles(response.data.roleTree)
            $depts(response.data.deptTree)
        } else {
            Toast.fail(response.message, .5)
        }
    }
    async function register(params: any) {
        const response: any = await post(`/api/user/register/`, params);
        if (response.success) {
            Toast.success('注册成功', .5);
            history.goBack()
        } else {
            Toast.fail(response.message, 1)
        }
    }
    useEffect(() => {
        // const reg = new RegExp("[^\?&]?" + encodeURI(`rootDeptId`) + "=[^&]+");
        // const arr = location.search.match(reg);
        // if (arr != null) {
        //     const rootDeptId = decodeURI(arr[0].substring(arr[0].search("=") + 1));
        //     getRegisterExtraParams(rootDeptId);
        // }
        //@DEV
        getRegisterExtraParams(`88ea5374-e1cd-45f0-93fa-08809aea2b14`);
    }, [])


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
                    <Form.Item name="name" rules={[{ required: true, message: '请输入昵称' }]} >
                        <Input prefix={<UserOutlined />} placeholder="请输入昵称" />
                    </Form.Item>
                    <Form.Item name="roleId">
                        <TreeSelect treeData={roles} placeholder="请选择注册角色" />
                    </Form.Item>
                    <Form.Item name="deptId">
                        <TreeSelect treeData={[depts]} placeholder="请选择注册部门" />
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