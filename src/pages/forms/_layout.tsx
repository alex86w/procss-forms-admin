import React, { useEffect } from 'react';
import { Layout, Menu, Button, Radio } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './index.css';
import { RadioChangeEvent } from 'antd/lib/radio';
import { history } from 'umi';
const { Header } = Layout;
export default (props: any) => {
  useEffect(() => {
    if (props.location.pathname == '/forms') {
      history.replace('/forms/basic');
    }
  }, [props]);

  const onHeaderChange = (e: RadioChangeEvent) => {
    switch (e.target.value) {
      case 'a':
        history.replace('/forms/basic');
        break;
      case 'b':
        history.replace('/forms/extend');
        break;
      case 'c':
        history.replace('/forms/datas');
        break;
    }
  };

  return (
    <div>
      <Layout>
        <Header className="header">
          <div>
            <Button type="link">
              <LeftOutlined style={{ fontSize: 25, color: 'green' }} />
            </Button>
            <Button type="dashed">工作台</Button>
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
          <div className="right_content">
            <Button className="right_button" size="small">
              预览
            </Button>
            <Button className="right_button" size="small">
              保存
            </Button>
            <Button className="right_button" type="primary" size="small">
              {' '}
              下一步
            </Button>
          </div>
          {props.children}
        </div>
      </Layout>
    </div>
  );
};