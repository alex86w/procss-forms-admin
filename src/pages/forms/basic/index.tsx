import React from 'react'
import { Tabs, Layout, Button } from 'antd'
const { TabPane } = Tabs
const { Content, Sider } = Layout
import FormsDes from './components/formdes'
import FormProcess from './components/process'
const Basic = (props: any) => {

    return (<div>
        <Tabs type='card' style={{ backgroundColor: 'white' }}>
            <TabPane tab='表单设计' key='tab1'>
                <FormsDes />
            </TabPane>
            <TabPane tab='流程设定' key='tab2'>
                <FormProcess />
            </TabPane>
        </Tabs>
    </div>
    )
}

Basic.title = '基础设置'

export default Basic;
