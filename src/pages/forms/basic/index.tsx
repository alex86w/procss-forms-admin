import React from 'react'
import { Tabs, Layout, Button } from 'antd'
const { TabPane } = Tabs
const { Content, Sider } = Layout
import FormsDes from './components/formdes'
const Basic = (props: any) => {

    return (<div>
        <Tabs type='card' style={{ backgroundColor: 'white' }}>
            <TabPane tab='表单设计' key='tab1'>
                <FormsDes />
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
    </div>
    )
}

Basic.title = '基础设置'

export default Basic;
