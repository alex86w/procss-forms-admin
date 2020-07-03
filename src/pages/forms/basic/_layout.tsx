
import React, { useEffect, useState, Fragment } from 'react'
import { Button, PageHeader, Menu, Modal, Select, Tabs, Divider, Radio, ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { history, useModel, useHistory } from 'umi'
import { SelectParam } from 'antd/lib/menu'
import { FormItems } from '@/services/interface/forms.interface'
import Mobile from '@/pages/mobile'
import './index.less'

import CustomTheme from './components/customTheme'
export const ITEMs: Array<FormItems> = [];
const Basic: React.FC = (props) => {
    const [visible, setVisble] = useState(false)
    const { saveForm, forms, loading } = useModel('forms')
    //@ts-ignore
    const { query } = history.location
    const getDefaultSelectKey = () => {
        switch (history.location.pathname) {
            case '/forms/basic/formdes':
                return ['design'];
            case '/forms/basic/process':
                return ['process'];
            case '/forms/basic/publish':
                return ['publish'];
            case '/forms/basic/permission':
                return ['permission'];
        }
    }
    const onHeaderChange = (e: SelectParam) => {
        //@ts-ignore
        switch (e.key) {
            case 'design':
                //@ts-ignore
                history.replace({ pathname: '/forms/basic/formdes', query });
                break;
            case 'process':
                //@ts-ignore
                history.replace({ pathname: '/forms/basic/process', query });
                break;
            case 'publish':
                //@ts-ignore
                history.replace({ pathname: '/forms/basic/publish', query });
                break;
            case 'permission':
                //@ts-ignore
                history.replace({ pathname: '/forms/basic/permission', query });
                break;
        }
    };



    return (<div>
        <PageHeader style={{ backgroundColor: 'white', padding: 10 }} title={
            <Menu mode="horizontal" onSelect={onHeaderChange} defaultSelectedKeys={getDefaultSelectKey()}>
                <Menu.Item key="design">业务设计</Menu.Item>
                {forms.type === "flow" && <Menu.Item key='process'>流程设计</Menu.Item>}
                <Menu.Item key='publish'>业务发布</Menu.Item>
                {/* <Menu.Item key='permission'>数据权限</Menu.Item> */}
            </Menu>}
            extra={location.pathname !== '/forms/basic/publish' ? ([<Button key='preview1' onClick={() => setVisble(true)} size="large">预览</Button>,
            //@ts-ignore
            location.pathname === '/forms/basic/process' ? <Fragment key={'sing'} /> : <Button loading={loading} key='save1' size="large" onClick={saveForm} >保存</Button>,
            <Button key='next1' size="large" type="primary">下一步</Button>
            ]) : []}
        />
        <ConfigProvider locale={zhCN}>
            {props.children}
        </ConfigProvider>

        <Modal footer={null} width='90%' destroyOnClose visible={visible} onCancel={() => setVisble(false)}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                <div style={{ background: '#c2c2c2', textAlign: 'center', padding: 10, width: '100%' }}>
                    <div className="mobile_view" style={{ overflowY: 'scroll' }} >
                        <Mobile />
                    </div>
                </div>
                <div style={{ width: '350px', height: '50vh', }}>
                    <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} defaultActiveKey='style'>
                        <Tabs.TabPane key='style' tab='主题样式'>

                        </Tabs.TabPane>
                        <Tabs.TabPane key='style_c' tab='自定义样式'>
                            <CustomTheme />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </Modal>

    </div>
    )
}


export default Basic;
