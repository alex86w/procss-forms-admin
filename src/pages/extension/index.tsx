import React from 'react';
import { PageHeader, Button, Descriptions, Tag, Tabs } from 'antd';
import './index.less';
const { TabPane } = Tabs;

export default () => {
  return (
    <div className="extension">
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
      <div className="extension-content">
        <Tabs defaultActiveKey="1" onChange={() => null} tabPosition="left">
          <TabPane tab="数据标题" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="数据评论" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="推送提醒" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="公开链接" key="4">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="提交提示" key="5">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="打印模板" key="6">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="智能助手" key="7">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="数据推送" key="8">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
