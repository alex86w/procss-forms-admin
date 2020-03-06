import React from 'react';
import { Form, Input, Button } from 'antd';

import './login.less';
export default function Login() {
  const [form] = Form.useForm();

  return (
    <div className="main">
      <div className="login">
        <img className="logo" src={require('./jtinfo.jpg')} />
        <div>
          <span className="title">系统管理后台</span>
        </div>
        <Form form={form}>
          <Form.Item>
            <Input type="user" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
