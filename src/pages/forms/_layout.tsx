//@ts-nocheck
import React, { useEffect } from 'react';
import { Layout, Menu, Button, Radio } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './index.css';
import { RadioChangeEvent } from 'antd/lib/radio';
import { history, useHistory, useModel } from 'umi';
const { Header } = Layout;
export default (props: any) => {
  const { location } = useHistory()
  const { setLoction, forms: { name } } = useModel('forms')
  useEffect(() => { setLoction(location) });
  const onHeaderChange = (e: RadioChangeEvent) => {
    switch (e.target.value) {
      case 'a':
        history.replace({ pathname: '/forms/basic/formdes', query: location.query });
        break;
      case 'b':
        history.replace({ pathname: '/forms/extend', query: location.query });
        break;
      case 'c':
        history.replace({ pathname: '/forms/datas', query: location.query });
        break;
    }
  };

  if (location.pathname.indexOf('mobile') >= 0) {
    return <div>
      {props.children}
    </div>
  }



  return (
    <div>
      <Layout>
        <Header className="header">
          <div>
            <Button onClick={() => history.replace('/system/form')} type="link">
              <LeftOutlined style={{ fontSize: 25, color: 'green' }} />
            </Button>
            <span className="title">{name || "未命名表单"}</span>
          </div>
          <Radio.Group
            defaultValue="a"
            onChange={onHeaderChange}
            buttonStyle="solid"
          >
            <Radio.Button value="a">基础设置</Radio.Button>
            <Radio.Button value="b">扩展功能</Radio.Button>
            <Radio.Button value="c">数据管理</Radio.Button>
          </Radio.Group>
          <Menu mode="horizontal">
            <Menu.Item>
              <QuestionCircleOutlined /> 帮助
            </Menu.Item>
            <Menu.Item>消息</Menu.Item>
          </Menu>
        </Header>
        <div style={{ width: '100%' }}>

          {props.children}
        </div>
      </Layout>
    </div>
  );
};
