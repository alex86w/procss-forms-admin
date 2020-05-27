import React, { useEffect } from 'react';
import { Form, Input, Switch } from 'antd';

const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
}



const RoleForm = function (props: any) {


    return <Form layout="inline" form={props.form} initialValues={props.record}>
        <Form.Item label="角色名" name="name" {...formLayout} style={{ width: '80%' }}>
            <Input />
        </Form.Item>
        <Form.Item label="是否需签到" name="signAbel" {...formLayout} style={{ width: '80%' }} valuePropName="checked">
            <Switch />
        </Form.Item>
        <Form.Item label="可盘点角色" name="checkAbel" {...formLayout} style={{ width: '80%' }} valuePropName="checked">
            <Switch />
        </Form.Item>
        <Form.Item label="描述" name="description" {...formLayout} style={{ width: '80%', marginTop: 10 }}>
            <Input />
        </Form.Item>
    </Form>

}


export default RoleForm;
