import React from 'react';
import { PageHeader, Button, Descriptions, Tag, Tabs } from 'antd';
import './index.less';
const { TabPane } = Tabs;

export default class Process extends React.Component {
  render() {
    return (
      <>
        <PageHeader
          className="header"
          ghost={false}
          onBack={() => window.history.back()}
          title="Title"
          tags={
            <div className="tags">
              <Button key="3">基础设置</Button>
              <Button key="2">扩展功能</Button>
              <Button key="1">数据管理</Button>
            </div>
          }
          extra={
            <div>
              <Button key="3">Operation</Button>
              <Button key="2">Operation</Button>
              <Button key="1">Primary</Button>
            </div>
          }
        ></PageHeader>
        <div className="tab-containor">
          <Tabs
            defaultActiveKey="2"
            onChange={() => null}
            tabBarExtraContent={
              <div className="tab-right">
                <Tag color="#0DB3A6">流程版本</Tag>
                &nbsp;&nbsp;
                <Button>保存</Button>
                &nbsp;&nbsp;
                <Button>下一步</Button>
              </div>
            }
          >
            <TabPane tab="表单设计" key="1">
              <div className="tab-body">11111</div>
            </TabPane>
            <TabPane tab="流程设定" key="2">
              <div className="content-left">111111</div>
              <div className="content-right">
                <Tabs defaultActiveKey="1" onChange={() => null}>
                  <TabPane tab="节点属性" key="1">
                    Content of Tab Pane 1
                  </TabPane>
                  <TabPane tab="流程属性" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="表单发布" key="3">
              <div>3333</div>
            </TabPane>
            <TabPane tab="数据权限" key="4">
              <div>4444</div>
            </TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}
