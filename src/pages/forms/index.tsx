import React from 'react'
import { Layout, Menu, Button, Tabs } from 'antd'
import { LeftOutlined, LaptopOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import './index.css'
const { Content, Header, Sider, } = Layout
const { TabPane } = Tabs
export default () => {

    return <div>
        <Layout>
            <Header className="header">
                <div>
                    <Button type='link'>
                        <LeftOutlined style={{ fontSize: 25, color: 'green' }} />
                    </Button>
                    <Button type='dashed'>工作台</Button>
                </div>
                <Menu mode='horizontal' >
                    <Menu.Item>
                        基础设置
                    </Menu.Item>
                    <Menu.Item>扩张功能</Menu.Item>
                    <Menu.Item>数据管理</Menu.Item>
                </Menu>
                <Menu mode='horizontal' >
                    <Menu.Item>
                        <QuestionCircleOutlined /> 帮助
                     </Menu.Item>
                    <Menu.Item>
                        消息
                    </Menu.Item>
                    <Menu.Item>
                    </Menu.Item>
                </Menu>
            </Header>
            <Tabs type='card' style={{ backgroundColor: 'white' }}>
                <TabPane tab='表单设计' key='tab1'>
                    <Layout style={{ padding: 0, marginTop: 0 }}>
                        <Sider >
                            <div style={{ backgroundColor: 'red', height: '95vh' }}>

                            </div>
                        </Sider>
                        <Content style={{ backgroundColor: 'blue' }}>

                        </Content>
                        <Sider >
                            <div style={{ backgroundColor: "yellow", height: '95vh' }} />
                        </Sider>
                    </Layout>
                </TabPane>
                <TabPane tab='流程设定' key='tab2'>
                    <Layout>
                        <Sider >
                            <div style={{ backgroundColor: 'red', height: '95vh' }}>

                            </div>
                        </Sider>
                        <Content style={{ backgroundColor: 'blue' }}>

                        </Content>
                        <Sider >
                            <div style={{ backgroundColor: "yellow", height: '95vh' }} />
                        </Sider>
                    </Layout>
                </TabPane>
            </Tabs>

        </Layout></div>
}