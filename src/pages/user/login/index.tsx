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
          <h3 className="header" style={{fontSize:32}}><img src={require('../../../asserts/img/logo.png')} style={{width:100,height:100}}/> 攀枝花市花城外国语智慧校</h3>
          <div>
            <span className="title">管理系统后台</span>
          </div>
          <Form form={form} className="form">
            <Form.Item name="account">
              <Input type="user" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="pwd" style={{ marginTop: 20 }}>
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item style={{ marginTop: 20 }}>
              <Button
                type="primary"
                onClick={() =>
                  form
                    .validateFields()
                    .then(value =>
                      dispatch({ type: 'user/login', payload: value }),
                    )
                    .catch(err =>console.log(err))
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
