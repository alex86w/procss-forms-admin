import React, { ReactElement } from 'react';
import { Form, Input, Button } from 'antd';
import { connect, Dispatch } from 'dva';

import './login.less';

interface LoginProps {
  dispatch: Dispatch;
}

function Login(props: LoginProps): ReactElement {
  const [form] = Form.useForm();
  const { dispatch } = props;

  return (
    <div className="main">
      <div className="login">
        <img className="logo" src={require('./jtinfo.jpg')} />
        <div>
          <span className="title">系统管理后台</span>
        </div>
        <Form form={form}>
          <Form.Item name="userName">
            <Input type="user" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="pwd">
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() =>
                form
                  .validateFields()
                  .then(value =>
                    dispatch({ type: 'user/login', payload: value }),
                  )
                  .catch(err => console.log(err))
              }
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default connect()(Login);
