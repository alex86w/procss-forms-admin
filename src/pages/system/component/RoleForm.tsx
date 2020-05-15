import React, { } from 'react';
import { Form, Input } from 'antd';

const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
}



const RoleForm = function (props: any) {

    return <Form layout="inline" form={props.form} initialValues={props.record}>
        <Form.Item label="角色名" name="name" {...formLayout} style={{ width: '80%' }}>
            <Input />
        </Form.Item>
        <Form.Item label="描述" name="description" {...formLayout} style={{ width: '80%', marginTop: 10 }}>
            <Input />
        </Form.Item>
    </Form>

}


export default RoleForm;